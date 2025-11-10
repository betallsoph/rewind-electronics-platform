package api

import (
	"encoding/json"
	"log"
	"net/http"
	"sort"
	"strings"

	"github.com/rewind-electronics/platform/go-backend/internal/config"
	"github.com/rewind-electronics/platform/go-backend/internal/models"
	"github.com/rewind-electronics/platform/go-backend/internal/repository"
)

// Server exposes HTTP handlers backed by the repository store.
type Server struct {
	repo *repository.Store
	cfg  config.Config
}

// NewServer creates a new API server instance.
func NewServer(cfg config.Config, repo *repository.Store) *Server {
	return &Server{repo: repo, cfg: cfg}
}

// Handler returns an http.Handler that routes all API endpoints.
func (s *Server) Handler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		s.applyCORS(w, r)

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		s.logRequest(r)

		switch {
		case r.Method == http.MethodGet && r.URL.Path == "/api/health":
			s.handleHealth(w)
		case r.Method == http.MethodGet && r.URL.Path == "/api/devices":
			s.handleDevices(w, r)
		case r.Method == http.MethodGet && strings.HasPrefix(r.URL.Path, "/api/devices/"):
			s.handleDeviceByID(w, r)
		case r.Method == http.MethodPost && r.URL.Path == "/api/devices/compare":
			s.handleCompareDevices(w, r)
		case r.Method == http.MethodGet && r.URL.Path == "/api/categories":
			s.writeJSON(w, http.StatusOK, s.repo.Categories())
		case r.Method == http.MethodGet && r.URL.Path == "/api/memories":
			s.handleMemories(w, r)
		case r.Method == http.MethodGet && r.URL.Path == "/api/collections":
			s.handleCollections(w, r)
		case r.Method == http.MethodGet && r.URL.Path == "/api/achievements":
			s.writeJSON(w, http.StatusOK, s.repo.Achievements())
		case r.Method == http.MethodGet && r.URL.Path == "/api/dashboard":
			s.handleDashboard(w)
		default:
			http.NotFound(w, r)
		}
	})
}

func (s *Server) applyCORS(w http.ResponseWriter, r *http.Request) {
	origin := r.Header.Get("Origin")
	if origin == "" {
		return
	}

	for _, allowed := range s.cfg.AllowedOrigins {
		if allowed == "*" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Accept,Origin")
			return
		}
		if strings.EqualFold(allowed, origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type,Accept,Origin")
			return
		}
	}
}

func (s *Server) logRequest(r *http.Request) {
	log.Printf("%s %s", r.Method, r.URL.Path)
}

func (s *Server) handleHealth(w http.ResponseWriter) {
	s.writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleDevices(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	category := q.Get("category")
	era := q.Get("era")
	search := q.Get("search")
	rarityParam := q.Get("rarity")
	var rarities []string
	if rarityParam != "" {
		rarities = strings.Split(rarityParam, ",")
	}

	if category == "" && era == "" && search == "" && len(rarities) == 0 {
		s.writeJSON(w, http.StatusOK, s.repo.Devices())
		return
	}

	filtered := s.repo.FilterDevices(category, era, search, rarities)
	s.writeJSON(w, http.StatusOK, filtered)
}

func (s *Server) handleDeviceByID(w http.ResponseWriter, r *http.Request) {
	parts := strings.Split(r.URL.Path, "/")
	if len(parts) < 4 {
		http.NotFound(w, r)
		return
	}
	id := parts[3]
	device, ok := s.repo.DeviceByID(id)
	if !ok {
		s.writeJSON(w, http.StatusNotFound, map[string]string{"error": "device not found"})
		return
	}
	s.writeJSON(w, http.StatusOK, device)
}

func (s *Server) handleCompareDevices(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		IDs []string `json:"ids"`
	}
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		s.writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid payload"})
		return
	}

	sanitized := make([]string, 0, len(payload.IDs))
	for _, id := range payload.IDs {
		if trimmed := strings.TrimSpace(id); trimmed != "" {
			sanitized = append(sanitized, trimmed)
		}
	}

	if len(sanitized) == 0 {
		s.writeJSON(w, http.StatusBadRequest, map[string]string{"error": "ids is required"})
		return
	}

	devices := s.repo.CompareDevices(sanitized)
	s.writeJSON(w, http.StatusOK, devices)
}

func (s *Server) handleMemories(w http.ResponseWriter, r *http.Request) {
	deviceID := r.URL.Query().Get("deviceId")
	s.writeJSON(w, http.StatusOK, s.repo.Memories(deviceID))
}

func (s *Server) handleCollections(w http.ResponseWriter, r *http.Request) {
	theme := r.URL.Query().Get("theme")
	s.writeJSON(w, http.StatusOK, s.repo.Collections(theme))
}

func (s *Server) handleDashboard(w http.ResponseWriter) {
	devices := s.repo.Devices()
	dashboard := s.repo.Dashboard()
	response := map[string]any{
		"summary":    dashboard,
		"highlights": map[string]any{"mostRecent": mostRecentDevices(devices, 3), "trending": trendingDevices(devices, 3)},
	}
	s.writeJSON(w, http.StatusOK, response)
}

func (s *Server) writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(payload); err != nil {
		log.Printf("failed to encode response: %v", err)
	}
}

func mostRecentDevices(devices []models.Device, limit int) []models.Device {
	if len(devices) < limit {
		limit = len(devices)
	}
	return append([]models.Device(nil), devices[:limit]...)
}

func trendingDevices(devices []models.Device, limit int) []models.Device {
	if len(devices) < limit {
		limit = len(devices)
	}
	cloned := append([]models.Device(nil), devices...)
	sort.Slice(cloned, func(i, j int) bool {
		return cloned[i].Stats.Upvotes > cloned[j].Stats.Upvotes
	})
	return cloned[:limit]
}

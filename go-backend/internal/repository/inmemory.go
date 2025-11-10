package repository

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/rewind-electronics/platform/go-backend/internal/models"
)

// Store provides read-only access to the seeded dataset.
type Store struct {
	devices      []models.Device
	categories   []models.Category
	memories     []models.Memory
	collections  []models.Collection
	achievements []models.Achievement
}

// Seed represents the JSON structure stored on disk.
type Seed struct {
	Devices      []models.Device      `json:"devices"`
	Categories   []models.Category    `json:"categories"`
	Memories     []models.Memory      `json:"memories"`
	Collections  []models.Collection  `json:"collections"`
	Achievements []models.Achievement `json:"achievements"`
}

// NewStore loads the seed data file into memory and performs light enrichment.
func NewStore(path string) (*Store, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open seed data: %w", err)
	}
	defer file.Close()

	var seed Seed
	if err := json.NewDecoder(file).Decode(&seed); err != nil {
		return nil, fmt.Errorf("decode seed data: %w", err)
	}

	normalizeDevices(seed.Devices)
	normalizeMemories(seed.Memories)

	store := &Store{
		devices:      seed.Devices,
		categories:   seed.Categories,
		memories:     seed.Memories,
		collections:  seed.Collections,
		achievements: seed.Achievements,
	}

	return store, nil
}

// Devices returns all devices ordered by release year descending.
func (s *Store) Devices() []models.Device {
	devices := append([]models.Device(nil), s.devices...)
	sort.Slice(devices, func(i, j int) bool {
		return devices[i].ReleaseYear > devices[j].ReleaseYear
	})
	return devices
}

// DeviceByID returns a single device if available.
func (s *Store) DeviceByID(id string) (models.Device, bool) {
	for _, d := range s.devices {
		if d.ID == id {
			return d, true
		}
	}
	return models.Device{}, false
}

// FilterDevices performs simple filtering by category, era and search term.
func (s *Store) FilterDevices(category, era, search string, rarities []string) []models.Device {
	var result []models.Device
	rares := make(map[string]struct{})
	for _, r := range rarities {
		rares[strings.ToLower(strings.TrimSpace(r))] = struct{}{}
	}

	for _, device := range s.devices {
		if category != "" && device.CategoryID != category {
			continue
		}
		if era != "" && !strings.EqualFold(device.Era, era) {
			continue
		}
		if len(rares) > 0 {
			if _, ok := rares[strings.ToLower(device.Rarity)]; !ok {
				continue
			}
		}
		if search != "" {
			searchLower := strings.ToLower(search)
			if !strings.Contains(strings.ToLower(device.Name), searchLower) &&
				!strings.Contains(strings.ToLower(device.Description), searchLower) {
				continue
			}
		}
		result = append(result, device)
	}

	sort.Slice(result, func(i, j int) bool {
		if result[i].ReleaseYear == result[j].ReleaseYear {
			return strings.Compare(result[i].Name, result[j].Name) < 0
		}
		return result[i].ReleaseYear > result[j].ReleaseYear
	})

	return result
}

// Categories returns all categories.
func (s *Store) Categories() []models.Category {
	return append([]models.Category(nil), s.categories...)
}

// Memories returns all memories for a device or all memories when deviceID is empty.
func (s *Store) Memories(deviceID string) []models.Memory {
	var result []models.Memory
	for _, memory := range s.memories {
		if deviceID == "" || memory.DeviceID == deviceID {
			result = append(result, memory)
		}
	}
	sort.Slice(result, func(i, j int) bool {
		return result[i].CreatedAt.After(result[j].CreatedAt)
	})
	return result
}

// Collections returns all collections, optionally filtered by theme.
func (s *Store) Collections(theme string) []models.Collection {
	var result []models.Collection
	for _, collection := range s.collections {
		if theme == "" || strings.EqualFold(collection.Theme, theme) {
			result = append(result, collection)
		}
	}
	return result
}

// Achievements returns all achievements.
func (s *Store) Achievements() []models.Achievement {
	return append([]models.Achievement(nil), s.achievements...)
}

// Dashboard composes a summary of the dataset.
func (s *Store) Dashboard() models.Dashboard {
	dashboard := models.Dashboard{
		TotalDevices:    len(s.devices),
		TotalMemories:   len(s.memories),
		TopRarityCounts: map[string]int{},
	}

	rarityRanking := []string{"common", "uncommon", "rare", "legendary"}
	for _, rarity := range rarityRanking {
		dashboard.TopRarityCounts[rarity] = 0
	}

	categoryPopularity := make(map[string]int)
	recentSet := make(map[int]struct{})

	for _, device := range s.devices {
		rarityKey := strings.ToLower(device.Rarity)
		dashboard.TopRarityCounts[rarityKey]++
		categoryPopularity[device.CategoryID]++
		if device.ReleaseYear >= time.Now().Year()-40 {
			recentSet[device.ReleaseYear] = struct{}{}
		}
	}

	for category, count := range categoryPopularity {
		if count >= 1 {
			dashboard.PopularCategories = append(dashboard.PopularCategories, category)
		}
	}
	sort.Slice(dashboard.PopularCategories, func(i, j int) bool {
		return categoryPopularity[dashboard.PopularCategories[i]] > categoryPopularity[dashboard.PopularCategories[j]]
	})

	for year := range recentSet {
		dashboard.RecentYears = append(dashboard.RecentYears, year)
	}
	sort.Sort(sort.Reverse(sort.IntSlice(dashboard.RecentYears)))

	return dashboard
}

// CompareDevices returns a subset of devices matching the provided ids.
func (s *Store) CompareDevices(ids []string) []models.Device {
	idSet := map[string]struct{}{}
	for _, id := range ids {
		idSet[id] = struct{}{}
	}
	var result []models.Device
	for _, device := range s.devices {
		if _, ok := idSet[device.ID]; ok {
			result = append(result, device)
		}
	}
	return result
}

func normalizeDevices(devices []models.Device) {
	for i, device := range devices {
		if device.ID == "" {
			devices[i].ID = generateID()
		}
		if device.Stats.Views == 0 {
			devices[i].Stats.Views = 1000 + i*250
		}
		if device.Stats.Likes == 0 {
			devices[i].Stats.Likes = 400 + i*150
		}
		if device.Stats.Upvotes == 0 {
			devices[i].Stats.Upvotes = 120 + i*80
		}
		if device.Era == "" {
			devices[i].Era = inferEra(device.ReleaseYear)
		}
	}
}

func normalizeMemories(memories []models.Memory) {
	for i := range memories {
		if memories[i].ID == "" {
			memories[i].ID = generateID()
		}
		if memories[i].CreatedAt.IsZero() {
			memories[i].CreatedAt = time.Now().AddDate(0, 0, -i)
		}
	}
}

func inferEra(year int) string {
	switch {
	case year < 1980:
		return "1970s"
	case year < 1990:
		return "1980s"
	case year < 2000:
		return "1990s"
	case year < 2010:
		return "2000s"
	case year < 2020:
		return "2010s"
	default:
		return "Modern"
	}
}

func generateID() string {
	buf := make([]byte, 16)
	if _, err := rand.Read(buf); err != nil {
		return fmt.Sprintf("id-%d", time.Now().UnixNano())
	}
	return hex.EncodeToString(buf)
}

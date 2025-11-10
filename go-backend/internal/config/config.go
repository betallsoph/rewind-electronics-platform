package config

import (
	"log"
	"os"
	"strconv"
)

// Config holds runtime configuration for the API server.
type Config struct {
	Port           int
	AllowedOrigins []string
}

// Load loads configuration from environment variables with sane defaults.
func Load() Config {
	cfg := Config{
		Port:           8080,
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:3001"},
	}

	if portStr := os.Getenv("PORT"); portStr != "" {
		if port, err := strconv.Atoi(portStr); err == nil {
			cfg.Port = port
		} else {
			log.Printf("invalid PORT %s, falling back to %d", portStr, cfg.Port)
		}
	}

	if origins := os.Getenv("ALLOWED_ORIGINS"); origins != "" {
		cfg.AllowedOrigins = splitAndTrim(origins)
	}

	return cfg
}

func splitAndTrim(value string) []string {
	parts := []string{}
	current := ""
	for _, r := range value {
		if r == ',' {
			if trimmed := trim(current); trimmed != "" {
				parts = append(parts, trimmed)
			}
			current = ""
			continue
		}
		current += string(r)
	}
	if trimmed := trim(current); trimmed != "" {
		parts = append(parts, trimmed)
	}
	return parts
}

func trim(value string) string {
	start := 0
	end := len(value)
	for start < end && (value[start] == ' ' || value[start] == '\n' || value[start] == '\t') {
		start++
	}
	for end > start && (value[end-1] == ' ' || value[end-1] == '\n' || value[end-1] == '\t') {
		end--
	}
	return value[start:end]
}

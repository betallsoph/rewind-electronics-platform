package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rewind-electronics/platform/go-backend/internal/api"
	"github.com/rewind-electronics/platform/go-backend/internal/config"
	"github.com/rewind-electronics/platform/go-backend/internal/repository"
)

func main() {
	cfg := config.Load()
	repo, err := repository.NewStore("internal/data/seed.json")
	if err != nil {
		log.Fatalf("failed to load dataset: %v", err)
	}

	server := api.NewServer(cfg, repo)
	addr := fmt.Sprintf(":%d", cfg.Port)
	log.Printf("Starting Retro Electronics Go API on %s", addr)
	if err := http.ListenAndServe(addr, server.Handler()); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

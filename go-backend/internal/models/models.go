package models

import "time"

// Device represents a nostalgic electronic device with rich metadata.
type Device struct {
	ID             string            `json:"id"`
	Name           string            `json:"name"`
	Manufacturer   string            `json:"manufacturer"`
	ReleaseYear    int               `json:"releaseYear"`
	Era            string            `json:"era"`
	CategoryID     string            `json:"categoryId"`
	Description    string            `json:"description"`
	Highlights     []string          `json:"highlights"`
	Specifications map[string]string `json:"specifications"
`
	Media        DeviceMedia  `json:"media"`
	Rarity       string       `json:"rarity"`
	PriceHistory []PricePoint `json:"priceHistory"`
	Stats        DeviceStats  `json:"stats"`
}

// DeviceMedia holds paths or URLs to device imagery.
type DeviceMedia struct {
	Thumbnail string   `json:"thumbnail"`
	Gallery   []string `json:"gallery"`
}

// DeviceStats provides engagement data for a device.
type DeviceStats struct {
	Views   int `json:"views"`
	Likes   int `json:"likes"`
	Upvotes int `json:"upvotes"`
}

// PricePoint describes a device valuation at a moment in time.
type PricePoint struct {
	Year  int     `json:"year"`
	Price float64 `json:"price"`
}

// Category groups devices by usage or theme.
type Category struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Icon        string   `json:"icon"`
	Highlights  []string `json:"highlights"`
}

// Memory captures a personal story tied to a device.
type Memory struct {
	ID        string    `json:"id"`
	DeviceID  string    `json:"deviceId"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Era       string    `json:"era"`
	Author    string    `json:"author"`
	CreatedAt time.Time `json:"createdAt"`
	Sentiment string    `json:"sentiment"`
}

// Collection represents curated sets of devices.
type Collection struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	DeviceIDs   []string `json:"deviceIds"`
	Theme       string   `json:"theme"`
}

// Achievement gamifies user interactions with the collection.
type Achievement struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Criteria    string `json:"criteria"`
	Tier        string `json:"tier"`
}

// Dashboard aggregates data for quick summaries.
type Dashboard struct {
	TotalDevices      int            `json:"totalDevices"`
	TotalMemories     int            `json:"totalMemories"`
	TopRarityCounts   map[string]int `json:"topRarityCounts"`
	PopularCategories []string       `json:"popularCategories"`
	RecentYears       []int          `json:"recentYears"`
}

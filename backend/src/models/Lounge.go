package models

type Lounge struct {
	Name        string    `json:"name"`
	Airlines    []Airline `json:"airlines"`
	Access      string    `json:"access"`
	Amenities   []Amenity `json:"amenities"`
	Location    string    `json:"location"`
	Type        string    `json:"type"`
	Description string    `json:"description"`
}

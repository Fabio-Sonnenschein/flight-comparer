package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type LoungeDB struct {
	Name        string               `json:"name"`
	Airlines    []primitive.ObjectID `json:"airlines"`
	Access      string               `json:"access"`
	Amenities   []primitive.ObjectID `json:"amenities"`
	Location    string               `json:"location"`
	Type        string               `json:"type"`
	Description string               `json:"description"`
}

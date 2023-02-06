package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Lounge struct {
	Name        string               `json:"name"`
	Airlines    []primitive.ObjectID `json:"airlines"`
	Access      string               `json:"access"`
	Type        string               `json:"type"`
	Shower      bool                 `json:"shower"`
	Description string               `json:"description"`
}

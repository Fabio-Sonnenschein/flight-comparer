package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Amenity struct {
	ID          primitive.ObjectID `bson:"_id" json:"_id"`
	Description string             `json:"description"`
	Icon        string             `json:"icon"`
	Text        string             `json:"text"`
}

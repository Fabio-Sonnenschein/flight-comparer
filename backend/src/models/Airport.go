package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Airport struct {
	ID       primitive.ObjectID `bson:"_id" json:"_id"`
	Code     string             `json:"code"`
	Name     string             `json:"name"`
	Location Location           `json:"location"`
	Position Position           `json:"position"`
	Lounges  []Lounge           `json:"lounges"`
}

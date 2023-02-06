package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Flight struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	Airline   primitive.ObjectID `json:"airline"`
	Number    int                `json:"number"`
	Aircraft  string             `json:"aircraft"`
	Cabin     string             `json:"cabin"`
	Departure AirportStop        `json:"departure"`
	Duration  float64            `json:"duration"`
	Overnight bool               `json:"overnight"`
	Arrival   AirportStop        `json:"arrival"`
}

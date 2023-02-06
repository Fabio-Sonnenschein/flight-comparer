package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Stop struct {
	ID            primitive.ObjectID `bson:"_id" json:"_id"`
	Arrival       AirportStop        `json:"arrival"`
	Duration      float64            `json:"duration"`
	Overnight     bool               `json:"overnight"`
	Connection    bool               `json:"connection"`
	SwitchAirport bool               `json:"switchAirport"`
	Departure     AirportStop        `json:"departure"`
}

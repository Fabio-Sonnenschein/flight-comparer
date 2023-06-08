package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Trip struct {
	ID          primitive.ObjectID   `bson:"_id" json:"_id"`
	Name        string               `json:"name"`
	Description string               `json:"description"`
	Vendor      string               `json:"vendor"`
	Link        string               `json:"link"`
	RoundTrip   bool                 `json:"roundTrip"`
	Airlines    []primitive.ObjectID `json:"airlines"`
	Cost        Cost                 `json:"cost"`
	Flights     []primitive.ObjectID `json:"flights"`
}

package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type AirportDB struct {
	ID       primitive.ObjectID `bson:"_id" json:"_id"`
	Code     string             `json:"code"`
	Name     string             `json:"name"`
	Location Location           `json:"location"`
	Position Position           `json:"position"`
	Lounges  []LoungeDB         `json:"lounges"`
}

package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Airline struct {
	ID       primitive.ObjectID `bson:"_id" json:"_id"`
	Alliance string             `json:"alliance"`
	Code     string             `json:"code"`
	Name     string             `json:"name"`
}

package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type AirportStop struct {
	ID      primitive.ObjectID `bson:"_id" json:"_id"`
	Airport primitive.ObjectID `json:"airport"`
	Time    Time               `json:"time"`
}

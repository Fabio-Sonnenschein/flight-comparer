package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type AirportStop struct {
	Airport primitive.ObjectID `json:"airport"`
	Time    Time               `json:"time"`
}

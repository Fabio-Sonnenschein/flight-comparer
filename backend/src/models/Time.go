package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Time struct {
	Time primitive.DateTime `json:"time"`
	Zone string             `json:"zone"`
	Utc  primitive.DateTime `json:"utc"`
}

package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var (
	db  *gorm.DB
	err error
)

func StartDB() {
	db, err = gorm.Open(postgres.Open(os.Getenv("DB_DSN")), &gorm.Config{})

	if err != nil {
		log.Fatal("Error connecting to database :", err)
	}

	log.Println("DB Connection success")
}

func GetDB() *gorm.DB {
	return db
}

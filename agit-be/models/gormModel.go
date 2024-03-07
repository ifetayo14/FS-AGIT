package models

import (
	"github.com/google/uuid"
	"time"
)

type GormModel struct {
	ID        uuid.UUID  `gorm:"primaryKey" json:"id"`
	CreatedAt *time.Time `json:"created_at,omitempty"`
	UpdatedAt *time.Time `json:"updated_at,omitempty"`
	DeletedAt *time.Time `json:"deleted_at,omitempty"`
}

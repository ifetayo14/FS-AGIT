package models

import (
	"github.com/asaskevich/govalidator"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Employee struct {
	GormModel
	Name        string    `gorm:"column:name;not null" json:"name" valid:"required~Name is required"`
	NIP         string    `gorm:"column:nip;not null" json:"nip" valid:"required~NIP is required"`
	POB         string    `gorm:"column:pob;not null" json:"pob" valid:"required~Place of Birth is required"`
	DOB         string    `gorm:"column:dob;not null" json:"dob" valid:"required~Date of Birth is required"`
	Age         int       `gorm:"column:age;not null" json:"age" valid:"required~Age is required"`
	Address     string    `gorm:"column:address;not null" json:"address" valid:"required~Address is required"`
	Religion    string    `gorm:"column:religion;not null" json:"religion" valid:"required~Religion is required"`
	Gender      string    `gorm:"column:gender;not null" json:"gender" valid:"required~Gender is required"`
	PhoneNumber string    `gorm:"column:phone_number;not null" json:"phoneNumber" valid:"required~Phone Number is required"`
	Email       string    `gorm:"column:email;not null" json:"email" valid:"required~Email is required"`
	CreatedBy   uuid.UUID `gorm:"column:created_by;not null"`
}

func (Employee) TableName() string {
	return "employee"
}

func (p *Employee) BeforeCreate(tx *gorm.DB) (err error) {
	_, errCreate := govalidator.ValidateStruct(p)

	if errCreate != nil {
		err = errCreate
		return
	}

	err = nil
	return
}

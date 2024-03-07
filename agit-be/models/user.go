package models

import (
	"MyGram/helpers"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type User struct {
	GormModel
	Username string `gorm:"not null;uniqueIndex" json:"username" valid:"required~Username is required"`
	Password string `gorm:"not null" json:"password" valid:"required~Password is required,minstringlength(6)~Password has to have minimum length 6 characters"`
}

func (User) TableName() string {
	return "user"
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	_, errCreate := govalidator.ValidateStruct(u)

	if errCreate != nil {
		err = errCreate
		return
	}

	u.Password = helpers.HashPass(u.Password)

	err = nil
	return
}

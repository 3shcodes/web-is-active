package utils

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(bePass string, fePass string) (bool, string) {
	fmt.Println("p1: " + fePass + " p2: " + bePass)
	err := bcrypt.CompareHashAndPassword([]byte(bePass), []byte(fePass))
	valid := true
	msg := ""
	if err != nil {
		msg = "Login Or Passowrd is Incorrect"
		valid = false
	}
	return valid, msg
}

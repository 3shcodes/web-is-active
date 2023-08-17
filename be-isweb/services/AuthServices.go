package services

import (
	"be-isweb/database"
	"be-isweb/models"
	"be-isweb/utils"
	"errors"
	"fmt"
)

type AuthTools struct {
	IsWebDB *database.MySql
}

func AuthToolsCons(db *database.MySql) *AuthTools {
	return &AuthTools{
		IsWebDB: db,
	}
}

func (inst *AuthTools) Login(userName, password string) *models.Resp {

    fmt.Println(userName)
	users, err := inst.IsWebDB.GetUsers("", userName)
	if err != nil {
		return models.PResMaker("Internal Server Error", nil, 500, err)
	}

	if len(users) != 1 {
        fmt.Println(users)
		return models.PResMaker("No User Found", nil, 403, errors.New("Status Bad Request"))
	}

	foundUser := users[0]

	ok, msg := utils.VerifyPassword(foundUser.Password, password)
	if !ok {
		return models.PResMaker(msg, nil, 403, errors.New("Wrong Pass"))
	}

	token, refToken, err := utils.TokenGenerator(foundUser.UserName, foundUser.Email)
	if err != nil {
		return models.PResMaker("Internal Server Error", nil, 500, err)
	}

	foundUser.Token = token
	foundUser.RefToken = refToken
	if err = inst.IsWebDB.UpdateUser(foundUser); err != nil {
		return models.PResMaker("Internal Server Error", nil, 500, err)
	}
	foundUser.Password = ""
	return models.PResMaker("Log In request successful", foundUser, 200, nil)
}

func (inst *AuthTools) SignUp(newUser models.User) *models.Resp {
	users, err := inst.IsWebDB.GetUsers("", newUser.UserName)
	if err != nil {
		return models.PResMaker("Internal Server Error", nil, 500, err)
	}

	if len(users) != 0 {
		return models.PResMaker(" User already exists ", nil, 403, errors.New("Status Bad Request"))
	}

	token, refToken, err := utils.TokenGenerator(newUser.UserName, newUser.Email)
	if err != nil {
		return models.PResMaker("Internal Server Error", nil, 500, err)
	}

	newUser.Password = utils.HashPassword(newUser.Password)
	newUser.Token = token
	newUser.RefToken = refToken

	if err = inst.IsWebDB.InsertUser(newUser); err != nil {
		return models.PResMaker("Internal Server Error", nil, 500, err)
	}

	return models.PResMaker("Signed Up Successfully", nil, 200, nil)
}

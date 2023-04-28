package models

import (
	sql "database/sql"
	"fmt"
	"time"
)

type User struct {
	UserId   int    `json:"user_id"`
	UserName string `json:"user_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Image    string `json:"image"`
	Token    string `json:"token"`
	RefToken string `json:"refToken"`
}

func UserScan(row *sql.Rows) User {
	var foundUser User

	if err := row.Scan(
		&foundUser.UserId,
		&foundUser.UserName,
		&foundUser.Email,
		&foundUser.Password,
		&foundUser.Image,
		&foundUser.Token,
		&foundUser.RefToken,
	); err != nil {
		fmt.Println(err.Error())
		panic(err)
	}

	return foundUser
}

type Site struct {
	SiteId   int       `json:"siteId"`
	SiteName string    `json:"siteName"`
	Url      string    `json:"url"`
	LastStat bool      `json:"lastStat"`
	LastTime time.Time `json:"lastChAt"`
}

func SiteScan(row *sql.Rows) Site {
	var foundSite Site

	if err := row.Scan(
		&foundSite.SiteId,
		&foundSite.SiteName,
		&foundSite.Url,
		&foundSite.LastStat,
		&foundSite.LastTime,
	); err != nil {
		panic(err)
	}

	return foundSite
}

type UserSite struct {
	ID       int    `json:"id"`
	UserName string `json:"userName"`
	SiteName string `json:"siteName"`
	IsFav    bool   `json:"isFav"`
}

func UserSiteScan(row *sql.Rows) UserSite {
	var foundUnS UserSite

	if err := row.Scan(
		&foundUnS.ID,
		&foundUnS.UserName,
		&foundUnS.SiteName,
		&foundUnS.IsFav,
	); err != nil {
		panic(err)
	}

	return foundUnS
}

func GetUserSites(rows *sql.Rows, inc string, exc string) []UserSite {
	// inc for search
	// exc for filter

	var resArr []UserSite

	for rows.Next() {
		resArr = append(resArr, UserSiteScan(rows))
	}

	return resArr
}

package services

import "be-isweb/models"

type AuthServices interface {
	Login(userName, password string) *models.Resp
	SignUp(newUser models.User) *models.Resp
}

type UserServices interface {
	// users
	EditAccount(updatedUser models.User) *models.Resp
	DeleteAccount(userName string) *models.Resp

	// sites
	GetSites(userName string) *models.Resp
	AddSite(userName string,  siteModel models.Site) *models.Resp
	ToggleFav(userName, siteName string) *models.Resp
	UpdateSite(siteName string) *models.Resp
	UpdateSome(newSitesArr []string) *models.Resp
	DeleteSite(userName, siteName string) *models.Resp
}

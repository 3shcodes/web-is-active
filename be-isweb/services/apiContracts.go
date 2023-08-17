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
	QuerySites(siteQuery string) *models.Resp
	CheckSName(siteName string) *models.Resp
    CheckSUrl(siteUrl string ) *models.Resp
	AddNewSite(userName string, siteModel models.Site) *models.Resp
	AddOldSite(userName string, siteName string) *models.Resp
	ToggleFav(userName, siteName string) *models.Resp
	UpdateSite(siteName string) *models.Resp
	UpdateSome(newSitesArr []string) *models.Resp
	DeleteSite(userName, siteName string) *models.Resp
}

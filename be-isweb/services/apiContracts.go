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
    GetSites() *models.Resp
    AddSite(newSite models.Site) *models.Resp
    ToggleFav(userName, siteName string) *models.Resp
    UpdateSite(updatedSite models.Site) *models.Resp
    UpdateSome(newSitesArr []models.Site) *models.Resp
    DeleteSite(userName, siteName string) *models.Resp
}



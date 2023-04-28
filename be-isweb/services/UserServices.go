package services

import (
	"be-isweb/database"
	"be-isweb/models"
)

type UserTools struct {
	IsWebDB *database.MySql
}

func UserToolConstruct(d *database.MySql) *UserTools {
	return &UserTools{
		IsWebDB: d,
	}
}

func EditAccount(updatedUser models.User) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func DeleteAccount(userName string) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}

func GetSites() *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func AddSite(newSite models.Site) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func ToggleFav(userName, siteName string) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func UpdateSite(updatedSite models.Site) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func UpdateSome(newSitesArr []models.Site) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}
func DeleteSite(userName, siteName string) *models.Resp {

	return models.PResMaker("someshit", 4, 200, nil)
}

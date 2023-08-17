package database

import (
	"be-isweb/models"
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type MySql struct {
	Db *sql.DB
}

func DbHere(conf string) *MySql {
	db, err := sql.Open("mysql", conf)
	if err != nil {
		panic(err)
	}

	return &MySql{
		Db: db,
	}
}

// create
func (inst *MySql) InsertUser(newUser models.User) error {

	users, err := inst.GetUsers("", newUser.UserName)
	if err != nil {
		return err
	}

	if len(users) != 0 {
		return errors.New("Username already exists")
	}
	qstring := `INSERT INTO users ( userName, email, password, image, token, refToken) VALUES (?,?,?,?,?,?);`
	insTool, err := inst.Db.Prepare(qstring)
	if err != nil {
		return err
	}

	defer insTool.Close()

	if _, err = insTool.Exec(newUser.UserName, newUser.Email, newUser.Password, newUser.Image, newUser.Token, newUser.RefToken); err != nil {
		return err
	}

	return nil
}

func (inst *MySql) InsertSite(newSite models.Site) error {

	sites, err := inst.GetUsers("", newSite.SiteName)
	if err != nil {
		return err
	}

	if len(sites) != 0 {
		return errors.New("Sitename already exists")
	}
	qstring := `INSERT INTO sites ( siteName, url, lastStat, lastTime, issue ) VALUES (?,?,?,?,?);`
	insTool, err := inst.Db.Prepare(qstring)
	if err != nil {
		return err
	}

	defer insTool.Close()

	if _, err = insTool.Exec(newSite.SiteName, newSite.Url, newSite.LastStat, newSite.LastTime, newSite.Issue); err != nil {
		return err
	}

	return nil
}

func (inst *MySql) InsertRels(newRel models.UserSite) error {

	rels, err := inst.GetRels(newRel.UserName, newRel.SiteName)
	if err != nil {
		return err
	}

	if len(rels) != 0 {
		return errors.New("SiteRel already exists")
	}
	qstring := `INSERT INTO userSite ( userName, siteName, isFav ) VALUES (?,?,?);`
	insTool, err := inst.Db.Prepare(qstring)
	if err != nil {
		return err
	}

	defer insTool.Close()

	if _, err = insTool.Exec(newRel.UserName, newRel.SiteName, 0); err != nil {
		return err
	}

	return nil
}

// read
func (inst *MySql) GetUsers(inc string, exc string) ([]models.User, error) {

	var resUsers []models.User
	qstring := "SELECT * FROM users;"

	if inc != "" {
		qstring = `SELECT * FROM users WHERE userName LIKE "` + inc + `"`
	}
	if exc != "" {
		qstring = `SELECT * FROM users WHERE userName="` + exc + `"`
	}

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		resUsers = append(resUsers, models.UserScan(rows))
	}

	return resUsers, nil
}

func (inst *MySql) GetSites(siteName string, userName string) ([]models.Site, error) {

	var resSites []models.Site
	qstring := "SELECT * FROM sites;"

	if siteName != "" {
		qstring = `SELECT * FROM sites WHERE siteName="` + siteName + `"`
	}
	if userName != "" {
		qstring = `SELECT siteId,sites.siteName,url,lastStat,lastTime,issue FROM sites LEFT JOIN userSite on sites.siteName=userSite.siteName WHERE userSite.userName="` + userName + `"`
	}

	fmt.Println(qstring)
	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resSites = append(resSites, models.SiteScan(rows))
	}

	fmt.Println(resSites)
	return resSites, nil
}

func (inst *MySql) GetRels(userName string, siteName string) ([]models.UserSite, error) {

	var resRels []models.UserSite
	qstring := "SELECT * FROM userSite;"

	if userName != "" && siteName != "" {
		qstring = `SELECT * FROM userSite WHERE userName="` + userName + `" AND siteName="` + siteName + `";`
	} else if userName != "" {
		qstring = `SELECT * FROM userSite WHERE userName="` + userName + `";`
	} else if siteName != "" {
		qstring = `SELECT * FROM userSite WHERE siteName="` + siteName + `";`
	}

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resRels = append(resRels, models.UserSiteScan(rows))
	}

	return resRels, nil
}

// update
func (inst *MySql) UpdateUser(updUser models.User) error {

	users, err := inst.GetUsers("", updUser.UserName)
	if err != nil {
		return err
	}

	if len(users) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := "UPDATE users SET email=?, image=?, token=?, refToken=? WHERE userName=?"
	updTool, err := inst.Db.Prepare(qstring)

	if err != nil {
		return err
	}
	defer updTool.Close()

	if _, err = updTool.Exec(updUser.Email, updUser.Image, updUser.Token, updUser.RefToken, updUser.UserName); err != nil {
		return err
	}

	return nil
}

func (inst *MySql) UpdateSite(updSite models.Site) error {

	sites, err := inst.GetSites(updSite.SiteName, "")
	if err != nil {
		return err
	}

	if len(sites) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := "UPDATE sites SET url=?, lastStat=?, lastTime=?, issue=? WHERE siteName=?"
	updTool, err := inst.Db.Prepare(qstring)

	if err != nil {
		return err
	}
	defer updTool.Close()

	if _, err = updTool.Exec(updSite.Url, updSite.LastStat, updSite.LastTime, updSite.Issue, updSite.SiteName); err != nil {
		return err
	}

	return nil
}

func (inst *MySql) UpdateRels(updRel models.UserSite) error {

	sites, err := inst.GetRels("", updRel.SiteName)
	if err != nil {
		return err
	}

	if len(sites) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := "UPDATE userSite SET isFav=? WHERE userName=? AND siteName=?"
	updTool, err := inst.Db.Prepare(qstring)

	if err != nil {
		return err
	}
	defer updTool.Close()

	if _, err = updTool.Exec(updRel.IsFav, updRel.UserName, updRel.SiteName); err != nil {
		return err
	}

	return nil
}

// delete
func (inst *MySql) RemoveUser(userName string) error {

	users, err := inst.GetUsers("", userName)
	if err != nil {
		return err
	}

	if len(users) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := `DELETE FROM users WHERE userName="` + userName + `";`

	_, err = inst.Db.Exec(qstring)
	if err != nil {
		return err
	}

	return nil
}

func (inst *MySql) RemoveRel(userName, siteName string) error {
	rels, err := inst.GetRels(userName, siteName)
	if err != nil {
		return err
	}

	if len(rels) != 1 {
		return errors.New("No user or Internal Server error. You decide")
	}

	qstring := `DELETE FROM userSite WHERE userName="` + userName + `" AND siteName="` + siteName + `";`

	_, err = inst.Db.Exec(qstring)
	if err != nil {
		return err
	}

	return nil
}

// custom funcs
func (inst *MySql) QuerySites(queryString string) ([]models.Site, error) {

	var resSites []models.Site
	qstring := `SELECT * FROM sites WHERE siteName LIKE "%` + queryString + `%" AND url LIKE "%` + queryString + `%";`

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resSites = append(resSites, models.SiteScan(rows))
	}

	return resSites, nil
}

func (inst *MySql) CheckSName(sName string) ([]models.Site, error) {

	var resSites []models.Site
	qstring := `SELECT * FROM sites WHERE siteName ="` + sName + `";`

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resSites = append(resSites, models.SiteScan(rows))
	}

	return resSites, nil
}

func ( inst *MySql ) CheckSUrl ( sUrl string ) ( []models.Site, error ) {

	var resSites []models.Site
	qstring := `SELECT * FROM sites WHERE url ="` + sUrl + `";`
    fmt.Println(qstring)

	rows, err := inst.Db.Query(qstring)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		resSites = append(resSites, models.SiteScan(rows))
	}

	return resSites, nil
}

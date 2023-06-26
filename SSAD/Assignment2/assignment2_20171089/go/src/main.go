package main

import (
	"fmt" //email verification
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"golang.org/x/crypto/bcrypt"
)

var db *gorm.DB // declaring the db globally
var err error

type User struct {
	ID         uint   `json:"id" gorm:"AUTO_INCREMENT"`
	Name       string `json:"name"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	TotalScore int64  `json:"score"`
}

type Question struct {
	ID       uint   `json:"id" gorm:"AUTO_INCEREMENT"`
	Image    string `json:"image"`
	Question string `json:"question"`
	Quiz     string `json:"quiz"`
	Genre    string `json:"genre"`
	OptionA  string `json:"optiona"`
	OptionB  string `json:"optionb"`
	OptionC  string `json:"optionc"`
	OptionD  string `json:"optiond"`
	ACorrect bool   `json:"acorrect"`
	BCorrect bool   `json:"bcorrect"`
	CCorrect bool   `json:"ccorrect"`
	DCorrect bool   `json:"dcorrect"`
}

type Attempts struct {
	Quiz   string `json:"quiz"`
	Genre  string `json:"genre"`
	UserID int32  `json:"userid"`
	Score  int64  `json:"score"`
}

func main() {

	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Question{}, &Attempts{})

	// Set the router as the default one shipped with Gin
	router := gin.Default()
	router.Use((cors.Default()))

	router.POST("/register", Register)
	router.POST("/login", Login)
	router.POST("/setScore", setScore)

	router.GET("/allusers", AllUsers)
	router.GET("/deluser/:id", DeleteUser)

	router.GET("/genres", GetGenres)
	router.GET("/getQuizes", GetQuizes)
	router.GET("/getQuiz/:genre", getQuiz)
	router.GET("/getQuestion/:quizid", getQuestion)
	router.GET("/getGenreQuiz/:quiz", getGenreQuiz)

	router.GET("/getQuestions/:quiz", getQuestions)
	router.GET("/getAllQuestions", getAllQuestions)
	router.POST("/add_question", AddQuestion)
	router.POST("/edit_question", EditQuestion)
	router.DELETE("/delquestion/:questionid", DeleteQuestion)

	router.GET("/leaderboard", getFullLeader)
	router.GET("/leaderboard/:genre", getLeaderGenre)
	router.GET("/scores/:userid", GetScores)
	// Start and run the server
	router.Run(":3010")
}

func Login(c *gin.Context) {
	var user, check User
	c.BindJSON(&user)
	if user.Email == "admin@admin.com" && user.Password == "admin123" {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"message": "Admin User",
			"auth":    "admin",
			"userid":  0,
		})
		return
	}
	if errmail := db.Where("email=?", user.Email).First(&check).Error; errmail != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"message": "User DNE",
			"auth":    "false",
		})
	} else {
		byteHash := []byte(check.Password)
		err := bcrypt.CompareHashAndPassword(byteHash, []byte(user.Password))
		if err == nil {
			fmt.Printf("%d", check.ID)
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, gin.H{
				"message": "Login User",
				"auth":    "true",
				"userid":  check.ID,
			})
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, gin.H{
				"message": "Password Incorrect",
				"auth":    "false",
			})
		}
	}

}

func Register(c *gin.Context) {
	var user User
	var check User
	c.BindJSON(&user)
	if errmail := db.Where("email=?", user.Email).First(&check).Error; errmail != nil {

		fmt.Printf("New email: ")
		fmt.Printf("%s\n", user.Email)
		hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.MinCost)
		if err != nil {
			log.Println(err)
			return
		}
		user.Password = string(hash)
		db.Create(&user)
		fmt.Println(user)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"message": "Created User",
		})
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{
			"message": "User Already Exists",
		})
	}

}

func DeleteUser(c *gin.Context) {
	userid := c.Param("id")
	var toDelete User
	db.Table("users").Where("id=?", userid).First(&toDelete)
	fmt.Println(toDelete)
	var attempts []Attempts
	db.Table("attempts").Where("user_id=?", userid).Find(&attempts)
	fmt.Println(attempts)
	db.Delete(&attempts)
	db.Delete(&toDelete)

}

func AllUsers(c *gin.Context) {

	var ids []uint
	var names []string
	var emails []string
	rows, _ := db.Table("users").Select("id,name,email").Rows()
	defer rows.Close()
	for rows.Next() {
		var name string
		var email string
		var id uint
		rows.Scan(&id, &name, &email)
		ids = append(ids, id)
		names = append(names, name)
		emails = append(emails, email)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"ids": ids, "names": names, "emails": emails})
}

func getQuestion(c *gin.Context) {
	quizid := c.Param("quizid")
	var question Question
	db.Table("questions").Where("id=?", quizid).First(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"question": question,
	})
}

func getQuestions(c *gin.Context) {
	quiz := c.Param("quiz")
	fmt.Printf("%s\n", quiz)
	var questions []Question
	db.Table("questions").Where("quiz = ?", quiz).Find(&questions)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"questions": questions,
	})
}

func DeleteQuestion(c *gin.Context) {
	qid := c.Param("questionid")
	var question Question
	db.Table("questions").Where("id=?", qid).First(&question)
	fmt.Println(question)
	db.Delete(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, "Success")
}

func getAllQuestions(c *gin.Context) {
	var questions []Question
	db.Table("questions").Order("quiz").Find(&questions)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"questions": questions,
	})
}

func getGenreQuiz(c *gin.Context) {
	quiz := c.Param("quiz")
	rows, _ := db.Raw("SELECT genre from questions WHERE quiz=?", quiz).Rows()
	defer rows.Close()

}

func getQuiz(c *gin.Context) {
	genre := c.Param("genre")
	var quizes []string
	rows, err := db.Raw("SELECT DISTINCT(quiz) FROM questions WHERE genre=?", genre).Rows()
	if err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(304, "Serverside Error")
	}
	defer rows.Close()
	for rows.Next() {
		var quiz string
		rows.Scan(&quiz)
		fmt.Printf("%s\n", quiz)
		quizes = append(quizes, quiz)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"quizes": quizes,
	})
}

func GetGenres(c *gin.Context) {
	var genres []string
	rows, err := db.Raw("SELECT DISTINCT(genre) FROM questions").Rows()
	if err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(304, gin.H{"genres": genres})
	}
	defer rows.Close()
	for rows.Next() {
		var quiz string
		rows.Scan(&quiz)
		fmt.Printf("%s\n", quiz)
		genres = append(genres, quiz)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"genres": genres,
	})
}

func GetQuizes(c *gin.Context) {
	var quizes []string
	rows, err := db.Raw("SELECT DISTINCT(quiz) FROM questions").Rows()
	if err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(304, "Serverside Error")
	}
	defer rows.Close()
	for rows.Next() {
		var quiz string
		rows.Scan(&quiz)
		fmt.Printf("%s\n", quiz)
		quizes = append(quizes, quiz)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"quizes": quizes,
	})
}

func setScore(c *gin.Context) {
	var attempt Attempts
	c.BindJSON(&attempt)
	db.Create(&attempt)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, "Success")
}

func AddQuestion(c *gin.Context) {
	var question Question
	question.Question = c.PostForm("question")
	question.Quiz = c.PostForm("quiz")
	question.Genre = c.PostForm("genre")
	question.OptionA = c.PostForm("option1")
	question.OptionB = c.PostForm("option2")
	question.OptionC = c.PostForm("option3")
	question.OptionD = c.PostForm("option4")
	check1 := c.PostForm("check1")
	check2 := c.PostForm("check2")
	check3 := c.PostForm("check3")
	check4 := c.PostForm("check4")
	fmt.Printf("%s\n%s\n", question.Question, question.Genre)
	fmt.Printf("%s %s %s %s\n", check1, check2, check3, check4)
	file, err := c.FormFile("file")
	if err != nil {
		fmt.Println("No file")
	} else {
		filepath := fmt.Sprintf("../../react-app/public/images/%s", file.Filename)
		question.Image = fmt.Sprintf("images/%s", file.Filename)
		if err := c.SaveUploadedFile(file, filepath); err != nil {
			c.Header("access-control-alllow-origin", "*")
			c.JSON(400, gin.H{"message": err.Error()})
			return
		}
	}

	if check1 == "on" {
		question.ACorrect = true
	}
	if check2 == "on" {
		question.BCorrect = true
	}
	if check3 == "on" {
		question.CCorrect = true
	}
	if check4 == "on" {
		question.DCorrect = true
	}
	db.Create(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"message": "Successful"})

}

func EditQuestion(c *gin.Context) {
	var question Question
	var existing Question
	c.BindJSON(&question)
	db.Table("questions").Where("id=?", question.ID).First(&existing)
	existing = question
	// editedQues := question
	// db.Table("questions").Updates()
	db.Save(&existing)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"message": "Successful"})
}

func getFullLeader(c *gin.Context) {
	type Row struct {
		ID    int64
		Email string
		Quiz  string
		Score int64
	}
	var rows []Row
	db.Raw("SELECT users.id,users.email,attempts.quiz,attempts.score from users,attempts WHERE attempts.user_id=users.id ORDER BY score DESC").Scan(&rows)

	if err != nil {
		fmt.Printf("Error")
		c.Header("access-control-allow-origin", "*")
		c.JSON(304, "Serverside Error")
	}
	for row := range rows {
		fmt.Println(rows[row])
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{
		"leaderboard": rows,
	})
}
func LeaderboardByQuiz(c *gin.Context) {
	var names []string
	var quizes []string
	var scores []string
	rows, _ := db.Raw("SELECT users.name,attempts.quiz,attempts.score FROM attempts,users WHERE users.id=attempts.user_id ORDER BY attempts.score DESC").Rows()
	defer rows.Close()
	for rows.Next() {
		var name string
		var quiz string
		var score string
		rows.Scan(&name, &quiz, &score)
		names = append(names, name)
		quizes = append(quizes, quiz)
		scores = append(scores, score)
		fmt.Println(name, score, quiz)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"names": names, "scores": scores})
}

func getLeaderGenre(c *gin.Context) {
	var names []string
	var scores []string
	genre := c.Params.ByName("genre")
	fmt.Println(genre)
	rows, _ := db.Raw("SELECT users.name,attempts.score FROM attempts,users WHERE users.id=attempts.user_id AND attempts.genre=? ORDER BY attempts.score DESC", genre).Rows()
	defer rows.Close()
	for rows.Next() {
		var name string
		var score string
		rows.Scan(&name, &score)
		names = append(names, name)
		scores = append(scores, score)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"names": names, "scores": scores})
}

func GetScores(c *gin.Context) {
	var quizes []string
	var scores []int64
	userid := c.Param("userid")
	rows, _ := db.Raw("SELECT quiz,MAX(score) FROM attempts where user_id=? GROUP BY quiz", userid).Rows()
	defer rows.Close()
	for rows.Next() {
		var quiz string
		var score int64
		rows.Scan(&quiz, &score)
		quizes = append(quizes, quiz)
		scores = append(scores, score)
		fmt.Println(quiz, score)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"quizes": quizes, "scores": scores})
}

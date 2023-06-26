import React, {Component} from 'react';
import './Question.css'
import UserNav from './UserNav';
class Questions extends Component{
    constructor(props){
        super(props);
        this.state = {
            answers: [],
            count: 0,
            questions:[],
            score: 0,
            userid: 0
        }
        this.onNext=this.onNext.bind(this);
        this.handleClick=this.handleClick.bind(this);

    }
    componentDidMount(){
        if(sessionStorage.getItem("auth")!=="user")
        {
            this.props.history.push('/');
            return;
        }
        this.setState({userid:sessionStorage.getItem("userid")});

        var quiz = this.props.match.params.quiz;
        fetch("http://localhost:3010/getQuestions/"+quiz,{
            method: 'GET',
        }).then((res)=>res.json())
        .then((rjson)=>{
            for(var i=0;i<rjson.questions.length;i++)
                this.state.answers.push([false,false,false,false]);
            console.log(rjson.questions[0].question);
            this.setState({questions:rjson.questions});
            document.getElementById("question").innerHTML=rjson.questions[this.state.count].question;
            if(this.state.questions[this.state.count].image)    
                document.getElementById("image").src="/"+rjson.questions[this.state.count].image;
            document.getElementById("optiona").innerHTML=rjson.questions[this.state.count].optiona;
            document.getElementById("optionb").innerHTML=rjson.questions[this.state.count].optionb;
            document.getElementById("optionc").innerHTML=rjson.questions[this.state.count].optionc;
            document.getElementById("optiond").innerHTML=rjson.questions[this.state.count].optiond;
        });
    }
    onNext(event)
    {

        this.state.count++;
        if(this.state.count===this.state.questions.length)
        {
            for(var i=0;i<this.state.count;i++)
            {
                if(this.state.answers[i][0]!==this.state.questions[i].acorrect)
                {
                    console.log(this.state.answers[i][0]);
                    continue;
                }
                else if(this.state.answers[i][1]!==this.state.questions[i].bcorrect)
                {
                    console.log(this.state.answers[i][0]);
                    continue;
                }
                else if(this.state.answers[i][2]!==this.state.questions[i].ccorrect)
                {
                    console.log(this.state.answers[i][0]);
                    continue;
                }
                if(this.state.answers[i][3]!==this.state.questions[i].dcorrect)
                {
                    console.log(i+":"+[3]+">"+this.state.answers[i][0]);
                    continue;
                }
                this.state.score=this.state.score+10;
            }
            console.log(this.state.score);
            this.props.history.push("/score/"+this.state.score);

            fetch("http://localhost:3010/setScore",{
                method:"POST",
                body: JSON.stringify({"userid":Number(sessionStorage.getItem("userid")),"score":Number(this.state.score),"quiz":this.props.match.params.quiz,"genre":this.props.match.params.genre})
            })
            return;
        }
        document.getElementById("question").innerHTML=this.state.questions[this.state.count].question;
        if(this.state.questions[this.state.count].image)    
            document.getElementById("image").src="/"+this.state.questions[this.state.count].image;
        document.getElementById("optiona").innerHTML=this.state.questions[this.state.count].optiona;
        document.getElementById("optiona").classList.remove("btn-success");
        document.getElementById("optionb").innerHTML=this.state.questions[this.state.count].optionb;
        document.getElementById("optionb").classList.remove("btn-success");
        document.getElementById("optionc").innerHTML=this.state.questions[this.state.count].optionc;
        document.getElementById("optionc").classList.remove("btn-success");
        document.getElementById("optiond").innerHTML=this.state.questions[this.state.count].optiond;
        document.getElementById("optiond").classList.remove("btn-success");
    }
    handleClick(event)
    {
        console.log(this.state.count);
        console.log(event.target.value);
        if(this.state.answers[this.state.count][event.target.value]==true)
        {
            this.state.answers[this.state.count][event.target.value]=false;
            event.target.classList.remove("btn-success");
        }
        else{
            this.state.answers[this.state.count][event.target.value]=true;
            event.target.classList.add("btn-success");
        }
        
    }
    render(){
        return(
            <div className="text-center">
                <UserNav/>
                <div className="container">
                    <div className="row main" id="image-with-question">
                        <div className="col-md-12 abc">
                            <img id="image" className="img-fluid"></img>
                            <p id="question"> </p>
                        </div>
                    </div>
                    <div className="row">
                        <button id="optiona" className="btn col-md-6" value="0" onClick={this.handleClick}></button>
                        <button id="optionb" className="btn col-md-6" value="1" onClick={this.handleClick}></button>
                        <button id="optionc" className="btn col-md-6" value="2" onClick={this.handleClick}></button>
                        <button id="optiond" className="btn col-md-6" value="3" onClick={this.handleClick}></button>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <button className="btn" onClick={this.onNext}>Next -></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Questions;
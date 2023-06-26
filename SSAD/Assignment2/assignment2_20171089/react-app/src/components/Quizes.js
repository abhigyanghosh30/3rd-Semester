import React, {Component} from 'react';
import UserNav from './UserNav'
import './Quizes.css'
class Quizes extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        if(sessionStorage.getItem("auth")!=="user")
        {
            this.props.history.push('/');
            return;
        }
        var genre = this.props.match.params.genre;
        fetch("http://localhost:3010/getQuiz/"+genre,{
            method: 'GET',
        }).then((res)=>res.json())
        .then((rjson)=>{
            console.log(rjson.quizes);
            this.state.quizes = rjson.quizes;
            
            var ul = document.getElementById("list");
            for(var i in this.state.quizes)
            {
                var div = document.createElement("div");
                div.setAttribute("class","text-center cell");
                var a = document.createElement("a");
                var but=document.createElement("button");

                a.appendChild(document.createTextNode(this.state.quizes[i]));
                a.setAttribute("href","http://localhost:3000/home/"+this.props.match.params.genre+"/"+this.state.quizes[i]);
                but.appendChild(a);
                div.appendChild(but);
				ul.appendChild(div);
            }
        });
        
    }
    
    render(){
        return(
            <div>
                <UserNav/>
                <div className="container">
                    <div className="row" id="list">    
                    </div>
                </div>
            </div>
        )
    }
}
export default Quizes;
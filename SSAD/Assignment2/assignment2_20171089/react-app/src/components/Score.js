import React, {Component} from 'react'
import UserNav from './UserNav';
class Score extends Component{
    constructor(){
        super();
        this.state = {};
        this.logout=this.logout.bind(this);
    }
    logout(event){

    }
    render(){
        return(
            <div>
                <UserNav/>
                <div className="container">
                    <h1>Your Score is: {this.props.match.params.score}</h1>
                    <a href="/home"><button className="btn">Home</button></a>
                </div>
            </div>   
        )
    }
}
export default Score;
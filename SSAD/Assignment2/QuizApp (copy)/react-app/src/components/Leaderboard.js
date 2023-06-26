import React,{Component} from 'react'
import AdminNav from './AdminNav';
import UserNav from './UserNav';
class Leaderboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            leaderboard: []
        }
    }
    componentDidMount(){
        fetch("http://localhost:3010/leaderboard",{
            method:'GET'
        })
        .then(res=>res.json())
        .then((rjson)=>{
            this.setState({'leaderboard':rjson.leaderboard});
            console.log(this.state.leaderboard);
        })
        fetch("http://localhost:3010/genres",{
            method:'GET'
        })
        .then(res=>res.json())
        .then((rjson)=>{
            var selection=document.getElementById("selection");
            for(var i in rjson.genres)
            {
                var options=document.createElement("option");
                options.setAttribute("value","/leaderboard/"+rjson.genres[i]);
                options.innerHTML=rjson.genres[i];
                selection.appendChild(options)
            }
        })
    }
    onSelect(event){
        window.location=event.target.value;
    }
    render(){
        return(
            <div>
            <UserNav/>
            <select className="form-control text-center" id="selection" onChange={this.onSelect}>
            </select>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Quiz</th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                {this.state.leaderboard.map((item,key)=>{
                return (
                    <tr key={key}>    
                        <td>{item.ID}</td>
                        <td>{item.Email}</td>
                        <td>{item.Quiz}</td>
                        <td>{item.Score}</td>
                    </tr>
                    )
                })}
                
                </tbody>
            </table>    
            </div>
        )
    }
}
export default Leaderboard;
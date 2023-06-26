import React,{Component} from 'react'
import UserNav from './UserNav';
class LeaderboardGenre extends Component{
    constructor(props){
        super(props);
        this.state = {
            names:[],
            scores:[]
        }
    }
    componentDidMount(){
        fetch("http://localhost:3010/leaderboard/"+this.props.match.params.genre,{
            method:'GET'
        })
        .then(res=>res.json())
        .then((rjson)=>{
            console.log(rjson);
            this.setState({names:rjson.names});
            this.setState({scores:rjson.scores});
            console.log(this.state.names);
            var table=document.getElementById("board");
            if(rjson.names)
            {
                for(var j=rjson.names.length-1;j>=0;j--)
                {
                    var newrow=table.insertRow(1);
                    var cell1 = newrow.insertCell(0);
                    var cell2 = newrow.insertCell(1);
                    cell1.innerHTML = rjson.names[j];
                    cell2.innerHTML = rjson.scores[j];

                }
            }
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
            <div className="container text-center bg-warning">
            <h4>{this.props.match.params.genre}</h4>
            </div>
            <select className="form-control text-center" id="selection" onClick={this.onSelect}>
            </select>
            <table className="table" id="board">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>    
            </div>
        )
    }
}
export default LeaderboardGenre;
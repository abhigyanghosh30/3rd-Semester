import React, {Component} from 'react';
import UserNav from './UserNav';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			genres: []
		}

	}
	componentDidMount() {
		fetch('http://localhost:3010/genres',{
			method: 'GET',
		})
		.then((response)=>response.json())
		.then((rjson)=>{
			this.setState({'genres':rjson.genres});
			console.log(this.state.genres);
			var ul = document.getElementById("list").getElementsByTagName("tbody")[0];
			
			for(var i=0;i<this.state.genres.length;i++)
			{
				var row=ul.insertRow(0);

				var th = document.createElement('th');
				th.setAttribute("scope","row")
				th.innerHTML = this.state.genres.length-i;
				row.appendChild(th);
				
				var col=row.insertCell(1);				
				var a=document.createElement("a");
				a.setAttribute("href","http://localhost:3000/home/"+this.state.genres[i]);
				a.innerHTML = this.state.genres[i];
				col.appendChild(a);
			}
		})
		fetch("http://localhost:3010/scores/"+sessionStorage.getItem("userid"),{
			method:'GET'
		})
		.then(res=>res.json())
		.then((rjson)=>{
			console.log(rjson);
			var table=document.getElementById("scores");
			for(var i in rjson.quizes)
			{
				var newrow=table.insertRow(1);
				var newcol1=newrow.insertCell(0);
				newcol1.innerHTML = rjson.quizes[i];
				var newcol2=newrow.insertCell(1);
				newcol2.innerHTML = rjson.scores[i];
				table.appendChild(newrow);

			}
		})
		const authvalue = sessionStorage.getItem("auth");
		console.log(authvalue);
		if(authvalue){
			this.setState({auth:authvalue});
		}
		if(authvalue!=='user')
		{
			this.props.history.push('/');
		}
		
	}
	render(){
		return(
				<div>
				<UserNav/>
					<table id="list" className="container text-center table table-hover">
						<thead className="thead-dark">
							<tr>
								<th colSpan="2" scope="col">Genres</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					<table className="container table text-center table-bordered" id="scores">
					<thead className="thead-dark">
						<tr>
							<th>Quiz</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
					</table>
				</div>

		)
	}
}

export default Home;
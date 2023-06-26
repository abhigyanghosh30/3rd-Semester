import React, {Component} from 'react';
import AdminNav from './AdminNav';
import ViewUsers from './ViewUsers';
import ViewQuestions from './ViewQuestions';

class AdminHome extends Component {
  	constructor() {
		super();
		this.state = {
			registerData: {
			},
			loginData: {
			}
		}
	}
	componentDidMount() {
		const authvalue = sessionStorage.getItem("auth");
		console.log(authvalue);
		if(authvalue){
			this.setState({auth:authvalue});
		}
		if(authvalue!=='admin')
		{
			this.props.history.push('/');
		}
	}
	
	render(){
		return(
			<div>
				<ViewUsers/>
				<br/>

			</div>
		)
	}
}

export default AdminHome;
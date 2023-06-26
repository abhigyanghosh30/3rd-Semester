import React, {Component} from 'react';
import './AddUser.css'

class AddUser extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			registerData: {
			},
			loginData: {
			}
		}
		this.RegisterSubmit = this.RegisterSubmit.bind(this);
		this.RegisterName = this.RegisterName.bind(this);
		this.RegisterEmail = this.RegisterEmail.bind(this);
		this.RegisterPassword = this.RegisterPassword.bind(this);
		this.loginEmail = this.loginEmail.bind(this);
		this.loginPassword = this.loginPassword.bind(this);
		this.LoginSubmit = this.LoginSubmit.bind(this);

	}
	RegisterSubmit(event){
		console.log("Sending data");
		event.preventDefault();
		fetch("http://localhost:3010/register",{
			method: 'POST',
			body: JSON.stringify(this.state.registerData)
		})
		.then((response)=>response.json())
		.then((rjson)=>{
			console.log(rjson.message);
			document.getElementById("RegisterMessage").innerHTML=rjson.message;
			// window.location="localhost:3000/home";
		})
	}

	LoginSubmit(event){
		console.log("Verifying User");
		event.preventDefault();
		fetch('http://localhost:3010/login',{
			method: 'POST',
			body: JSON.stringify(this.state.loginData)
		})
		.then((response)=>response.json())
		.then((rjson)=>{
			console.log(rjson);
			document.getElementById("LoginMessage").innerHTML=rjson.message;
			if(rjson.auth==="true"){
				sessionStorage.setItem('auth','user');
				console.log(rjson);
				sessionStorage.setItem('userid',rjson.userid);
				this.props.history.push("/home");		
			}
			if(rjson.auth==="admin"){
				sessionStorage.setItem('auth','admin');
				sessionStorage.setItem('userid',-1);
				this.props.history.push("/admin_home");
			}
		})
	}
	componentDidMount(){
		const authvalue = sessionStorage.getItem("auth");
		if(authvalue==="user")
		{
			this.props.history.push('/home');
		}
		if(authvalue==="admin")
		{
			this.props.history.push('/admin_home');
		}
	}
	RegisterEmail(event){
		this.state.registerData.Email = event.target.value;
	}

	RegisterName(event){
		this.state.registerData.Name = event.target.value;
	}

	RegisterPassword(event){
		this.state.registerData.Password = event.target.value;
	
	}

	loginEmail(event){
		this.state.loginData.Email = event.target.value;
	}

	loginPassword(event){
		this.state.loginData.Password = event.target.value;
	}

	render(){
		return(
			<div className="container">
				<div className="row-add-user  text-white">
					<div className="bg-dark col-add-user">
						<h3 className="text-white text-center">Login</h3>
						<form onSubmit={this.LoginSubmit}>
							<div className="form-group">
								<label>Email</label>
								<input type="email" className="form-control" value={this.state.loginData.Email} onChange={this.loginEmail}/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" value={this.state.loginData.Password} onChange={this.loginPassword}/>
							</div>
								<button type="submit" className="btn btn-primary">Submit</button>
						</form>
						<h2 id="LoginMessage"></h2>
					</div>
					<div className="bg-dark col-add-user">
						<h3 className="text-white text-center">Register</h3>
						<form onSubmit={this.RegisterSubmit}>
							<div className="form-group">
								<label>Name</label>
								<input type="text" className="form-control" value={this.state.registerData.Name} onChange={this.RegisterName}/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input type="email" className="form-control" value={this.state.registerData.Email} onChange={this.RegisterEmail}/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input type="password" className="form-control" value={this.state.registerData.Password} onChange={this.RegisterPassword}/>
							</div>
								<button type="submit" className="btn btn-default">Submit</button>
						</form>
						<h2 id="RegisterMessage"></h2>
					</div>
				</div>
				
				
			</div>		
				
		)
	}
}

export default AddUser;
import React,{Component} from 'react'
class AdminNav extends Component{
	constructor(props){
		super(props);
		this.logout=this.logout.bind(this);
	}
	componentDidMount()
	{
            if(sessionStorage.getItem('auth')!="admin")
        {
            window.location='/';
        }
	}
	logout(event)
	{
		
		console.log(this.props);
		sessionStorage.setItem('auth','None');
		window.location="http://localhost:3000/";
	}
	render(){
		return(
			<nav className="navbar navbar-expand-lg fixed-top navbar-dark text-white bg-danger">
				<div className="navbar-header">
					<a className="navbar-brand" href='/'>React App</a>
				</div>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav text-center">
						<a className="nav-item nav-link" href="/admin_home">Home</a>
						<a className="nav-item nav-link" href="/view_questions">View Questions</a>
						<a className="nav-item nav-link" href="/add_question">Add Question</a>
						<a className="nav-item nav-link" href="view_users">View Users</a>
						<a class="nav-item nav-link" onClick={this.logout}>Logout</a>
					</div>
				</div>
			</nav>
		)
	}
}
export default AdminNav;
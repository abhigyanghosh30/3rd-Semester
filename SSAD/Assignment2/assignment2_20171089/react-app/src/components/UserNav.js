import React, {Component} from 'react'
import './UserNav.css'
class UserNav extends Component  {   
    constructor(props)
    {
        super(props);
        this.logout=this.logout.bind(this);
    }
    componentDidMount()
    {
        if(sessionStorage.getItem('auth')!="user")
        {
            window.location='/';
        }
    }
    logout(event)
    {
        sessionStorage.setItem('auth','None');
        window.location="/";
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <a className="nav-link nav-item" href="/home">Home</a>
                        <a className="nav-link nav-item" href="/leaderboard">LeaderBoard</a>
                        <a className="nav-link nav-item" onClick={this.logout}>Logout</a>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default UserNav;
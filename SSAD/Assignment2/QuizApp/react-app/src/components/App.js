import React, { Component } from 'react';
import Quizes from './Quizes';
import Home from './Home';
import AddUser from './AddUser';
import AdminHome from './AdminHome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Questions from './Questions';
import Score from './Score';
import AddQuestion from './AddQuestion';
import ViewQuestions from './ViewQuestions';
import EditQuestion from './EditQuestion';
import Leaderboard from './Leaderboard';
import LeaderboardGenre from './LeaderboardGenre';
import ViewUsers from './ViewUsers';

class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path='/home' component={Home}/>} />
              <Route exact path='/' component={AddUser} />
              <Route exact path='/admin_home' component={AdminHome} />
              <Route exact path='/home/:genre' component={Quizes} />
              <Route exact path='/home/:genre/:quiz' component={Questions} />
              <Route exact path='/score/:score' component={Score}/>
              <Route exact path='/add_question' component={AddQuestion}/>
              <Route exact path='/view_questions' component={ViewQuestions} />
              <Route exact path='/edit_question/:quizid' component={EditQuestion}/>
              <Route exact path='/leaderboard' component={Leaderboard}></Route>
              <Route exact path='/leaderboard/:genre' component={LeaderboardGenre}/>
              <Route exact path='/view_users' component={ViewUsers}/>
            </Switch>
        </Router>
    );
  }
}

export default App;

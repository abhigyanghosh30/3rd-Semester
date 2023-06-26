import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      delitems: [],
      deleted: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
  }

  handleDelete(event){
    event.preventDefault();
    for( var i in this.state.delitems){
      fetch('http://127.0.0.1:8080/people/'+this.state.delitems[i],{
        method:'delete'
      }).then(response=>{
        window.location.reload();
        console.log(response.json());
      });
      ;
    }
  }
  handleLChange(event){
    console.log(event.target.value);  
    this.state.delitems.push(event.target.value);  
    // fetch('http://127.0.0.1:8080/people/'+event.target.value,{
    //   method:'delete',
    // }).then(response=>{console.log(response);})
    // .catch(err=>{console.error(err);});
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
        
        {/* <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.city}</td>
                      <td><button className="btn btn-default" type="submit" onSubmit={this.handleDelete}>Delete</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table> */}
       <form onSubmit={this.handleDelete}>
       {this.state.data.map((item,key)=>{
         return(
          <div className="form-group">
            <label>{item.firstname} {item.lastname}</label>
            <input type="checkbox" className="form-control" value={item.id} onClick={this.handleLChange}/>
          </div>
         )
       })}
       <button type="submit" className="btn btn-default">Submit</button>
       </form>
       {this.state.deleted &&
          <div>
            <h2>
              Selected people have beeen deleted              
            </h2>
          </div>
        }
      </div>
    );
  }
}

export default DeletePerson;

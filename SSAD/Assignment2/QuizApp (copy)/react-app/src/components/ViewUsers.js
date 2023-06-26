import React,{Component} from 'react'
import AdminNav from './AdminNav';
class ViewUsers extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            users:[]
        };
        this.handleDelete=this.handleDelete.bind(this);
    }
    componentDidMount(){
        fetch("http://localhost:3010/allusers",{
            method:'GET'
        })
        .then(res=>res.json())
        .then((rjson)=>{
            console.log(rjson);
            var users=[];
            for (var i in rjson.names)
            {
                users.push({id:rjson.ids[i],name:rjson.names[i],email:rjson.emails[i]});
            }
            this.setState({users:users});
            console.log(this.state);
        })
    }
    handleDelete(event)
    {
        console.log(event.target.value);
        if(window.confirm("DELETE USER?"))
        {
            fetch("http://localhost:3010/deluser/"+event.target.value,{
                method:'GET'
            })
            .then(()=>{window.location.reload()})
        }
    }
    render(){
        return(
            <div>
                <AdminNav/>
                <table className="table text-center" id="users">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map((item,key)=>{
                            return(
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td><button className="btn btn-danger" value={item.id} onClick={this.handleDelete}>DELETE</button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        ) 
    }
}
export default ViewUsers;
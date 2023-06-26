import React, {Component} from 'react'
import AdminNav from './AdminNav';
class ViewQuestions extends Component{
    constructor(){
        super();
        this.state = {
            genres: [],
            quizes: [],
            questions: []
        }
        this.handleEdit=this.handleEdit.bind(this);
    }
    componentDidMount(){
        if(sessionStorage.getItem("auth")!=="admin")
        {
            this.props.history.push("/");
            return;
        }
        fetch("http://localhost:3010/getAllQuestions",{
            method: "GET"
        })
        .then(res=>res.json())
        .then((rjson)=>{
            console.log(rjson.questions);
            this.setState({"questions": rjson.questions});
        })
    }
    handleEdit(event)
    {
        event.preventDefault();
        console.log(event.target.name);
        this.props.history.push('/edit_question/'+event.target.name);
    }
    handleDelete(event)
    {
        console.log(event.target.name);
        if(window.confirm("DELETE Question")){
            fetch("http://localhost:3010/delquestion/"+event.target.name,{
                method:'DELETE'
            })
            .then(()=>{
                window.location.reload();
            });
        }
    }
    render(){
        return(
            <div className="text-center text-white">
                <AdminNav/>

            <table className="table table-dark" style={{width:"100vw",overflow:"scroll"}}>
                <thead>
                    <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Quiz</th>
                    <th scope="col">Option A</th>
                    <th scope="col">Option B</th>
                    <th scope="col">Option C</th>
                    <th scope="col">Option D</th>
                
                    </tr>
                </thead>
                <tbody>
                    {this.state.questions.map((item,key)=>{
                        // var id1=item.id+"_optiona";
                        // var id2=item.id+"_optionb";
                        // var id3=item.id+"_optionc";
                        // var id4=item.id+"_optiond";
                        var class1="bg-dark";
                        var class2="bg-dark";
                        var class3="bg-dark";
                        var class4="bg-dark";
                        if(item.acorrect){
                            class1="bg-success";
                        }
                        if(item.bcorrect){
                            class2="bg-success";
                        }
                        if(item.ccorrect){
                            class3="bg-success";
                        }
                        if(item.dcorrect){
                            class4="bg-success";
                        }
                        return(
                            <tr key={key}>
                                <td>{item.question}</td>
                                <td>{item.quiz}</td>
                                <td className={class1}>{item.optiona}</td>
                                <td className={class2}>{item.optionb}</td>
                                <td className={class3}>{item.optionc}</td>
                                <td className={class4}>{item.optiond}</td>
                                <td><button className="btn" name={item.id} onClick={this.handleEdit}>EDIT</button></td>
                                <td><button className="btn" name={item.id} onClick={this.handleDelete}>DELETE</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>   
        )
    }
}
export default ViewQuestions;
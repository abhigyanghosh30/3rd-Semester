import React, {Component} from 'react'
import AdminNav from './AdminNav';
class AddQuestion extends Component{
    constructor()
    {
        super();
        this.state={
            quizes:[]
        }
    }
    componentDidMount(){
        fetch("http://localhost:3010/getQuizes",{
            method:"GET"
        })
        .then(res=>res.json())
        .then((rjson)=>{
            this.setState({quizes:rjson.quizes});
            console.log(this.state.quizes);
        })
    }
    handleSubmit(event)
    {
        setInterval(()=>{window.location="/admin_home"},3000);
    }
    render(){
        return(
            <div>
                <AdminNav/>
                <form enctype="multipart/form-data" action="http://localhost:3010/add_question" target="_blank" method="POST" onSubmit={this.handleSubmit} className="container">
                    <div class="form-group">
                        <label for="quiz">Quiz</label>
                        <input type="text" class="form-control" id="quiz" name="quiz" placeholder="Quiz" required/>
                    </div>
                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <input type="text" class="form-control" id="genre" name="genre" placeholder="Genre" required/>
                    </div>
                    <div className="custom-file">
                        <label for="file" className="custom-file-label">Image File</label>
                        <input type="file" id="file" name="file" className="custom-file-input" />
                    </div>
                    <div class="form-group">
                        <label for="question">Question</label>
                        <textarea class="form-control" id="question" name="question" placeholder="Enter Question" required/>
                    </div>
                    <div class="form-group">
                        <label for="option1">Option 1</label>
                        <input type="text" class="form-control" id="option1" name="option1" placeholder="Option" required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="check1" id="check1"/>
                        <label class="form-check-label" for="check1">Is Answer?</label>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="option2">Option 2</label>
                        <input type="text" class="form-control" id="option2" name="option2" placeholder="Option" required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="check2" id="check2"/>
                        <label class="form-check-label" for="check2">Is Answer?</label>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="option3">Option 3</label>
                        <input type="text" class="form-control" id="option3" name="option3" placeholder="Option" required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="check3" id="check3"/>
                        <label class="form-check-label" for="check3">Is Answer?</label>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="option4">Option 4</label>
                        <input type="text" class="form-control" id="option4" name="option4" placeholder="Option" required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="check4" id="check4"/>
                        <label class="form-check-label" for="check4">Is Answer?</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
				
            </div>   
        )
    }
}
export default AddQuestion;
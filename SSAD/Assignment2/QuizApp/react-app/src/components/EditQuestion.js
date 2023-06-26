import React, {Component} from 'react'
import AdminNav from './AdminNav';
class EditQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            quizid: this.props.match.params.quizid,
            question: {}
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch("http://localhost:3010/getQuestion/"+this.state.quizid,{
            method:"GET"
        })
        .then(res=>res.json())
        .then((rjson)=>{
            this.setState({'question':rjson.question})
            console.log(this.state.question)
            document.getElementById("acorrect").checked = this.state.question.acorrect;
            document.getElementById("bcorrect").checked = this.state.question.bcorrect;
            document.getElementById("ccorrect").checked = this.state.question.ccorrect;
            document.getElementById("dcorrect").checked = this.state.question.dcorrect;
        })
        
    }
    handleChange(event){
        event.preventDefault();
        var question = this.state.question;
        question[event.target.id]=event.target.value;
        this.setState({'question':question});
    }
    
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.question);
        var question = this.state.question;
        question.acorrect=document.getElementById('acorrect').checked;
        question.bcorrect=document.getElementById('bcorrect').checked;
        question.ccorrect=document.getElementById('ccorrect').checked;
        question.dcorrect=document.getElementById('dcorrect').checked;
            
        console.log(question.acorrect);
        console.log(question.bcorrect);
        console.log(question.ccorrect);
        console.log(question.dcorrect);
        this.setState({'question':question});
        fetch("http://localhost:3010/edit_question",{
            method:'POST',
            body:JSON.stringify(this.state.question)
        })
        .then(()=>{
            this.props.history.push('/view_questions');
        })
    }
    render(){
        return(
            <div>
                <AdminNav/>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label for="quiz">Quiz</label>
                        <input type="text" class="form-control" id="quiz" name="quiz" placeholder="Quiz" value={this.state.question.quiz} onChange={this.handleChange} required/>    
                    </div>
                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <input type="text" class="form-control" id="genre" name="genre" placeholder="Genre" value={this.state.question.genre} onChange={this.handleChange} required/>    
                    </div>
                    {/* <div className="custom-file">
                        <label for="file" className="custom-file-label">Image File</label>
                        <input type="file" id="file" name="file" className="custom-file-input"/>
                    </div> */}
                    <div class="form-group">
                        <label for="question">Question</label>
                        <textarea class="form-control" id="question" name="question" placeholder="Enter Question" value={this.state.question.question} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-group">
                        <label for="optiona">Option 1</label>
                        <input type="text" class="form-control" id="optiona" name="optiona" placeholder="Option" value={this.state.question.optiona} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="acorrect" id="acorrect" />
                        <label class="form-check-label" for="acorrect">Is Answer?</label>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="optionb">Option 2</label>
                        <input type="text" class="form-control" id="optionb" name="optionb" placeholder="Option" value={this.state.question.optionb} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="bcorrect" id="bcorrect" />
                        <label class="form-check-label" for="bcorrect">Is Answer?</label>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="optionc">Option 3</label>
                        <input type="text" class="form-control" id="optionc" name="optionc" placeholder="Option" value={this.state.question.optionc} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="ccorrect" id="ccorrect" />
                        <label class="form-check-label" for="ccorrect">Is Answer?</label>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="optiond">Option 4</label>
                        <input type="text" class="form-control" id="optiond" name="optiond" placeholder="Option" value={this.state.question.optiond} onChange={this.handleChange} required/>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" name="dcorrect" id="dcorrect"/>
                        <label class="form-check-label" for="dcorrect">Is Answer?</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default EditQuestion;
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HomeComponent from "../home/home";
export default class AddTask extends Component {
  tasks = new HomeComponent();
  state = {
      id: "",
      desc: "",
      title: "",
      date: "",
      done : false
  };

  componentDidMount(){
    const currentTask =  this.tasks.allTasks().filter(task => task.id === Number.parseInt(this.props.match.params.id))[0]
    if(currentTask){
      const date = new Date(currentTask.date)
      this.setState({
        id: currentTask.id,
        desc: currentTask.desc,
        title: currentTask.title,
        date: date,
        done: currentTask.done
      })
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value,
    });
  };
  setStartDate = (date) => {
      this.setState({
          date : date
      })
  };

  submit = (e) => {
      e.preventDefault();
      console.log(this.state)
  }

addTask = () => {
  if(this.state.title && this.state.date){
    this.tasks.addTask(this.state)
    this.props.history.push('/')
  }
}
editTask = () => {
  if(this.state.title && this.state.date){
 
    this.tasks.editTask(Number.parseInt(this.props.match.params.id), this.state);
    this.props.history.push('/')
  }
}

  render() {
    const submitBTN = this.props.match.params.id === undefined? 
    <button className="btn btn-primary m-2" onClick={() => this.addTask()}>Add Task</button>:
    <button className="btn btn-primary m-2" onClick={() => this.editTask()}>Edit Task</button>


    return (
      <div>
        <form className="border p-4 shadow" onSubmit={this.submit} style={{maxWidth:'500px',margin:'auto'}}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input required type="text" className="form-control" id="title" value={this.state.title || ''} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea  className="form-control" id="desc" value={this.state.desc || ''} onChange={this.handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="deadLine">DeadLine</label>
            <DatePicker
            required
            showTimeSelect
            inline={true}
              id="deadLine"
              selected={this.state.date}
              onChange={(date) => this.setStartDate(date)}
            />
          </div>
{submitBTN}   
<button type="button" className="btn btn-dark m-2" onClick={() => this.props.history.push('/')}>Cancel</button>
</form>
      </div>
    );
  }
}

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class AddTask extends Component {
  allTasks = [];
  constructor(){
    super();
  }
  state = {
    id: "",
    desc: "",
    title: "",
    date: "",
    done : false
  };
  
  componentDidMount(){
    let tasks = [];
    if(localStorage.getItem('tasks')){
      tasks = this.allTasks = JSON.parse(localStorage.getItem('tasks'));
      const currentTask = this.props.match.params? tasks.filter(task => task.id === Number.parseInt(this.props.match.params.id))[0] : null
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
    
  }


  editTask = () => {
    const index = this.allTasks.findIndex((t) => t.id.toString() === this.props.match.params.id);
    console.log(this.state, index);
    this.allTasks[index] = this.state;
    localStorage.setItem("tasks", JSON.stringify(this.allTasks))
    this.props.history.push('/')

  };

  addTask = () => {
    const obj = {
      id : Math.floor(Math.random() * 1000),
      desc: this.state.desc ,
      title: this.state.title,
      date: this.state.date,
      done : false
    }
  
    this.allTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(this.allTasks))
    this.props.history.push('/')
  };

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
<button type="button" className="btn btn-dark m-2" onClick={() => this.props.history.push('/')}>Back Home</button>
</form>
      </div>
    );
  }
}

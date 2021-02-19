import React, { Component, Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Status } from "../../utils/utils";
import './home.scss';
export default class HomeComponent extends Component {
  state = {
    allTasks: [],
  };

  constructor(){
    super();
    
  }
  componentDidMount() {
    if (localStorage.getItem("tasks")) {
      const array = JSON.parse(localStorage.getItem("tasks"));
      console.log(array)
      this.setState({
        allTasks: array,
      });
    }
  }
  getDateDiff = (date1, date2) => {
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };


  handleStatus = (e,id)=> {
    const index = this.state.allTasks.findIndex((task) => task.id === id)
    const newTask =  this.state.allTasks[index]
    newTask.done = e.target.value
    this.state.allTasks[index] = newTask;
    const newTasks = this.state.allTasks;
    this.setState({
      allTasks: newTasks
    },
    () => {
      localStorage.setItem("tasks", JSON.stringify(this.state.allTasks));
    })
  }
  deleteTask = (id) => {
    this.setState(
      {
        allTasks: this.state.allTasks.filter((task) => task.id !== id),
      },
      () => {
        localStorage.setItem("tasks", JSON.stringify(this.state.allTasks));
      }
    );
  };

  

  render() {
    const date = new Date();
    let items = null;
    if(this.state.allTasks && this.state.allTasks.length !== 0){
       items = this.state.allTasks.map((task) => {
        return (
          <tr
            className={
              task.done === Status.DONE
                ? "alert alert-success "
                : this.getDateDiff(date, new Date(task.date)) < 1
                ? "alert alert-danger"
                : "alert alert-warning"
            }
            key={task.id}
          >
            <td>
              <NavLink to={"/task/" + task.id}>{task.title}</NavLink>
            </td>
            <td>{new Date(task.date).toLocaleString()}</td>
            <td>
              <select value={task.done} onChange={(e) => this.handleStatus(e,task.id)}>
                  <option value={Status.NOTYET}>{Status.NOTYET}</option>
                  <option value={Status.DONE}>{Status.DONE}</option>
              </select>
            </td>
            <td>
              <Button
                onClick={() => this.deleteTask(task.id)}
                className="mx-1"
                variant="danger"
              >
                Delete Task
              </Button>
              <NavLink className="btn btn-dark" to={"/task/" + task.id}>
             Details
          </NavLink>
            </td>
          </tr>
        );
      });
    }else{
      items = (<div>No tasks</div>)
    }

    return (
      <Fragment>
        <Table bordered>
          <thead>
            <tr>
              <td>Name</td>
              <td>Deadline</td>
              <td>Done</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </Table>
        <div className="my-3 text-center">
          <NavLink className="btn btn-primary" to="/task">
            Add Task
          </NavLink>
        </div>
      </Fragment>
    );
  }
}

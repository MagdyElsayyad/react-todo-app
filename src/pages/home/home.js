import React, { Component, Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { BrowserRouter, NavLink } from "react-router-dom";
export default class HomeComponent extends Component {
  state = {
    allTasks : [
      {
        id: 0,
        title: "hfghfh",
        done: false,
        date: "2021-02-10T22:00:00.000Z",
        desc: "fdsfsfsdfsf",
      },
      {
        id: 1,
        title: "gghjgjhg",
        done: false,
        date: "2021-02-10T22:00:00.000Z",
        desc: "fdsfsfsdfsf",
      },
      {
        id: 2,
        title: "hghgfhh",
        done: true,
        date: "2021-02-10T22:00:00.000Z",
        desc: "fdsfsfsdfsf",
      },
    ]
  
  };

  allTasks = () => {
    return this.state.allTasks;
  }

  componentDidMount(){
    if(localStorage.getItem('tasks')){
      this.setState({
        allTasks : JSON.parse(localStorage.getItem('tasks'))  
      })

  }
  }
  getDateDiff = (date1, date2) => {
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  addTask = (task) => {
    task.id = Math.floor(Math.random() * 1000);
    this.setState({
      allTasks : this.state.allTasks.push(task)
    })
    
    localStorage.setItem('tasks', JSON.stringify(this.state.allTasks));
}
deleteTask = (id) => {
    this.setState({
      allTasks : this.state.allTasks.filter(task => task.id !== id)
    });
    localStorage.setItem('tasks', JSON.stringify(this.state.allTasks));
}

editTask = (id, task) => {
  const index = this.state.allTasks.findIndex(task => task.id === id);
  const newTasks = this.state.allTasks[index] = task;
  this.setState({
    allTasks : newTasks
  })
  localStorage.setItem('tasks', JSON.stringify(this.state.allTasks));
}
  
  render() {
    const date = new Date();
    let items = this.state.allTasks.map((task) => {
      return (
        <tr
          className={
            task.done
              ? "alert alert-success"
              : this.getDateDiff(date, new Date(task.date)) < 1
              ? "alert alert-danger"
              : "alert alert-warning"
          }
          key={task.id}
        >
          <td><NavLink to={'/task/' + task.id}>{task.title}</NavLink></td>
          <td>{task.date}</td>
          <td>{task.done ? "Done" : "Not Yet"}</td>
          <td>
              <Button onClick={() => this.deleteTask(task.id)} className="mx-1" variant="danger">
              Delete Task
              </Button>
              <Button className="mx-1" variant="dark">
              Details
              </Button>
          </td>
        </tr>
      );
    });
    
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
              <NavLink className="btn btn-primary" to="/task">Add Task</NavLink>
        </div>
      </Fragment>
    );
  }
}

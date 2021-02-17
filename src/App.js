import './App.scss';
import { Fragment } from 'react';
import HomeComponent from './pages/home/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddTask from './pages/addTask/addTask';

function App() {
  return (
    <Fragment>

      <div>
        <h1 className="my-4 text-center">React ToDo list</h1>
      </div>
     <BrowserRouter>
       <Switch>
          <Route path="/" exact component={HomeComponent} />
          <Route path="/tasks"  component={HomeComponent} />
          <Route path="/task/:id"  component={AddTask} />
          <Route path="/task"  component={AddTask} />
       </Switch>
     </BrowserRouter>
    
    </Fragment>
  );
}

export default App;

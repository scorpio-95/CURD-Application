import {BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HOME from './pages/Home';
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <ToastContainer position='top-center'/>
        <Switch>
          <Route exact path="/" component={HOME} />
          <Route path="/addName" component={AddEdit}/>
          <Route path="/update/:id" component={AddEdit}/>
          <Route path="/view/:id" component={View}/>
        </Switch>     
    </div> 
      </BrowserRouter>
  );
}

export default App;

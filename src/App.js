import './App.css';
import React,{Component} from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'


export default class App extends Component{
  c="asit";
  render(){//it is a life cycle method
    return(
      <div className="">
        {/* <h1>my name is {this.c}</h1> */}
        <Router>

        <NavBar/>
        <Routes>
          <Route exact path="/" element={<News key={"general"} pageSize={12} category="general"/>}/>
          <Route exact path="/business" element={<News key={"buisness"} pageSize={12} category="business"/>}/>
          <Route exact path="/ent" element={<News key={"entertainment"} pageSize={12} category="entertainment"/>}/>
          <Route exact path="/health" element={<News key={"health"} pageSize={12} category="health"/>}/>
          <Route exact path="/sports" element={<News key={"sports"} pageSize={12} category="sports"/>}/>
          <Route exact path="/tech" element={<News key={"technology"} pageSize={12} category="technology"/>}/>
          <Route exact path="/sci" element={<News key={"science"} pageSize={12} category="science"/>}/>
        </Routes>
      </Router>
      </div>
    )
  }
}
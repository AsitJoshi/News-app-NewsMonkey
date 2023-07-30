import './App.css';
import React,{Component} from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component{
  constructor(){
    super()
    this.state = {
      progress:0
    }
  }
  setProgress=(progress)=>{//arrow function kuki
    this.setState({progress: progress})
  }
  c="asit";
  // apikey = "9cfc4dc3c97c41c5a2cc029b577a95b3";
  apikey = process.env.REACT_APP_NEWS_API;
  render(){//it is a life cycle method
    return(
      <div className="">
        {/* <h1>my name is {this.c}</h1> */}
        <Router>

        <NavBar/>
        <LoadingBar 
        color='#0d6efd' progress={this.state.progress} height={4} />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"general"} pageSize={12} category="general"/>}/>
          <Route exact path="/business" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"buisness"} pageSize={12} category="business"/>}/>
          <Route exact path="/ent" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"entertainment"} pageSize={12} category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"health"} pageSize={12} category="health"/>}/>
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"sports"} pageSize={12} category="sports"/>}/>
          <Route exact path="/tech" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"technology"} pageSize={12} category="technology"/>}/>
          <Route exact path="/sci" element={<News setProgress={this.setProgress} apikey={this.apikey} key={"science"} pageSize={12} category="science"/>}/>
        </Routes>
      </Router>
      </div>
    )
  }
}
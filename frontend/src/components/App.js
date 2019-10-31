import React, { Component } from "react";
import {BrowserRouter} from 'react-router-dom'
import Posts from './Posts'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: "backend-data"
    };
  }

  //To run inside the Workspace, please include the credentials.
  
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
    const url = `${api}/categories`;
    console.log("fetching from url", url);
    fetch(url, {
      headers: { Authorization: "whatever-you-want" },
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        this.setState({ backend: data });
      });
  }

  // To run outside of the Workspace, please do not include the credentials.

  /* 
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
    const url = `${api}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({backend:data});
      });
  }
  */

  render() {
    return (
    
      <div>
        <div className="header-title">
          <h2>Readable</h2>
        </div>
        <div className="content">
         <Posts/>
        </div>
      </div>
     
    );
  }
}

export default App;
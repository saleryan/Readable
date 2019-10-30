# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and start the pre-scaffolded Create React App project
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## Access The API Server

To accesss the backend server in your code, we have stored the URL to the API server in the environment variable `REACT_APP_BACKEND` which you can access in your code using `process.env.REACT_APP_BACKEND`. In order for your project to run outside of the Workspace, you need to handle the case where the environment variable is not set. You can do it like this: `const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001'`. 

To run inside the Workspace, please include the credentials. For example:

  ```js
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
  ```

To run outside of the Workspace, please do not include the credentials. For example:

  ```js
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
    const url = `${api}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({backend:data});
      });
  }
  ```

You can see this in action in `frontend/src/App.js` in `componentDidMount`.

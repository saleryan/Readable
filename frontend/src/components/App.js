import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import Posts from './Posts'
import handleInitialData from '../actions/shared'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'
import NewPost from './NewPost'
import NewComment from './NewComment'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
  
    render() {
        return (

            <div className='container'>
                <div className="header-title">
                    <h2>Readable</h2>
                </div>
                <div className="content">
                    <BrowserRouter>
                        <Route exact path='/' component={Posts} />
                        <Route exact path='/:category' component={Posts} />
						<Route exact path='/posts/add' component={NewPost} />
						<Route exact path='/:category/:id(\w{21,22})' component={PostDetail} />
						
						<Route exact path='/comments/add/:id' component={NewComment} />
                    </BrowserRouter>
                </div>
            </div>

        );
    }
}

export default connect()(App);
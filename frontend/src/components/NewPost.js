import React, { Component } from 'react'
import { handleAddPost } from '../actions/posts'
import { connect } from 'react-redux'
import EditablePost from './EditablePost'

class NewPost extends Component {
    handleSubmit = (post, authedUser) => {
        this.props.dispatch(handleAddPost(post, authedUser))
    }

    render() {
        return (
          <EditablePost header={'Compose new Post'} handleSubmit={this.handleSubmit}/>
        )
    }
}

export default connect()(NewPost)
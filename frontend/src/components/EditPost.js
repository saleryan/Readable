import React, { Component } from 'react'
import { handleEditPost } from '../actions/posts'
import { connect } from 'react-redux'
import EditablePost from './EditablePost'

class EditPost extends Component {
    handleSubmit = ({body, title}, authedUser) => {
        this.props.dispatch(handleEditPost({body, title}, authedUser))
    }

    render() {
        return (
          <EditablePost id={this.props.id} 
          header={'Edit Post'} 
			showCategory={false} 
			handleSubmit={this.handleSubmit}/>
        )
    }
}

function mapStateToProps(state, props) {
 return {
  id: props.match.params.id
 }
}

export default connect(mapStateToProps)(EditPost)
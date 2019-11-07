import React, { Component } from 'react'
import { handleAddComment } from '../actions/comments'
import { connect } from 'react-redux'
import EditableComment from './EditableComment'

class NewComment extends Component {
    handleSubmit = ({ body, parentId }, authedUser) => {
        const { dispatch } = this.props
        dispatch(handleAddComment({ body, parentId, author: authedUser }, authedUser))
    }

    render() {
        return (
            <EditableComment header='Compose new Comment'
                handleSubmit={this.handleSubmit}
                parentId={this.props.parentId} />
        )
    }
}

function mapStateToProps(state, props) {
    const { parentId } = props.match.params
    return {
        authedUser: state.authedUser,
        parentId
    }
}

export default connect(mapStateToProps)(NewComment)
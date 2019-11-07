import React, { Component } from 'react'
import { handleEditComment } from '../actions/comments'
import { connect } from 'react-redux'
import EditableComment from './EditableComment'

class EditComment extends Component {
    handleSubmit = ({ body, parentId, id }, authedUser) => {
        const { dispatch } = this.props
        dispatch(handleEditComment({ body, parentId, id, author: authedUser }, authedUser))
    }

    render() {
        return (
            <EditableComment header='Edit Comment'
                handleSubmit={this.handleSubmit}
                id={this.props.id}
                parentId={this.props.parentId}
            />
        )
    }
}

function mapStateToProps(state, props) {
    const { id, parentId } = props.match.params
    return {
        authedUser: state.authedUser,
        id,
        parentId
    }
}

export default connect(mapStateToProps)(EditComment)
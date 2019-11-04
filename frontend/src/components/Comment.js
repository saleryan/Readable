import React, { Component } from 'react'
import { connect } from 'react-redux'

class Comment extends Component {
    render() {
        const { body } = this.props.comment;
        return (<div> {body} </div>)
    }
}

function mapStateToProps(state, { id }) {
    
    const comment = state.comments ? state.comments[id] : null;

    return {
        comment
    }
}

export default connect(mapStateToProps)(Comment)
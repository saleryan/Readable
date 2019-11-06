import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import { handleReceiveComments } from '../actions/comments'
import { Link } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa/index'

class PostDetail extends Component {
    componentDidMount() {
        const { id, authedUser } = this.props;
        this.props.dispatch(handleReceiveComments(id, authedUser));
    }

    render() {
        const { id, comments } = this.props;
        return (
            <div>
                <Post id={id} showBody={true} />
                <ul className='comments'>
                    {
                        comments.length > 0 && comments.map(comment => (<li key={comment.id}><Comment id={comment.id} /></li>))
                    }
                </ul>
                <Link to={`/comments/add/${id}`} className="add-comment"><FaPlusCircle size={50} color='orange' /> </Link>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const { id } = props.match.params
    return {
        id,
        authedUser: state.authedUser,
        comments: Object.keys(state.comments)
            .map(commentId => ({
                parentId: state.comments[commentId].parentId,
                id: state.comments[commentId].id,
                body: state.comments[commentId].body
            })).filter(comment => comment.parentId === id)
    }
}

export default connect(mapStateToProps)(PostDetail)


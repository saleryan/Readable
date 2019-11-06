import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, FaTrash, FaPen } from 'react-icons/fa/index'
import { handleUpVoteComment, handleDownVoteComment, handleDeleteComment } from '../actions/comments'
import { formatDate } from '../utils/helper';

class Comment extends Component {
    state = {
        upVoted: false,
        downVoted: false
    }

	delete = () => {
      const {authedUser} = this.props;
      const {id ,parentId} = this.props.comment;
      this.props.dispatch(handleDeleteComment(id, parentId, authedUser));
    }

    downVote = () => {
        if (this.state.downVoted) {
            this.props.dispatch(handleUpVoteComment(this.props.authedUser, this.props.id));
        } else {
            this.props.dispatch(handleDownVoteComment(this.props.authedUser, this.props.id));
        }
        this.setState((prevState) => ({
            ...prevState,
            downVoted: !prevState.downVoted
        }));
    }

    upVote = () => {
        if (this.state.upVoted) {
            this.props.dispatch(handleDownVoteComment(this.props.authedUser, this.props.comment.id));
        } else {
            this.props.dispatch(handleUpVoteComment(this.props.authedUser, this.props.id));
        }

        this.setState((prevState) => ({
            ...prevState,
            upVoted: !prevState.upVoted
        }))
    }
    render() {
        const { body, voteScore, author, timestamp } = this.props.comment;
        const { upVoted, downVoted } = this.state;
        return (<div className='comment'>
            <p style={{ fontStyle: 'italic' }}>Posted by {author} on {formatDate(timestamp)}</p>
            <p>{body} </p>
            <ul className='footer'>
                <li>
                    <span className='icon'>{upVoted ? <FaThumbsUp onClick={this.upVote} /> :
                        <FaRegThumbsUp onClick={this.upVote} />} </span></li>
                <li><span>{voteScore}</span></li>
                <li className='bullet'><span className='icon'>{downVoted ? <FaThumbsDown onClick={this.downVote} /> :
                    <FaRegThumbsDown onClick={this.downVote} />}  </span>
                </li>
                <li className='bullet'><span className='icon'><FaPen /></span></li>
                <li><span className='icon'><FaTrash onClick = {this.delete} /></span></li>
            </ul>
        </div>)
    }
}

function mapStateToProps(state, { id }) {

    const comment = state.comments ? state.comments[id] : null;

    return {
        comment
    }
}

export default connect(mapStateToProps)(Comment)
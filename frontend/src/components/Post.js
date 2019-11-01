import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, FaTrash, FaPen } from 'react-icons/fa/index'
import { handleUpVotePost, handleDownVotePost } from '../actions/posts'

class Post extends Component {
    state = {
        upVoted: false,
        downVoted: false
    }

    downVote = () => {
        if (this.state.downVoted) {
            this.props.dispatch(handleUpVotePost(this.props.authedUser, this.props.id));
        } else {
            this.props.dispatch(handleDownVotePost(this.props.authedUser, this.props.id));
        }
        this.setState((prevState) => ({
            ...prevState,
            downVoted: !prevState.downVoted
        }));
    }

    upVote = () => {
        if (this.state.upVoted) {
            this.props.dispatch(handleDownVotePost(this.props.authedUser, this.props.id));
        } else {
            this.props.dispatch(handleUpVotePost(this.props.authedUser, this.props.id));
        }

        this.setState((prevState) => ({
            ...prevState,
            upVoted: !prevState.upVoted
        }))
    }

    render() {
        const { title, author, commentCount, voteScore } = this.props;
        const { upVoted, downVoted } = this.state;
        return (
            <div className='post'>
                <h1> {title} </h1>
                <p style={{'font-style':'italic'}}>Posted by {author} </p>
                <ul className='footer'>
                    <li>
					<span className='icon'>{upVoted ? <FaThumbsUp onClick={this.upVote} /> :
                            <FaRegThumbsUp onClick={this.upVote} />} </span></li>
                    <li><span>{voteScore}</span></li>
                    <li className='bullet'><span className='icon'>{downVoted ? <FaThumbsDown onClick={this.downVote} /> :
                        <FaRegThumbsDown onClick={this.downVote} />}  </span>
                    </li>
                    <li className='bullet'>{commentCount} comments </li>
					<li className='bullet'><span className='icon'><FaPen /></span></li>
					<li><span className='icon'><FaTrash /></span></li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state, { id }) {
    const post = state.posts[id];
    return {
        title: post.title,
        author: post.author,
        voteScore: post.voteScore,
        commentCount: post.commentCount,
        id,
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(Post)
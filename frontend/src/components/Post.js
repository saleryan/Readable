import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaThumbsDown, FaRegThumbsDown, FaThumbsUp, FaRegThumbsUp, FaTrash, FaPen } from 'react-icons/fa/index'
import { handleUpVotePost, handleDownVotePost, handleDeletePost } from '../actions/posts'
import { formatDate } from '../utils/helper';
import { withRouter, Link, Redirect } from 'react-router-dom'

class Post extends Component {
    state = {
        upVoted: false,
        downVoted: false,
        toHome: false
    }
    delete = () => {
        const { authedUser, id } = this.props;
        this.props.dispatch(handleDeletePost(id, authedUser));
        this.setState((prevState) => ({
            ...prevState,
            toHome: true
        }));
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

    gotoDetail(e) {
        e.preventDefault()
        this.props.history.push(`/${this.props.category}/${this.props.id}`)
    }

    render() {
        const showBody = this.props.showBody;
        const { upVoted, downVoted, toHome } = this.state;
        if (toHome) {
            return <Redirect to='/' />
        }
        if (!this.props.post) {
            return <Redirect to='/NoMatch'/>
        }
        const { title, author, commentCount, voteScore, timestamp, category, id, body } = this.props.post;
        return (
            <div className='post'>
                <Link to={`/${category}/${id}`}><h1> {title} </h1> </Link>
                {showBody && <p>{body}</p>}
                <p style={{ fontStyle: 'italic' }}>Posted by {author} on {formatDate(timestamp)}</p>
                <ul className='footer'>
                    <li>
                        <span className='icon'>{upVoted ? <FaThumbsUp onClick={this.upVote} /> :
                            <FaRegThumbsUp onClick={this.upVote} />} </span></li>
                    <li><span>{voteScore}</span></li>
                    <li className='bullet'><span className='icon'>{downVoted ? <FaThumbsDown onClick={this.downVote} /> :
                        <FaRegThumbsDown onClick={this.downVote} />}  </span>
                    </li>
                    <li className='bullet'>{commentCount} comments </li>
                    <li className='bullet'>
                        <span className='icon'>
                            <Link to={`/posts/edit/${id}`} >
                                <FaPen />
                            </Link>
                        </span>

                    </li>
                    <li><span className='icon'><FaTrash onClick={this.delete} /></span></li>
                </ul>
            </div>
        )

    }
}

function mapStateToProps(state, { id, showBody = false }) {
    const post = state.posts[id];
    return {
        post,
        showBody
    }
}

export default withRouter(connect(mapStateToProps)(Post))
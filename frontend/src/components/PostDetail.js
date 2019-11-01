import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostDetail extends Component {

    render() {
        const { title, author, commentCount, voteScore } = this.props;
        return (
            <div>
                <h1> {title} </h1>
                <p>Posted by {author} </p>
                <ul>

                    <li>score: {voteScore} </li>
                    <li>{commentCount} comments </li>
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
        commentCount: post.commentCount
    }
}

export default connect(mapStateToProps)(PostDetail)
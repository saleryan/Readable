import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { handleAddComment } from '../actions/comments'
import { connect } from 'react-redux'

class NewComment extends Component {
    state = {
        body: '',
        toHome: false
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { body } = this.state;
        const { dispatch, authedUser, id } = this.props

        dispatch(handleAddComment({ body, parentId: id, author: authedUser }, authedUser))

        this.setState(() => ({
            body: '',
            toHome: true
        }))
    }

    render() {
        const { body, toHome } = this.state;

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h3 className='center'>Compose new Comment</h3>
                <form className='new-comment' onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Comment"
                        value={body}
                        name='body'
                        onChange={this.handleChange}
                        maxLength={280}
                    />

                    <button
                        type='submit'
                        disabled={body === ''}>
                        Submit
          			</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const { id } = props.match.params
    return {
        authedUser: state.authedUser,
        id
    }
}

export default connect(mapStateToProps)(NewComment)
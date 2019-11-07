import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class EditableComment extends Component {
    state = {
        body: this.props.body,
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
        const { authedUser, id, parentId } = this.props
        this.props.handleSubmit({ body, id, parentId, author: authedUser }, authedUser);

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
                <h3 className='center'>{this.props.header}</h3>
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

function mapStateToProps(state, { handleSubmit, parentId, header, id }) {
    return {
        handleSubmit,
        parentId,
        body: id ? state.comments[id].body : "",
        authedUser: state.authedUser,
        id,
        header
    }
}

export default connect(mapStateToProps)(EditableComment)
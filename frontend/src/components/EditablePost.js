import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class EditablePost extends Component {
    state = {
        body: this.props.body,
        toHome: false,
        title: this.props.title,
        category: this.props.category
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

        const { body, title, category } = this.state;
        const { authedUser } = this.props
        this.props.handleSubmit({ body, title, category, author: authedUser }, authedUser);
        this.setState(() => ({
            body: '',
            title: '',
            category: '',
            toHome: true
        }))
    }

    render() {
        const { body, title, category, toHome } = this.state;
        const { categories, header, showCategory} = this.props;
        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <h3 className='center'>{header}</h3>
                <form className='new-post' onSubmit={this.handleSubmit}>

                    <input type="text"
                        value={title}
                        name='title'
                        onChange={this.handleChange}
                        placeholder='New Post' />

                    <textarea
                        placeholder="Post Body"
                        value={body}
                        name='body'
                        onChange={this.handleChange}
                        maxLength={280}
                    />

					{showCategory && <select value={category} name='category' onChange={this.handleChange}>
                        <option key='none'> </option>
                        {categories.map(cat => <option key={cat.name} id={cat.name}> {cat.name} </option>)}
                    </select>
					}

                    <button
                        type='submit'
                        disabled={body === '' || title === '' || category === ''}>
                        Submit
          			</button>
                </form>
            </div>
        )
    }
}
function mapStateToProps(state, {id, handleSubmit, header, showCategory = true}) {
   
    return {
        id,
        header,
      	handleSubmit,
        showCategory,
        body: id? state.posts[id].body : "",
        title: id? state.posts[id].title : "",
        category: id? state.posts[id].category : "",
        authedUser: state.authedUser,
        categories: Object.keys(state.categories)
            .map(name => state.categories[name])
    }
}
export default connect(mapStateToProps)(EditablePost)
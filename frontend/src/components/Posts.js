import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { NavLink } from 'react-router-dom'

class Posts extends Component {

    render() {
        const { posts, categories } = this.props;
        return (
            <div className='posts-container'>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                All
         				 </NavLink>
                        </li>
                        {categories.map(cat =>
                            (<li key={cat.name}>
                                <NavLink to={cat.path} activeClassName='active'>
                                    {cat.name}
                                </NavLink>
                            </li>
                            ))}
                    </ul>
                </nav>
                {posts.length > 0 && <ul className='posts'>
                    {posts.map(post => <Post id={post.id} key={post.id} />)}
                </ul>}
                {
                    posts.length === 0 &&
                    <p> There are no posts for this category </p>
                }
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const { category } = props.match.params

    return {
        posts: Object.keys(state.posts)
            .map(id => state.posts[id])
            .filter(post => post.category === category || !category),
        categories: Object.keys(state.categories)
            .map(name => state.categories[name])
    }
}

export default connect(mapStateToProps)(Posts)
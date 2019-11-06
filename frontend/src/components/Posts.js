import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { NavLink, Link } from 'react-router-dom'
import { FaLongArrowAltUp, FaLongArrowAltDown, FaPlusCircle } from 'react-icons/fa/index'


const SORT_BY = {
    DATE: 'DATE',
    VOTE: 'VOTE'
}
const DIRECTION = {
    ASC: 'ASC',
    DESC: 'DESC'
}
class Posts extends Component {
    state = {
        sortBy: SORT_BY.DATE,
        direction: DIRECTION.DESC
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState((prevState) => ({ ...prevState, sortBy: value }));

    }
    handleSortAsc = () => {
        this.setState((prevState) => ({ ...prevState, direction: DIRECTION.DESC }));
    }

    handleSortDesc = () => {
        this.setState((prevState) => ({ ...prevState, direction: DIRECTION.ASC }));
    }

    render() {
        const { posts, categories } = this.props;
        const { sortBy, direction } = this.state;
        const sortedPosts = posts.sort((a, b) =>
            sortBy === SORT_BY.VOTE ?
                (direction === DIRECTION.ASC ?
                    a.voteScore - b.voteScore : b.voteScore - a.voteScore) :
                (direction === DIRECTION.ASC ?
                    a.timestamp - b.timestamp : b.timestamp - a.timestamp)
        );
        const sortOptions = Object.keys(SORT_BY).map((sortKey) => (SORT_BY[sortKey]));
        return (
            <div className='posts-container'>
                <div className='top-bar'>
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
                    <div className='sort'>

                        <label> Sort By </label>
                        <select className='sort' onChange={this.handleChange} value={sortBy}>
                            {sortOptions.map(sortKey => <option key={sortKey} value={sortKey}>{sortKey} </option>)}
                        </select>
                        {direction === DIRECTION.ASC ? <FaLongArrowAltUp size={20} style={{ marginBottom: '-5px' }} onClick={this.handleSortAsc} /> :
                            <FaLongArrowAltDown size={20} style={{ marginBottom: '-5px' }} onClick={this.handleSortDesc} />}
                    </div>
                </div>
                {sortedPosts.length > 0 && <ul className='posts'>
                    {posts.map(post => <li key={post.id}><Post key={post.id} id={post.id} /></li>)}
                </ul>}
                {
                    sortedPosts.length === 0 &&
                    <p> There are no posts for this category </p>
                }
                <Link to='/posts/add' className="add-post"><FaPlusCircle size={50} color='orange' /> </Link>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const { category } = props.match.params

    return {
        posts: Object.keys(state.posts)
            .map(id => state.posts[id])
            .filter(post => (post.category === category || !category) && !post.deleted),
        categories: Object.keys(state.categories)
            .map(name => state.categories[name])
    }
}

export default connect(mapStateToProps)(Posts)
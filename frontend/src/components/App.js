import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import Posts from './Posts'
import handleInitialData from '../actions/shared'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'
import NewPost from './NewPost'
import NewComment from './NewComment'
import EditPost from './EditPost'
import EditComment from './EditComment'
import NoMatch from './NoMatch'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { categories } = this.props;
        return (

            <div className='container'>
                <div className="header-title">
                    <h2>Readable</h2>
                </div>
                <div className="content">
                    <BrowserRouter>
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
                                            <NavLink key={cat.name} to={`/${cat.path}`} activeClassName='active'>
                                                {cat.name}
                                            </NavLink>
                                        </li>
                                        ))}
                                </ul>
                            </nav>
                        </div>
                        <Switch>
                            <Route exact path='/' component={Posts} />
                            <Route exact path='/:category' render={(props) => {
                                if (categories.filter(x => x.name === props.match.params.category).length > 0) {
                                    return <Posts {...props} />
                                }
                                return <NoMatch />
                            }}
                            />

                            <Route exact path='/posts/add' component={NewPost} />
                            <Route exact path='/posts/edit/:id' component={EditPost} />
                            <Route exact path='/:category/:id(\w{10,})' component={PostDetail} />
                            <Route exact path='/comments/edit/:parentId/:id' component={EditComment} />
                            <Route exact path='/comments/add/:parentId' component={NewComment} />
                            <Route component={NoMatch} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state, props) {


    return {
        categories: Object.keys(state.categories)
            .map(name => state.categories[name])
    }
}

export default connect(mapStateToProps)(App)
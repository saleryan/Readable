import * as api from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPVOTE_POST = "UPVOTE_POST"
export const DOWNVOTE_POST = "DOWNVOTE_POST"
export const ADD_POST = "ADD_POST"
export const DELETE_POST = "DELETE_POST"

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

function upVotePost(id) {
    return {
        type: UPVOTE_POST,
        id
    }
}

function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    }
}


function downVotePost(id) {
    return {
        type: DOWNVOTE_POST,
        id
    }
}

function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}


export function handleReceivePosts(authedUser) {
    return (dispatch) => {
        api.getPosts(authedUser)
            .then(posts => {
                dispatch(receivePosts(posts))
            });
    }
}

export function handleUpVotePost(authedUser, id) {
    return (dispatch) => {
        api.upVotePost(authedUser, id)
            .then(() => {
                dispatch(upVotePost(id))
            });
    }
}

export function handleDownVotePost(authedUser, id) {
    return (dispatch) => {
        api.downVotePost(authedUser, id)
            .then(() => {
                dispatch(downVotePost(id))
            });
    }
}

export function handleAddPost(post, authedUser) {
    return (dispatch) => {
        api.addPost(post, authedUser)
            .then((post) => {
                dispatch(addPost(post))
            });
    }
}

export function handleDeletePost(id, authedUser) {
    return (dispatch) => {
        api.deletePost(id, authedUser)
            .then(() => {
                dispatch(deletePost(id))
            });
    }
}
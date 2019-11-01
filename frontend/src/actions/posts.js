import * as api from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPVOTE ="UPVOTE"
export const DOWNVOTE ="DOWNVOTE"

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

function upVotePost(id) {
    return {
        type: UPVOTE,
      id
      
       
    }
}

function downVotePost(id) {
    return {
        type: DOWNVOTE,
      id
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

export function handleUpVotePost(authedUser,id) {
    return (dispatch) => {
        api.upVotePost(authedUser,id)
            .then(() => {
                dispatch(upVotePost(id))
            });
    }
}

export function handleDownVotePost(authedUser,id) {
    return (dispatch) => {
        api.downVotePost(authedUser,id)
            .then(() => {
                dispatch(downVotePost(id))
            });
    }
}
import * as api from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
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
import {
    RECEIVE_POSTS, UPVOTE_POST,
    DOWNVOTE_POST, ADD_POST
} from '../actions/posts'

export default function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS: return { ...state, ...action.posts }
        case UPVOTE_POST: return {
            ...state,
            [action.id]: {
                ...state[action.id],
                voteScore: state[action.id].voteScore + 1
            }
        }

        case DOWNVOTE_POST: return {
            ...state,
            [action.id]: {
                ...state[action.id],
                voteScore: state[action.id].voteScore - 1
            }
        }

        case ADD_POST: return { ...state, ...action.post }

        default: return state
    }
}
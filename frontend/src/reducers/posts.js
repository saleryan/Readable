import {
    RECEIVE_POSTS, UPVOTE_POST,
    DOWNVOTE_POST, ADD_POST
} from '../actions/posts'

import {
    ADD_COMMENT
} from '../actions/comments'

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
        case ADD_COMMENT:
            const parentId = action.comment[Object.keys(action.comment)[0]].parentId;

            return {
                ...state,
                [parentId]: {
                    ...state[parentId],
                    commentCount: state[parentId].commentCount + 1
                }
            }
        default: return state
    }
}
import {
    RECEIVE_COMMENTS, UPVOTE_COMMENT,
    DOWNVOTE_COMMENT, ADD_COMMENT
} from '../actions/comments'

export default function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS: return {
            ...state,
            ...action.comments
        }
        
        case UPVOTE_COMMENT: return {
            ...state,
            [action.id]: {
                ...state[action.id],
                voteScore: state[action.id].voteScore + 1
            }
        }

        case DOWNVOTE_COMMENT: return {
            ...state,
            [action.id]: {
                ...state[action.id],
                voteScore: state[action.id].voteScore - 1
            }
        }

        case ADD_COMMENT: return {
            ...state,
            ...action.comment
        }
        
        default: return state
    }
}
import {
    RECEIVE_COMMENTS, UPVOTE_COMMENT,
    DOWNVOTE_COMMENT, ADD_COMMENT,
    DELETE_COMMENT, EDIT_COMMENT
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
        case DELETE_COMMENT: return {
            ...state,
            [action.id]: {
                ...[action.id],
                deleted: true
            }
        }
        case EDIT_COMMENT: const id = Object.keys(action.comment)[0];

            return {
                ...state,
                [id]: {
                    ...state[id],
                    body: action.comment[id].body
                }
            }

        default: return state
    }
}
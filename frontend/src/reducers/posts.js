import {
    RECEIVE_POSTS, UPVOTE_POST,
    DOWNVOTE_POST, ADD_POST,
    DELETE_POST
} from '../actions/posts'

import {
    ADD_COMMENT,
    DELETE_COMMENT
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
        case DELETE_POST: return {
         ...state,
          [action.id] : {
           ...[action.id],
           deleted: true
          }
        }
      case DELETE_COMMENT: return {
        ...state,
        [action.parentId]: {
        ...state[action.parentId],
         commentCount: state[action.parentId].commentCount - 1
        }
      }
        default: return state
    }
}
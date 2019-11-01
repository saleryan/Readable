import { RECEIVE_POSTS, UPVOTE, DOWNVOTE } from '../actions/posts'

export default function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS: return { ...state, ...action.posts }
      case UPVOTE: return {...state, 
                           [action.id]:{
      					   ...state[action.id],
      						voteScore: state[action.id].voteScore + 1
      					}
    		
       }
      case DOWNVOTE: return {...state, 
                           [action.id]:{
      					   ...state[action.id],
      						voteScore: state[action.id].voteScore - 1
      					}
    		
       }
        default: return state
    }
}
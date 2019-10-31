import * as api from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export default function receiveCategories(categories) {
return {
	type: RECEIVE_CATEGORIES,  
   categories
	}
}

export function handleReceiveCategories(authedUser) {
 return (dispatch) => {
	api.getCategories(authedUser)
   		.then(categories => {
      dispatch(receiveCategories(categories))
    });
  }
}
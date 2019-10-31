import * as api from '../utils/api'
import {receivePosts} from './posts';
import {receiveCategories} from './categories';

export function handleInitialData(authedUser) {
  return (dispatch) => {
  Promise.all([api.getCategories(authedUser), 
               api.getPosts(authedUser)]
 .then({categories,posts} => {
     dispatch(receiveCategories(categories));
     dispatch(receivePosts(posts));
  	});
	}
}
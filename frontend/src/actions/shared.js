import * as api from '../utils/api'
import { receivePosts } from './posts';
import { receiveCategories } from './categories';
import setAuthedUser from './authedUser'

export default function handleInitialData() {
    return (dispatch, state) => {
        dispatch(setAuthedUser());
        const { authedUser } = state;

        Promise.all([api.getCategories(authedUser),
        api.getPosts(authedUser)])
            .then(([categories, posts]) => {
                dispatch(receiveCategories(categories));
                dispatch(receivePosts(posts));
            })
    }
}
import * as api from '../utils/api'
export const UPVOTE_COMMENT ="UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT ="DOWNVOTE_COMMENT"
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

function receiveComments(comments) {
    return {
        type: RECEIVE_COMMENTS,
        comments
    }
}

export function handleReceiveComments(authedUser, postId) {
    return (dispatch) => {
        api.getCommentsForPost(authedUser, postId)
            .then(comments => {
                dispatch(receiveComments(comments))
            });
    }
}

function upVoteComment(id) {
    return {
        type: UPVOTE_COMMENT,
      id
      
       
    }
}

function downVoteComment(id) {
    return {
        type: DOWNVOTE_COMMENT,
      id
    }
}


export function handleUpVoteComment(authedUser,id) {
    return (dispatch) => {
        api.upVoteComment(authedUser,id)
            .then(() => {
                dispatch(upVoteComment(id))
            });
    }
}

export function handleDownVoteComment(authedUser,id) {
    return (dispatch) => {
        api.downVoteComment(authedUser,id)
            .then(() => {
                dispatch(downVoteComment(id))
            });
    }
}
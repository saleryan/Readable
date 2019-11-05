const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
// To run outside of the Workspace, please do not include the credentials.

/* 

  const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
  const url = `${api}/categories`;
  console.log('fetching from url', url);
  fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
    .then( (res) => { return(res.text()) })
    .then((data) => {
      this.setState({backend:data});
    });
}
*/

export function getCategories(authUser) {
    const url = `${api}/categories`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include"
    }).then((res) => {
        return res.json();
    }).then(result => {
        return Object.assign({}, ...result.categories.map(cat => ({ [cat.name]: cat })))

    });
}

export function getPosts(authUser) {
    const url = `${api}/posts`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include"
    }).then((res) => {
        return res.json();
    }).then(posts => {
        return Object.assign({}, ...posts.map(post => ({ [post.id]: post })))

    });
}

export function upVotePost(authUser, id) {
    const url = `${api}/posts/${id}`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include",
        method: 'POST',
        body: 'upVote'
    });
}

export function downVotePost(authUser, id) {
    const url = `${api}/posts/${id}`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include",
        method: 'POST',
        body: 'downVote'
    });
}

export function upVoteComment(authUser, id) {
    const url = `${api}/comments/${id}`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include",
        method: 'POST',
        body: 'upVote'
    });
}

export function downVoteComment(authUser, id) {
    const url = `${api}/comments/${id}`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include",
        method: 'POST',
        body: 'downVote'
    });
}

export function getCommentsForPost(postId, authUser) {
    const url = `${api}/posts/${postId}/comments`;
    return fetch(url, {
        headers: { Authorization: authUser },
        credentials: "include"
     }).then((res) => {
        return res.json();
    }).then(comments => {
        return Object.assign({}, ...comments.map(comment => ({ [comment.id]: comment })))

    });
}
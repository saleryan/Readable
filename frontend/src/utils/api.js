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
function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function addPost(post, authedUser) {
    const url = `${api}/posts`;
    post.id = generateUID();
    post.timestamp = Date.now();
    return fetch(url, {
        method: 'POST',
        headers: { Authorization: authedUser },
        credentials: "include"
    }).then((res) => {
        return res.json();
    }).then(newPost => {
        for (let prop of Object.keys(newPost)) {
            post[prop] = newPost[prop];
        }
        return Object.assign({}, { [post.id]: post })
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

export function addComment(comment, authedUser) {
    const url = `${api}/comments`;
    comment.id = generateUID();
    comment.timestamp = Date.now();
    return fetch(url, {
        method: 'POST',
        headers: { Authorization: authedUser },
        credentials: "include"
    }).then((res) => {
        return res.json();
    }).then(newComment => {
        for (let prop of Object.keys(newComment)) {
            comment[prop] = newComment[prop];
        }
        return Object.assign({}, { [comment.id]: comment })
    });
}

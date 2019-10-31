const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

export function getCategories(authUser) {
  const url = `${api}/categories`;
  return fetch(url, {
      headers: { Authorization: authUser },
      credentials: "include"
     }).then((res) => {
    	return res.json();
     });
}

export function getPosts(authUser) {
  const url = `${api}/posts`;
  return fetch(url, {
      headers: { Authorization: authUser },
      credentials: "include"
     }).then((res) => {
    	return res.json();
     });
}

export function getCommentsForPost(postId, authUser) {
  const url = `${api}/posts/${postId}/comments`;
  return fetch(url, {
      headers: { Authorization: authUser },
      credentials: "include"
     }).then((res) => {
    	return res.json();
     });
}
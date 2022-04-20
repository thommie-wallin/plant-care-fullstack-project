export function login([username, password, admin]) {
  return fetch('http://localhost:3333/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, admin })
  })
    .then(data => data.json());
}

//todo GET	/api/test/user	access User’s content

//todo GET	/api/test/admin	access Admin’s content
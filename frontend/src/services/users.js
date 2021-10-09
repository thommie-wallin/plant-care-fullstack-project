export function getUsers() {
  return fetch('http://localhost:3333/users')
    .then(data => data.json());
}

export function getUser(userId) {
  return fetch(`http://localhost:3333/users/` + userId)
    .then(data => data.json());
}

export function createUser([username, password, admin]) {
  return fetch('http://localhost:3333/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, admin })
  })
    .then(data => data.json());
}

export function updateUser(userId, [username, password, admin]) {
  return fetch(`http://localhost:3333/users/` + userId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password, admin })
  })
    .then(data => data.json());
}

export function delUser(usertId) {
  fetch(`http://localhost:3333/users/` + usertId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ usertId })
  })
  .then(data => data.json());
}
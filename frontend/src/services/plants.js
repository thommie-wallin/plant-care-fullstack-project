export function getPlants() {
  return fetch('http://localhost:3333/plants')
    .then(data => data.json());
}

export function getPlant(plantId) {
  return fetch(`http://localhost:3333/plants/` + plantId)
    .then(data => data.json());
}

export function createPlant([name, instruction]) {
  return fetch('http://localhost:3333/plants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, instruction })
  })
    .then(data => data.json());
}

export function updatePlant(plantId, [name, instruction]) {
  return fetch(`http://localhost:3333/plants/` + plantId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, instruction })
  })
    .then(data => data.json());
}

export function delPlant(plantId) {
  fetch(`http://localhost:3333/plants/` + plantId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ plantId })
  })
  .then(data => data.json());
}
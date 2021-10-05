export function getPlants() {
  return fetch('http://localhost:3333/plants')
    .then(data => data.json());
}

export function delPlant(plantId) {
  fetch(`http://localhost:3333/plants/` + plantId, {
    method: 'DELETE'
  })
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
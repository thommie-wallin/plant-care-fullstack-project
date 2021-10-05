export function getPlants() {
  return fetch('http://localhost:3333/plants')
    .then(data => data.json());
}

export function delPlant(plantId) {
  fetch(`http://localhost:3333/plants/` + plantId, {
    method: 'DELETE'
  })
}
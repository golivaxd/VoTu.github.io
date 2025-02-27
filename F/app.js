const backendUrl = process.env.REACT_APP_BACKEND_URL;

fetch(`${backendUrl}/api/usuarios`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
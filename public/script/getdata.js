// fetch pour recuperer les donneés du JSON
export const getData = () => fetch('../data.json')
  .then(response => response.json())
  .catch(error => {
    console.error('Une erreur est survenue pendant la lecture des données.')
    console.error(error)
  })

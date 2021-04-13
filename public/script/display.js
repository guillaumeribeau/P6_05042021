import {createPhotographers,filterTags,photographersPage} from './functiongeneral.js'



// fetch pour recuperer les donneés du JSON
const getData = () => fetch('../data.json')
	.then(response => response.json())
	.catch(error => {
		console.error('Une erreur est survenue pendant la lecture des données.');
		console.error(error);
	});






// permet de generer la page acceuil
function createHomePage(){
        
        getData().then (data =>{
        let photographers = data.photographers;
        let medias = data.media;
        console.table(medias);
        createPhotographers(photographers);
        filterTags(photographers);
        photographersPage(medias, photographers)
        

})};
createHomePage();




    

















 




  
  
  
  










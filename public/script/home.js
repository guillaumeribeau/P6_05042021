import {createPhotographers,filterTags,afficheLesTags} from './index.js'
import {getData} from './getdata.js'





// permet de generer la page acceuil
function createHomePage(){
        
        getData().then (data =>{
        let photographers = data.photographers;
       
        createPhotographers(photographers);
        filterTags(photographers);
        window.onload= afficheLesTags(photographers)
        
})};
createHomePage();







    

















 




  
  
  
  










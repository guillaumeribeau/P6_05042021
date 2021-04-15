import {getData} from './getdata.js'



const mediaGallery = document.getElementById('mediaGallery');
const photographerName= document.getElementsByClassName('name');
const photographerLocation= document.getElementsByClassName('location');
const photographerDesc = document.getElementsByClassName('tagsline');
const photographertags= document.getElementsByClassName('hashtag');
const photographerPhoto= document.getElementsByClassName('photo');



const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get('id');



function createPhotographersPage(){
    getData().then (data =>{
    const mediaList = data.media;
    const photographersList = data.photographers;
    const photographerIndex = getPhotographer(photographerID, photographersList);
    const photographerMediaList = getPhotographerMediaList(photographerID, mediaList);
    //generateProfile(photgrapherIndex, photographerList, photographerMediaList);
    //generateGallery(photographerMediaList, selectedOrder);
    console.log(mediaList);
    console.log(photographersList);
   

})};

createPhotographersPage();


// fonction qui permet de recuperer L'id du photographe de la page
function getPhotographer(photographerID,photographersList){
   let ID = photographersList.map(item=> item.id);
  
 for (let indexID of ID){
      console.log(indexID)
    if(indexID == photographerID){
     return indexID;
    
     }
    }
};

// fonction qui recupères les médias du photographe:
function getPhotographerMediaList(photographerID,mediaList){

let mediaListId = mediaList.map(item=>)


 



}
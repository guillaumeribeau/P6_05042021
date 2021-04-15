import {getData} from './getdata.js'



const mediaGallery = document.getElementById('mediaGallery');
const photographerName= document.getElementById('name');
const photographerCity= document.getElementById('city');
const photographerCountry= document.getElementById('country');
const photographerDesc = document.getElementById('tagsline');
const photographertags= document.getElementById('hashtag');
const photographerPhoto= document.getElementById('photo');

console.log(photographerName)

const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get('id');




function createPhotographersPage(){
    getData().then (data =>{
    const mediaList = data.media;
    const photographersList = data.photographers;
    const photographerIndex = getPhotographer(photographerID, photographersList);
    const photographerMediaList = getPhotographerMediaList(photographerID, mediaList);
    generateProfile(photographerIndex, photographersList, photographerMediaList);
    //generateGallery(photographerMediaList, selectedOrder);
    console.log(mediaList);
    console.log(photographersList);
     
})};

createPhotographersPage();



// fonction qui recupère le tableau du photographe par raport à l'id 
function getPhotographer(ID,photographersList){
    let tableauDuPhotograph = [];
     console.log(tableauDuPhotograph);
    for(var i=0; i<photographersList.length;i++)
    {
        if(photographersList[i].id == ID)
        {
            tableauDuPhotograph.push(photographersList[i]);
        }
    } 
    return tableauDuPhotograph;

}



// fonction qui recupères les médias du photographe:
function getPhotographerMediaList(ID, baseMediaList){
        let mediaList = [];
         console.log(mediaList)
        for(var i=0; i<baseMediaList.length;i++)
        {
            if(baseMediaList[i].photographerId == ID)
            {
                mediaList.push(baseMediaList[i]);
            }
        } 
        return mediaList;

    }

 
//
    function generateProfile(photographerIndex, photographersList, photographerMediaList){
         //accede à l'objet du photographe
        let photographer = photographerIndex[0];
   photographerName.innerText=photographer.name
   photographerCity.innerText=photographer.city;
   photographerCountry.innerText=photographer.country;
   

}

    
    
    
    
    
    



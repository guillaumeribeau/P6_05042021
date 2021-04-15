import {getData} from './getdata.js'



const mediaGallery = document.getElementById('mediaGallery');
const photographerName= document.getElementById('name');
const photographerCity= document.getElementById('city');
const photographerCountry= document.getElementById('country');
const photographerDesc = document.getElementById('tagsline');
const photographertags= document.getElementById('hashtag');
const article = document.getElementById('presentation');

console.log(photographerName)

const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get('id');




function createPhotographersPage(){
    getData().then (data =>{
    const mediaList = data.media;
    const photographersList = data.photographers;
    const photographerIndex = getPhotographer(photographerID, photographersList);
    const photographerMediaList = getPhotographerMediaList(photographerID, mediaList);
    generateProfile(photographerIndex,photographerMediaList);
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
    function generateProfile(photographerIndex,photographerMediaList){
         //accede à l'objet du photographe
        let photographer = photographerIndex[0];
         
        // récupères les hastags 
        let tags = photographer.tags;
        let tagsArray = tags.map(tags => {
            return `<span class="card__tags">#${tags}</span>`;
        }).join('');

     // injectes les proprietes du tableau photographe dans le HTML
    photographerName.innerText=photographer.name
   photographerCity.innerText=`${photographer.city} ,`;
   photographerCountry.innerText=photographer.country;
   photographerDesc.innerText=photographer.tagline;
   photographertags.innerHTML=`${tagsArray}`;

   // injecte le portrait du photographe
    let createImg = document.createElement('div');
    let article = document.getElementById('presentation')
    article.appendChild(createImg);
    createImg.innerHTML =`<img id="photo" src="./img/portrait/${photographer.portrait}" alt="">`


    //affiche les medias dans la gallery
     const image =photographerMediaList.map(media=>{
     return `
     <figure class='figure'>
     <img class='photo' src="./img/${photographer.name}/${media.image}"> 
     <figcaption class='photo__figcaption'>
     <span class='description__photo'> description de la photo </span>
     <span class='photo__price'>${media.price}</span>
     <span class='likes'>${media.likes}  </span><i class="fas fa-heart"></i>
     </figcatption>

     </figure>
     `
     
    }).join('');
 console.log(image)
    // injectes le Html dans la section gallery
    mediaGallery.innerHTML= image;

    // injectes le nom dans le formulaire de contact
    const formsName= document.getElementById('name__form');
    formsName.innerHTML=`Contactez-moi <br>${photographer.name}`

}

    
    
    
    
    
    



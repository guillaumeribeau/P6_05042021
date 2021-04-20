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
    const tierParDate=trierGalleryDate(photographerMediaList);
    const trierparTitre =trierGalleryTitre(photographerMediaList); 
    const trierParLikes= trierGalleryLikes(photographerMediaList);
    generateProfile(photographerIndex,photographerMediaList,trierParLikes);
    
   
   
     
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
     if (media.hasOwnProperty('video')){
      return `<figure class='figure'>
      <video controls alt='${media.alt}' class='video' type="video/mp4" src="./img/${photographer.name}/${media.video}"></video> 
      <figcaption class='photo__figcaption'>
      <span class='description__photo'>${media.alt}</span>
      <span class='photo__price'>${media.price}€</span>
      <span class='likes'>${media.likes}  </span><i class="fas fa-heart"></i>
      </figcatption>
     </figure>

     <div class='compteur__likes'>
    
    <span class='numbers_likes'>1250</span>
    <i id='compteur__heart' class="fas fa-heart"></i>
    <span class='price__jour'></span>
    </div>`

     }
     
     else{

        return `
     <figure class='figure'>
     <img alt='${media.alt}' class='photo' src="./img/${photographer.name}/${media.image}"> 
     <figcaption class='photo__figcaption'>
     <span class='description__photo'>${media.alt}</span>
     <span class='photo__price'>${media.price}€</span>
     <span class='likes'>${media.likes}  </span><i class="fas fa-heart"></i>
     </figcatption>

     </figure>
     `
    }

    }).join('');

     
    // injectes le Html dans la section gallery
    mediaGallery.innerHTML= image;

    // injectes le nom dans le formulaire de contact
    const formsName= document.getElementById('name__form');
    formsName.innerHTML=`Contactez-moi <br>${photographer.name}`
    
    // injectes le prix par jour dans le html
    const totalLikes= document.querySelector('.price__jour');
    totalLikes.innerText=`${photographer.price}€/jour`

}

   
// petite fonction pour trier la gallery

 // trier la gallery par likes
function trierGalleryLikes(photographerMediaList){
let orderLikes=[];
const popularite= photographerMediaList.sort((a,b) => b.likes- a.likes);
orderLikes.push(popularite);
}


//trier la gallery par date 

function trierGalleryDate(photographerMediaList){
let orderDate=[];
const date= photographerMediaList.sort((a,b)=> b.date-a.date);
orderDate.push(date);
}

// trier la galley par titre 

function trierGalleryTitre(photographerMediaList){
    let orderTitre=[];
    const titre= photographerMediaList.sort((a,b)=> {

   if(a.alt<b.alt){
        return -1;
   }
        else if (a.alt>b.alt){
       return 1;
   }

   else return 0
    
  })
orderTitre.push(titre)

};



//dropdown

// permet d'ouvrir le menu en ajoutant la classe Open
const wrapperDrop =document.querySelector('.custom-select-wrapper')
wrapperDrop.addEventListener('click', function() {
    this.querySelector('.custom-select').classList.toggle('open');
})


for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
          }
        
    })
}


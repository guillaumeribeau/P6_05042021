import {getData} from './getdata.js'
import{Lightbox} from './carroussel.js'



const mediaGallery = document.getElementById('mediaGallery');
const photographerName= document.getElementById('name');
const photographerCity= document.getElementById('city');
const photographerCountry= document.getElementById('country');
const photographerDesc = document.getElementById('tagsline');
const photographertags= document.getElementById('hashtag');
const article = document.getElementById('presentation');

const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get('id');


function createPhotographersPage(){
    getData().then (data =>{
    const mediaList = data.media;
    const photographersList = data.photographers;
    const photographerIndex = getPhotographer(photographerID, photographersList);
    const photographerMediaList = getPhotographerMediaList(photographerID, mediaList);
   //permet de trier par popularité au chargement de la page
    trierGalleryLikes(photographerMediaList);
    gallery
    // genere le profil du photographe
    generateProfile(photographerIndex,photographerMediaList);
    // génére la gallery médias
    gallery(photographerMediaList,photographerIndex)
     // trie les medias en fonction du filtres du dropdown
    trierMedia(photographerMediaList,photographerIndex);
     // class lightbox qui s'initialise
    Lightbox.init();

})};

createPhotographersPage();


// fonction qui recupère le tableau du photographe par raport à l'id 
function getPhotographer(ID,photographersList){
    let tableauDuPhotograph = [];
     
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
            return `<a href='index.html?id=${tags}'><span class="card__tags">#${tags}</span></a>`;
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
    createImg.innerHTML =`<img id="photo" src="./img/portrait/${photographer.portrait}" alt="${photographer.name}">`

}


function gallery(photographerMediaList,photographerIndex){
    let photographer = photographerIndex[0];
let image = photographerMediaList.map(media=>{
    if (media.hasOwnProperty('video')){
     return ` <figure class='figure'>
     <a href="./img/${photographer.name}/${media.video}">
     <video alt='${media.alt}' class='video' type="video/mp4" src="./img/${photographer.name}/${media.video}" aria-label="cliquez pour agrandir ${media.alt}"></video> 
     </a>
     <figcaption class='photo__figcaption'>  
     <span class='description__photo'>${media.alt}</span>
     <span class='photo__price'>${media.price}€</span>
     <button class='jaime' aria-label='je likes la photo'><span class='likes'>${media.likes}</span><i class="fas fa-heart"></i></button>
     </figcatption>
    </figure>
    
    <div class='compteur__likes'>
   
   <span class='numbers_likes'></span>
   <i id='compteur__heart' class="fas fa-heart"></i>
   <span class='price__jour'></span>
   </div>`

    }
    
    else{

       return `
    <figure class='figure'>
    <a href="./img/${photographer.name}/${media.image}">
    <img alt='${media.alt}' class='photo' src="./img/${photographer.name}/${media.image}" aria-label="cliquez pour agrandir ${media.alt}"> 
    </a>
    <figcaption class='photo__figcaption'>
    <span class='description__photo'>${media.alt}</span>
    <span class='photo__price'>${media.price}€</span>
    <button class='jaime' aria-label='je likes la photo'><span class='likes'>${media.likes}</span><i class="fas fa-heart"></i></button>
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

   
   // compteur like des medias
   compteurLikes(photographerMediaList);

}



 // trie la gallery par likes à l'ouverture de la pages

function trierGalleryLikes(photographerMediaList){
    const popularite= photographerMediaList.sort((a,b) => b.likes- a.likes);
   
   return popularite;
   }
   
   
   // trier les medias par titre, date ou popularité
   function trierMedia (photographerMediaList,photographerIndex){
       let inputdrop= document.querySelectorAll('.custom-option');
      
      // on ecoute le click sur le dropdown
        for (let value of inputdrop){
       value.addEventListener('click',function(e){
          // si on a correspondance on execute la fonction de tri en adequation
       let inputValue= value.innerHTML;
       if(inputValue=='Popularité'){
           const popularite= photographerMediaList.sort((a,b) => b.likes- a.likes);
         //on execute la fonction generate profil avec le nouveau tableau filtrer.
         gallery(popularite,photographerIndex)
         
       }
        
     else if(inputValue=='Date'){
     const date= photographerMediaList.sort((a,b)=>{
     if (a.date<b.date){
       return 1;
       }
       else if (a.date>b.date){
           return -1;
       }
       else return 0;
       })
     gallery(date,photographerIndex)
      }
   
       if(inputValue=='Titre'){
       const titre= photographerMediaList.sort((a,b)=> {
         
           if(a.alt<b.alt){
                return -1;
           }
                else if (a.alt>b.alt){
               return 1;
           }
        
           else return 0
            
          })
          gallery(titre,photographerIndex);
        }
   })
   }     
}
   
   

// compteur de likes par medias

function compteurLikes(photographerMediaList){
    let totalCoeur=compteurTotal(photographerMediaList);
    //selectionne le nombre total de likes
    const totalLikes= document.querySelector('.numbers_likes')
    
     // selectionne tous les coeurs
    const allLikes= document.querySelectorAll('figure button');
    
    // pour chaque coeur on incrementes de 1 
 for ( let chaquecoeur of allLikes){
    chaquecoeur.addEventListener('click' , ()=>{
        // si pas la class increment on increment de 1
        if (!chaquecoeur.classList.contains('increment')){
        const nombreLike =chaquecoeur.parentNode.querySelector('.likes');
       let count = nombreLike.innerHTML;
        nombreLike.innerHTML= ++count;
        chaquecoeur.classList.add('increment');
        //incrementes le compteur total
        totalLikes.innerHTML=totalCoeur+=1
        
      }
      // sinon on decremente de 1
      else if (chaquecoeur.classList.contains('increment')){
        const nombreLike =chaquecoeur.parentNode.querySelector('.likes');
        let count = nombreLike.innerHTML;
        chaquecoeur.classList.remove('increment');
         nombreLike.innerHTML= --count;
         totalLikes.innerHTML=totalCoeur-=1
         
        }
    })
    }
}

//function qui retourne tous le nombre de coeur total initial
function compteurTotal(photographerMediaList){
const totalLikes= document.querySelector('.numbers_likes')
      const totalInitial = photographerMediaList.reduce((total,like)=>{
       return total + (like.likes);
    },0)


totalLikes.innerHTML=totalInitial;
return totalInitial;
}




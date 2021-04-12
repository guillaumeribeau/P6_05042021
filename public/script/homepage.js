
// fetch pour recuperer les donneés du JSON
const getData = () => fetch('../data.json')
	.then(response => response.json())
	.catch(error => {
		console.error('Une erreur est survenue pendant la lecture des données.');
		console.error(error);
	});



function createPhotographers(photographers) {
const main = document.querySelector('.main');
const photographerCard = photographers.map(photographers=>{
  const tags = photographers.tags;
    const tagsArray = tags.map(tags => {
        return `<span class="card__tags">#${tags}</span>`;
    }).join('');
    
return`<article class= card__photographers>
  <a id= '${photographers.id}' class= card__link href="" aria-label='${photographers.name}'> 
      <img class='card__image' src="img/portrait/${photographers.portrait}" alt="">
      <h2 class='card__name'>${photographers.name}</h2>
   </a>
   
   <h3 id='card__location'>${photographers.city},${photographers.country}</h3>
   <h4 id='card__description'>${photographers.tagline}</h4>
    <p class=card__price>${photographers.price}&euro;/jour</p>
    <div class="tags__photographer">${tagsArray}</div>
    
</article>`
})

  main.innerHTML= photographerCard.join('');
   
  
   

 
};


// permet de generer la page acceuil
function createHomePage(){
        
        getData().then (data =>{
        const photographers = data.photographers;
        createPhotographers(photographers);
     
filterTags(photographers);
})};
createHomePage();


// function qui filtre les tags

function filterTags (photographers){

  const tagsLink= document.querySelectorAll('.tags'); 
  console.log(tagsLink);
  for (let i =0; i< tagsLink.length; i++){
      tagsLink[i].addEventListener('click', function(event){
        event.preventDefault(); 
    photographers.map(photographers => {
    const tags = photographers.tags;
      const ArrayOfTags = tags.map(element => element);
     console.log(ArrayOfTags);
 
      const navLink = tagsLink[i].innerText.slice(1).toLowerCase();
       
      if (ArrayOfTags.includes(navLink)){
         const displaycard= document.getElementsByClassName('card__photographers')
         displaycard.style.display='none'
        }
        else {
          return '';
        }
       });  
     });

  }

};


  
  
  
  










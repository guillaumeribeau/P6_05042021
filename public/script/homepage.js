

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
    
    return`<article class= card photographers>
  <a id= '${photographers.id}' class= card__link href="" aria-label='${photographers.name}'> 
      <img class='card__image' src="img/portrait/${photographers.portrait}" alt="">
      <h2 class='card__name'>${photographers.name}</h2>
   </a>
   
   <h3 id='card__location'>${photographers.city},${photographers.country}</h3>
   <h4 id='card__description'>${photographers.tagline}</h4>
    <p class=card_price>${photographers.price}&euro;/jour</p>
    <div class="card__tags-container">${tags}</div>

 </article>`
});

 main.innerHTML= photographerCard;

};

function createHomePage(){
        
        getData().then (data =>{
        const photographers = data.photographers;
        createPhotographers(photographers);
})};


createHomePage();






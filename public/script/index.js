
 const urlPara = new URLSearchParams(window.location.search);
 let tagsId = urlPara.get('id');

// fonction qui permet d'afficher la page lors du clic du tags sur la pages photographers
 export function afficheLesTags(photographers) {
  let photographerCard = photographers.map(photographers=>{
    let tags = photographers.tags;
      let tagsArray = tags.map(tags =>   {
         return `<span class="card__tags">#${tags}</span>`;
    }).join('');
      // compares l'id de la page   avec le tableau des tags
       if(tagsArray.includes(tagsId)){
        return `
        <article class="card">
            <a id="${photographers.id}" class="card__general-link" href="photographer.html?id=${photographers.id}">
                <img class="card__image" src="./img/portrait/${photographers.portrait}" alt="">
                <h2 class="card__name">${photographers.name}</h2>
            </a>
            <p class="card__location">${photographers.city}, ${photographers.country}</p>
            <p class="card__tagline">${photographers.tagline}</p>
            <p class="card__price">${photographers.price}&euro;/jour</p>
            <div class="card__tags-container">${tagsArray}</div>
        </article>`;

       }
  
})
main.innerHTML=photographerCard.join('');
 }




// function qui permet de créer photographe page accueil 

export function createPhotographers(photographers) {
    const main = document.querySelector('.main');
    let photographerCard = photographers.map(photographers=>{
      let tags = photographers.tags;
        let tagsArray = tags.map(tags => {
            return `<span class="card__tags">#${tags}</span>`;
        }).join('');
        
    return`<article class= card__photographers>
      <a id= '${photographers.id}' class= card__link href="photographer.html?id=${photographers.id}" aria-label='${photographers.name}'> 
          <img class='card__image' src="img/portrait/${photographers.portrait}" alt="">
          <h2 class='card__name'>${photographers.name}</h2>
       </a>
       
       <h3 id='card__location'>${photographers.city},${photographers.country}</h3>
       <h4 id='card__description'>${photographers.tagline}</h4>
        <p class=card__price>${photographers.price}&euro;/jour</p>
        <div class="tags__photographer">${tagsArray}</div>
        
    </article>`
    }).join('');
    
      main.innerHTML= photographerCard;
};



// function qui filtre les tags
export function filterTags(photographers){
  const navLinks =document.querySelectorAll('.tags');
 
      for (let valeur of navLinks){ 
        let tagsLink = valeur.innerText.slice(1).toLowerCase();
        
        valeur.addEventListener('click', function(e){
        e.preventDefault();
        main.innerHTML='';
  
          const filteredCard = photographers.map(photographers => {
          let tags = photographers.tags;
          let tagsArray = tags.map(tags => {
                return `<span class="card__tags">#${tags}</span>`;
            }).join('');
          let ArrayOfTags = tags.map(element => element);
          
          
           if (ArrayOfTags.includes(tagsLink)) {
       
            return `
                  <article class="card">
                      <a id="${photographers.id}" class="card__general-link" href="photographer.html?id=${photographers.id}">
                          <img class="card__image" src="./img/portrait/${photographers.portrait}" alt="">
                          <h2 class="card__name">${photographers.name}</h2>
                      </a>
                      <p class="card__location">${photographers.city}, ${photographers.country}</p>
                      <p class="card__tagline">${photographers.tagline}</p>
                      <p class="card__price">${photographers.price}&euro;/jour</p>
                      <div class="card__tags-container">${tagsArray}</div>
                  </article>`;
          } else {
            return '';
          };
     
     }).join('');
      main.innerHTML = filteredCard;
     
      
  
  })
         
    };
  };
  


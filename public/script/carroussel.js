
export class Lightbox{

static init(){
    // on recupères tous les medias de la page
 const links = Array.from(document.querySelectorAll('a[href$=".mp4"], a[href$=".jpg"]'))
  const gallery =links.map(link=>link.getAttribute('href'));
  


  // on applique une fonction pour chaque image clicker
    links.forEach(link=>link.addEventListener('click', e =>{
     e.preventDefault();
     new Lightbox (e.currentTarget.getAttribute('href'), gallery)
     console.log(e);

    }))
}

   /**@param {string} url Url de l'image */
/**@param {string[]} images chemins des images de la lightbox */

  constructor(url,images){
  this.element=  this.buildDom(url);
  this.loadImage(url);
  this.images = images
  document.body.appendChild(this.element)
  this.onKeyUp = this.onKeyUp.bind(this)
  document.addEventListener('keyup', this.onKeyUp)

  }

    // fonction qui charge soit l'image ou la video dans la lightbox
    loadImage(url){


        if(url.endsWith(".mp4")){
       const video = document.createElement('video')
        video.setAttribute('controls',"")
        const container = this.element.querySelector('.lightbox__container');
         container.innerHTML=''
        container.appendChild(video) 
        this.url = url
        video.src =url
        }
       else if(url.endsWith(".jpg"))
           {
       const image = document.createElement('img');
       const container = this.element.querySelector('.lightbox__container');
       container.innerHTML=''
       container.appendChild(image)
       this.url=url
       image.src=url
       }

      }
        
    
     // permet de fermer avec la touche echap
     onKeyUp (e){
         if(e.key === 'Escape'){
            this.close(e)
         }
         else if (e.key ==='ArrowLeft'){
             this.prev(e)
         }
         else if (e.key === 'ArrowRight'){
             this.next(e)
         }
     }


  // permet de fermer la lightbox
   close(e){
    e.preventDefault();
    this.element.classList.add('fadeOut');
    this.element.parentElement.removeChild(this.element)
    document.removeEventListener('keyup', this.onKeyUp)   
 }

 next(e){
   e.preventDefault()
   let i = this.images.findIndex(image=>image === this.url)
   if(i=== this.images.length -1){
     i = -1  
   }
   
   this.loadImage(this.images [i+1]);
   
 }

prev(e){
    e.preventDefault()
    let i = this.images.findIndex(image=>image === this.url)
    if(i=== 0){
      i = this.images.length -1 
    }
    
    this.loadImage(this.images [i-1]);

}


  /**
   * @param {string} url Url de l'image
   * @return [HTMLElement]
   */
   buildDom(url){
       const dom = document.createElement('div');
       dom.classList.add('lightbox');
       dom.innerHTML=`
        
       <span class='lightbox__close' aria-label='fermer la lightbox'><i id='close__lightbox'class="fas fa-times"></i></span>
       <span class='lightbox__prev' aria-label='image suivante'><i class="fas fa-chevron-left"></i></span>
       <span class='lightbox__next' aria-label='image precedente'><i class="fas fa-chevron-right"></i></span>
        <div class="lightbox__container"> 
        
        </div>`
      // this ici fait reference à notre instance de lightbox et non pas sur element clicker
      dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
      dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
      dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
      
 return dom


}


}








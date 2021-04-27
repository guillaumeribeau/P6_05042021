//dropdown

// permet d'ouvrir le menu en ajoutant la classe Open
const wrapperDrop =document.querySelector('.custom-select-wrapper')
   wrapperDrop.addEventListener('click', function() { 
    this.querySelector('.custom-select').classList.toggle('open');
    })
    wrapperDrop.addEventListener('keydown', function(e) { 
        if(e.key=='ArrowDown'){
      this.querySelector('.custom-select').classList.add('open');
    }
    if(e.key=='ArrowUp'){
        this.querySelector('.custom-select').classList.remove('open');
      }
    })
    


 for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        

        if (!option.classList.contains('selected')) {
            option.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            option.classList.add('selected');
            option.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = option.textContent;
           }
     })
 }


 for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('keydown', function(e) {
        if(e.key == 'Enter'){

        if (!option.classList.contains('selected')) {
            option.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            option.classList.add('selected');
            option.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = option.textContent;
           }
    } 
  })
 }

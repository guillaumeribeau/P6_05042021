
// recuperation des input
const inputName= document.getElementById('name__forms');
const inputPrenom = document.getElementById('lastname__forms');
const inputMail= document.getElementById('mail__forms');
const inputMessage= document.getElementById('msg');
const forms = document.getElementById('formulaire');
const inputAll= document.querySelectorAll('.forms__groups input');

// recuperes les boutons
const btnContactez = document.getElementById('contact__me');
const btnClose= document.getElementById('close');
const btnSubmit = document.getElementById('btn__submit');


// ouvre le formulaire
btnContactez.addEventListener('click', e=>{
e.preventDefault();
forms.style.display='flex';
})
// ferme le formualaire
btnClose.addEventListener('click', e=>{
e.preventDefault();
forms.style.display='none';

})

// permet de recuperer la valeur de l'input dans la console
function valueInput (input){
    let inputValue=input.value;
  console.log(inputValue);
}


btnSubmit.addEventListener('click',e=>{
e.preventDefault();
valueInput(inputName)
valueInput(inputName);
valueInput(inputMail);
valueInput(inputMessage);
})




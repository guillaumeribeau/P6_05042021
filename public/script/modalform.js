
// recuperation des input
const inputName= document.getElementById('name__forms');
const inputPrenom = document.getElementById('lastname__forms');
const inputMail= document.getElementById('mail__forms');
const inputMessage= document.getElementById('msg');
const forms = document.getElementById('formulaire');
const inputAll= document.querySelectorAll('.forms__groups input,textarea');


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



// fonction qui affiche les valeurs input dans la console
function afficherInput (){
inputAll.forEach(item=>{
let valeurInput=item.value;
console.log(valeurInput);

})
}

btnSubmit.addEventListener('click', function (e){
 e.preventDefault();
  afficherInput();
});




  
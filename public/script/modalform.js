const main = document.querySelector('.main__photographer');


// recuperation des input
const inputFirst= document.getElementById('name__forms');
const inputLast = document.getElementById('lastname__forms');
const inputEmail= document.getElementById('mail__forms');
const inputMessage= document.getElementById('msg');
const forms = document.getElementById('formulaire');
const formualaire =document.getElementById('forms')
const inputAll= document.querySelectorAll('.forms__groups input,textarea');

// recuperes les span error

const resultFirst = document.getElementById('errorFirst');
const resultLast = document.getElementById('errorLast');
const resultEmail = document.getElementById('errorMail');
const resultMessage = document.getElementById('errorMessage');
// recuperes les boutons
const btnContactez = document.getElementById('contact__me');
const btnClose= document.getElementById('close');
const btnSubmit = document.getElementById('btn__submit');

// regex
let regPrenomNom = /[a-zA-Z]{2,64}/;
let regEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,16})(\.[a-z]{2,16})?$/;

// function afficher message d'erreur
function afficherMessage(inputdiv){
  inputdiv.style.display='inline-block';
}




// ouvre le formulaire
btnContactez.addEventListener('click', e=>{
e.preventDefault();
main.setAttribute('aria-hidden', 'true');
forms.setAttribute('aria-hidden','false')
forms.style.display='flex';
inputLast.focus();

})


// ferme le formualaire
btnClose.addEventListener('click', e=>{
e.preventDefault();
main.setAttribute('aria-hidden', 'false');
forms.setAttribute('aria-hidden','true')
forms.style.display='none';

})
//ferme formulaire avec echap
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){
  main.setAttribute('aria-hidden', 'false');
  forms.setAttribute('aria-hidden','true')
  forms.style.display='none';
  }
  })  




// message d'erreur 

// initialisation compteur
let count =0;

//function vider message d'erreur de saisie et remplacer par autre message
function caseVide (input){
  input.style.display='block'
  input.innerHTML= 'Merci de completer ce champ'
};

//fonction message erreur Nom ou prenom
function caseErrorPrenomNom(messageDiv){
  messageDiv.style.display='block';
  messageDiv.innerHTML='Merci de renseigner au moins deux caractères'
};

// verification Nom et prenom
function nomPrenom(input,divError){

  if(input.value.length == 0){
    afficherMessage(divError);
    caseVide(divError);
    count++; 
    }else if (regPrenomNom.test(input.value)==false){
      caseErrorPrenomNom(divError);
     count++
  
    }
    else count=0
  };

  // verification email 
function mail (input,divError){
  if(input.value.length == 0){
    afficherMessage(divError);
    caseVide(divError);
    count++; 

  } else if (regEmail.test(input.value)==false){
   afficherMessage(divError);
   resultEmail.innerHTML='Merci de renseigner une adresse Mail valide';
   count++;
}
else count=0
};

// fonction pour verifier que tout est ok avant envoie du formulaire
function validation(){
  nomPrenom(inputFirst,resultFirst);
 nomPrenom(inputLast,resultLast);
  mail(inputEmail,resultEmail);
  nomPrenom(inputMessage,resultMessage);
};



// fonction qui affiche les valeurs input dans la console
function afficherInput (){
  inputAll.forEach(item=>{
  let valeurInput=item.value;
  console.log(valeurInput);
  
  })
  };

// ecoute et envoie du formulaire si tout est ok

// btnSubmit.addEventListener('click', function (e){
//  e.preventDefault();
//   afficherInput();
//   validation();
//    if (count==0){
//    const messageConfirmation = document.getElementById('message__confirmation');
//    messageConfirmation.style.display='inline-block' 
//    document.getElementById('forms').reset();
//     disparition();
  
//   }

// });


btnSubmit.addEventListener('click', function(e){
  envoieFormulaire(e)
});

btnSubmit.addEventListener('keydown', function(e){

  if(e.key === 13 ){
    console.log('coucou')
    envoieFormulaire(e);
  }
});



// ecoute et envoie du formulaire si tout est ok

function envoieFormulaire(e){
 e.preventDefault();
  afficherInput();
  validation();
   if (count==0){
   const messageConfirmation = document.getElementById('message__confirmation');
   messageConfirmation.style.display='inline-block' 
   document.getElementById('forms').reset();
    disparition();
  
  }

}




// fait disparaître le formulaire au bout de 3s
 function disparition(){setTimeout(() => {
   document.getElementById('formulaire').style.display='none'
    }, 3000); 
   
}
   
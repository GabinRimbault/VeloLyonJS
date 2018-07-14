///////////////////////////////////////////// START /////////////////////////////////////////////
/*
Fichier de fonction qui utilise Web Storage API
 */


/**
 * Fonction qui utilise le Web storage pour sauvegarder des données
 * @param  {[string]} name    Correspond au nom données au fichier sauvegarder
 * @param  {[data]} content Correspond au données sauvegarder
 */
function saveStorage(name, content){
  sessionStorage.setItem(name, content);
}


function saveLocalStorage(name, content){
  localStorage.setItem(name, content);
}



/**
 * Fonction qui affiche les données sauvegarder
 * @param  {[string]} name Correspond au nom du fichier qui a été sauvegarder précédemment
 */
 function displayItem(name){
   return sessionStorage.getItem(name);
 }


 function displayLocalItem(name){
   return localStorage.getItem(name);
 }




/**
 * Fonction qui supprime une données sauvegarder
 * @param  {[string]} name Correspond au nom du fichier qui a été sauvegarder précédemment
 */
 function removeItem(name){
   sessionStorage.removeItem(name);
 }


 function removeLocalItem(name){
   localStorage.removeItem(name);
 }









///////////////////////////////////////////// End /////////////////////////////////////////////

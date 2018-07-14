///////////////////////////////////////////// START /////////////////////////////////////////////
/*
Fichier de fonction qui utilise AJAX
 */


/**
 * Fonction qui gére une requete AJAX
 * @param  {[string]}   url      Correspond a l'url du fichier a récupérer
 * @param  {Function} callback   Correspond a la fonction de callback appeler
 */
function ajaxGet(url, callback) {

    //Initialisation de l'objet
    var req = new XMLHttpRequest();

    //Ouvre une requete
    req.open("GET", url);

    //Quand on recoit la réponse on vérifie si il n'y a pas d'erreur
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    //Si il y a une erreur on affiche dans les log
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });

    //Envoie de la requete
    req.send(null);
}




///////////////////////////////////////////// END /////////////////////////////////////////////

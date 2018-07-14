//Key api : AIzaSyAIORJvfZktf21Fb54I-AV_RRPYfP9xv0U
///////////////////////////////////////////// START /////////////////////////////////////////////


/**
 * Méthode d'initialisation de la map. Gére toutes les options, parametres, ajax, ect....
 */
function initMap() {

  //Coordonées de Lyon
  var city = {lat: 45.75, lng: 4.85};

  //On créer la Map et on active les options
  var map = new google.maps.Map(document.getElementById('map'), {
    center: city,
    zoom: 13
  });


  /**
   * Requete Ajax vers API JCDECAUX
   * @param  {[string]} https URL vers L'API
   */
  ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d85feb62f8b3cc1adc5ed90e23cff1458d6068cb", function(response){

    //On récupérer et parse les données JSON
    var stations = JSON.parse(response);

    //Boucle pour récupérer les bonnes données et on enregistre dans des variables les bonnes infos pour les markers
    stations.forEach(function(station){

      //Initialise les markers
      var newMarker = initMarker(station, map);

      //Evenement: Au clic affiche les markers
       markerEvent(newMarker, station);

    });
  });
}



/**
 * Initialise les markers
 * @param  {[tableau]} stationStatus Tableau des données JSON parsée
 * @param  {[tableau]} map           Tableau contenant les données de la map
 * @param  {Number} [station=0]
 * @return {[data]}              Return le marker
 */
function initMarker(stationStatus, map, station = 0){
  //Vérifie si la station est ouverte et initialise le marker
  if(stationStatus.status === "OPEN"){
    var iconOpen = "./img/marqueur_ouvert.png";
    return marker = new google.maps.Marker({
      position: stationStatus.position,
      map: map,
      station: station,
      icon: iconOpen
    });
  }else{ //Vérifie si la station est fermer et initialise le marker
    var iconClose = "./img/marqueur_fermer.png";
    return  marker = new google.maps.Marker({
      position: stationStatus.position,
      map: map,
      station: station,
      icon: iconClose
    });
  }
}




/**
 * Evenement : Méthode qui permet l'affiche et le reglage des markers si on clic sur un marker
 * @param  {[data]} marker  Contient, le marker
 * @param  {[tableau]} station Tableau des données JSON parsée
 */
function markerEvent(marker, station){
  //Evenement: Au clic sur marker
  marker.addListener("click", function(){

    //Utilisation de Regex pour enlever les informatiosn inutiles
    var regex = /^#?[0-9]{4,5}\s?-\s/;
    var stationName = station.name;
    var newStation = stationName.replace(regex, "");
    var recherche = "(FAR)";

    //on save le nom définitif
    newStation = newStation.replace(recherche, "");

    //Bloc qui correspond au modification apporté sur l'encadrer d'une station
    document.getElementById("informations_station").style.display = "block";
    document.getElementById("eltStation").style.display = "block";
    document.getElementById("eltReserv").style.display = "none";
    document.getElementById("headerStation").innerHTML = "<p>Station : <span class=\"element_title\">" + newStation + "</span></p>";
    document.getElementById("element_street").innerHTML = "<p>" + station.address + "</p>";
    document.getElementById("number_bike_available").innerHTML = "<p>Vélo disponible : <span class=\"red\">" + station.available_bikes + "</span></p>";
    document.getElementById("number_stands_available").innerHTML = "<p>Place disponible : <span class=\"red\">" + station.available_bike_stands + "</span></p>";

    //Si une station est ouverte ou non
    stationOpen(station);

    //Vérifie si des vélo sont disponible ou non
    velibDispo(station);

    //On sauvegarder le bon nom de station
    saveStorage("stationName", newStation);
  });
}

/**
 * Méthode qui gére l'affichage des stations ouverte/fermé
 * @param  {[tableau]} station Tableau des données JSON parsée
 */
function stationOpen(station){
  if(station.status === "OPEN"){
    document.getElementById("statusStation").innerHTML = "<p>Station : <span class=\"green\"> OUVERTE </span></p>";
  }else{
    document.getElementById("statusStation").innerHTML = "<p>Station : <span class=\"red\"> FERMEE </span></p>";
  }
}



/**
 * Méthode qui gére l'affichage du bouton réserver
 * @param  {[tableau]} station Tableau des données JSON parsée
 */
function velibDispo(station){
  if(station.available_bikes > 0 && station.status === "OPEN"){
    document.getElementById("reserver").style.visibility = "visible";
  }else{
    document.getElementById("reserver").style.visibility = "hidden";
  }
}




///////////////////////////////////////////// END /////////////////////////////////////////////

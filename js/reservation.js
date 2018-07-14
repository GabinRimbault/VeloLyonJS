class Reservation{
///////////////////////////////////////////// START /////////////////////////////////////////////


  constructor(){
    //Button
    this.close = document.getElementById("close");
    this.reservEltStation = document.getElementById("reserver");
    this.cancelReserv = document.getElementById("cancel");
    this.validReserv = document.getElementById("valid");

    //Timestamp
    this.dateDuJour = Date.now();
    this.timestamp20 = this.dateDuJour + 1200000; // 20min = 1 200 000 milliseconde
    this.reservation = displayItem("reservation");

    //chrono
    this.chrono = null;
  }

  /**
   * Vérifie si une réservation est en cours
   * @return {[boolean]} Return true si une réservation est en cours Sinon return false
   */
  verifReservation(){
    if(displayItem("reservationEnCour")){//Vérifie si une Reservation est en cour ou non
      return true;
    }else{
      return false;
    }
  }

  /**
   * Méthode qui accepte les réservation
   * @return {[null]} Ne return rien
   */
  acceptReservation(){
    this.validReserv.addEventListener("click", ()=> {//Si on clique sur le button reserver d'une station
      if(this.verifReservation()){ //Si une réservation est déja active
        //On vérifie si les champs ne sont pas vide
        if(this.verifContentReservation()){
          //On supprime les données enregistrer
          removeItem("reservationEnCour");
          removeItem("signature");
          removeItem("prenom");
          removeItem("nom");
          removeItem("timeStampFirstReserv");

          //On enregistre les nouvelles données et on ferme la boite de dialogue de reservation
          saveStorage("reservationEnCour", true);
          saveStorage("signature", document.getElementById("sig-canvas").toDataURL());
          saveStorage("prenom", document.getElementById("prenom").value);
          saveStorage("nom", document.getElementById("nom").value);
          saveStorage("timeStampFirstReserv", Date.now());
          document.getElementById("informations_station").style.display = "none";

          //On Stop l'ancien Chrono
          this.chrono.stop();

          //On initialise le nouveau Chrono et on le lance
          var chronoNewReservation = new Chrono(0, 20, 0, 1);
          this.chrono = chronoNewReservation;
          chronoNewReservation.start();

          //On affiche les données save
          this.donneesSave();

          //On affiche juste les bonne infos
          document.getElementById("conteneur_informations2").innerHTML ="<p>Un nouveau vélo a été réserver à " + displayItem("stationName") + ". La réservation expire dans <span id=\"minutes\">20</span> minutes et <span id=\"secondes\">00</span> sec</p>";
        }
      }else{ //Si aucune réservation n'est active
        //On vérifie si les champs ne sont pas vide
        if(this.verifContentReservation()){
          //On enregistre toutes les données et on ferme la boite de dialogue de reservation
          saveStorage("reservationEnCour", true);
          saveStorage("signature", document.getElementById("sig-canvas").toDataURL());
          saveStorage("prenom", document.getElementById("prenom").value);
          saveStorage("nom", document.getElementById("nom").value);
          saveStorage("timeStampFirstReserv", Date.now());
          document.getElementById("informations_station").style.display = "none";

          //On initialise un Chrono et on Enregistre l'id du Chrono et on lance
          var chronoReservFirstReserv = new Chrono(0, 20, 0, 1);
          this.chrono = chronoReservFirstReserv;
          chronoReservFirstReserv.start();

          //on affiche les données sauvegarder
          this.donneesSave();

          //On modifie la boite de dialogue pour la mettre en vert et on affiche la station et le chronoReservFirstReserv
          document.getElementById("conteneur_informations").id = "conteneur_informations2";
          document.getElementById("conteneur_informations2").innerHTML ="<p>Un vélo a été réserver à " + displayItem("stationName") + ". La réservation expire dans <span id=\"minutes\">20</span> minutes et <span id=\"secondes\">00</span> sec</p>";
        }
      }
    });
  }


  /**
  * Méthod qui vérifie l'état d'une reservation via les timestamp
  * @return {[null]} Ne return rien
  */
  verifTimeStamp(){
    //Fonction qui affiche le bon chrono si on reactualise la page
    if(this.verifReservation()){//Si une réservation est déja en cour!
      //On récupérer les timestamp sauvegarder et le timestamp actuel
      var timeStampActuel = Date.now();
      var timeStamp20 = displayItem("timeStampReserv20");

      //On soustrait les deux timestamp et on convertit en milliseconde
      var result = timeStamp20 - timeStampActuel;
      result = result / 1000;

      //On vérifie si result n'est pas inférieur a 0
      if(result <= 0){

        //Si il n'y a plus de temps, on supprime toutes les données sauvegarder
        removeItem("reservationEnCour");
        removeItem("signature");
        removeItem("prenom");
        removeItem("nom");
        removeItem("timeStampFirstReserv");
        removeItem("timeStampReserv20");

        //On affiche qu'aucune réservation n'est en cours
        document.getElementById("conteneur_informations").innerHTML ="<p>Aucune réservation en cours</p>";

      }else{
        //Sinon on arrondi les milliseconde restante a l'entier supérieur
        result = Math.ceil(result);

        //Minute restante arrondi a l'entier inférieur
        var m = Math.floor(result / 60);

        //Seconde restante
        var s = result % 60; //Seconde restante

        //On initialise le nouveau Chrono et on le lance
        var timestampChrono = new Chrono(0, m, s, 1);
        this.chrono = timestampChrono;
        timestampChrono.start();

        //On affiche les données save
        this.donneesSave();

        //On modifie la boite de dialogue pour la mettre en vert et on affiche la station et le timestampChrono
        document.getElementById("conteneur_informations").id = "conteneur_informations2";
        document.getElementById("conteneur_informations2").innerHTML ="<p>Un vélo a été réserver à " + displayItem("stationName") + ". La réservation expire dans <span id=\"minutes\">" + m + "</span> minutes et <span id=\"secondes\">" + s + "</span> sec</p>";
      }

    }else{
      //Si il n'y a aucun réservation en cours On sauvegarde le timestamp actuel + 20 min
      saveStorage("timeStampReserv20", this.timestamp20);
    }
  }

  /**
   * Méthode qui gére l'affichage des données sauvegarder
   * @return {[null]} Ne return rien
   */
  donneesSave(){
    if(this.verifReservation()){
      //Si une reservation est active On affiche l'onglet Données dans le menu
      var eltDonnees = document.getElementById("donnees");
      eltDonnees.style.visibility = "visible";

      //EVENEMENT: Si on clic sur le bouton du menu affiche l'encadrer avec les infos a l'intérieur
      eltDonnees.addEventListener("click", function(){//On affiche le block
        document.getElementById("donneesSave").style.display = "block";
        document.getElementById("prenomSave").innerHTML = "<p>Prénom: " + displayItem("prenom") + "</p>"
        document.getElementById("nomSave").innerHTML = "<p>Nom: " + displayItem("nom") + "</p>"
        var img = new Image();
        var data = displayItem("signature");
        img.addEventListener("load", function(){
          img.src = data;
          document.getElementById("signature").appendChild(drawImage(img));
        });

      });

      //EVENEMENT: Si on clic sur le bouton pour fermer l'encadrer il se ferme
      var closeD = document.getElementById("closeDonnees");
      closeD.addEventListener("click", function(){//On ferme le bloc
         document.getElementById("donneesSave") .style.display = "none";
      });
    }
  }


  /**
   * Méthode qui vérifie si les champs on bien été renseigner sinon affiche des bordure rouge
   * @return {[boolean]} Return true si tous est ok sinon false et affiche des bordure rouge
   */
  verifContentReservation(){
    var inputPrenom = document.getElementById("prenom");
    var inputNom = document.getElementById("nom");

    if(inputPrenom.value != "" && inputNom.value != ""){
      return true;
    }else{
      document.getElementById("verifSig").style.visibility = "visible";
      inputPrenom.style.border = "1px solid red";
      inputNom.style.border = "1px solid red";
      return false;
    }

  }


  ///////////////////////////////// BUTTON /////////////////////////////////

  /**
   * Méthode qui gére l'evenement sur le bouton close
   * @return {[null]} Ne return rien
   */
  closeEltReserv(){
    this.close.addEventListener("click", () => {
      document.getElementById("informations_station").style.display = "none";
    });
  }

  /**
   * Méthode qui gére l'evenement sur le bouton reserver
   * @return {[null]} Ne return rien
   */
  reservElt(){
    this.reservEltStation.addEventListener("click", () => {
      document.getElementById("eltStation").style.display = "none";
      document.getElementById("eltReserv").style.display = "block";
    });
  }

  /**
   * Méhode qui gére l'evenement sur le bouton cancel
   * @return {[null]} Ne return rien
   */
  cancelElt(){
    this.cancelReserv.addEventListener("click", () => {
      document.getElementById("eltReserv").style.display = "none";
      document.getElementById("eltStation").style.display = "block";
    });
  }









///////////////////////////////////////////// END /////////////////////////////////////////////
}

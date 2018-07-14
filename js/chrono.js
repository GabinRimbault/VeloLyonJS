class Chrono{
///////////////////////////////////////////// START /////////////////////////////////////////////

  /**
   * Constructor
   * @param {[int]} heure   Nombre d'heure pour le chrono
   * @param {[int]} minute  Nombre de minutes pour le chrono
   * @param {[int]} seconde Nombre de secondes pour le chrono
   * @param {[int]} activ   1 = Activ / 0 = Inactiv
   */
  constructor(heure, minute, seconde, activ){

    //Temps
    this.heure = heure;
    this.minute = minute;
    this.seconde = seconde;

    //Fonction
    this.idChrono = document.getElementById("chrono");
    this.activ = activ;

    //setInterval
    this.stopInter = null;
  }


  /**
   * Lance le chrono
   * @param  {Number} [stopChrono=0] [description]
   * @return {[null]} Ne return rien
   */
  start(){
    //On vérifie si le chrono est actif (Il reste des seconde) et si l'objet chrono est disponible
    if(this.isActif() && this.isActiv()){

      //Lance un setInterval qui relancera le code toute les 1 sec (1000millisecondes)
      var chrono = setInterval(()=> {

        //On save la variable setInterval
        this.stopInter = chrono;

        //Calcul sur les secondes
        if(this.seconde > 0){
          this.seconde--;
        }else if(this.minute > 0){ //Calcul sur les minutes
          this.minute--;
          this.seconde = 59;
        }else if(this.heure > 0){ //Calcul sur les heures
          this.heure--;
          this.minute = 59;
          this.seconde = 59;
        }

        //Modifie le document pour afficher le temps (minutes/secondes) restantes
        document.getElementById("minutes").innerText = this.minute;
        document.getElementById("secondes").innerText = this.seconde;

        //On vérifie avant si il y a des heures a afficher
        if(this.heure > 0){
          document.getElementById("heures").innerText = this.heure;
        }

        //Enfin quand toutes les variables sont a 0 on stop le chrono
        if(this.seconde === 0 && this.minute === 0 && this.heure === 0){
          this.stop();
        }
      }, 1000);
    }
  }

  /**
   * Fonction qui stop le setInterval
   * @return {[null]} Ne return rien
   */
  stop(){
    clearInterval(this.stopInter);
  }

  /**
   * Vérifie si l'objet chrono est activer
   * @return {Boolean} Renvoie true si l'objet est activer ou non
   */
  isActiv(){
    if(this.activ === 1){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Vérifie si l'on a une heure/minute/seconde supérieur a 0
   * @return {Boolean} Renvoie true si une des valeur est supérieur a 0
   */
  isActif(){
    if(this.heure > 0 || this.minute > 0 || this.seconde > 0){
      return true;
    }else{
      return false;
    }
  }





///////////////////////////////////////////// END /////////////////////////////////////////////
}

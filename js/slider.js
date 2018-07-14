class Slider{


///////////////////////////////////////////// START /////////////////////////////////////////////


  /**
   * [Constructor]
   * @param {[string]} id    [Correspond a l'id de la div du slider]
   * @param {[number]} activ [Permet de savoir si le slider est actif ou non]
   */
  constructor(id, activ){
    //elements div
    this.idDiapo = document.getElementById(id);
    this.numberElementsDiapo = document.getElementById("elementsDiapo").getElementsByTagName("p").length;
    this.elements = document.getElementsByClassName("elements");
    this.footerDiapo = document.getElementById("playStop");
    this.down = document.getElementById("down");
    this.up = document.getElementById("activ_diapo");

    //Options
    this.activ = activ;
    this.timeInterval = 4000;
  }

  /**
   * [isActiv permet de savoir si le slider est actif ou non]
   * @return {Boolean} [Retourn true si le slider est actif, false si il est inactif]
   */
  isActiv(){
    if(this.activ === 1){ //Si actif
      this.footerDiapo.innerHTML = "<p style=\"color:#0081d5;\"><i style=\"font-size:1.1em;\" class=\"fas fa-pause-circle\"></i> Stopper la lecture</p>";
      this.activ = 1;
      diaporama.idDiapo.style.display = "block";
      return true;
    }else{ //Si inactif
      this.activ = 0;
      diaporama.idDiapo.style.display = "none";
      return false;
    }
  }

  /**
   * [applyVisibleInCSS applique les bonnes visibilités au differents elements du slider]
   */
  applyVisibleInCSS(){
    if(this.isActiv()){
      for(var i = 0; i != this.numberElementsDiapo; i++){
        if(i === 0){
          this.elements[i].style.display = "block";
        }else{
          this.elements[i].style.display = "none";
        }
      }
    }
  }

  /**
   * [whoIsVisible permet de savoir quelle element est visible]
   * @return {[object]} [retourne un objet de l'element visible]
   */
  whoIsVisible(){
    for(var i = 0; i != this.numberElementsDiapo; i++){
      if(this.elements[i].style.display === "block"){
        return i;
      }
    }
  }

  /**
   * [sliderFunction fonction principal du slider]
   */
  sliderFunction(){
    if(this.isActiv()){
      var functionTime = () => {this.displayElement();};
      var lecteurDiapo = setInterval(functionTime, this.timeInterval);
      this.lecteurDiapo(lecteurDiapo);
      this.pressKey(lecteurDiapo);
    }
  }

  /**
   * [displayElement permet l'affiche de l'element en cours et du suivant]
   */
  displayElement(){
    for(var i = 0; i != this.numberElementsDiapo; i++){
      if(this.elements[i].style.display === "block"){
        this.elements[i].style.display = "none";
        if(i === this.numberElementsDiapo - 1){
          this.elements[i].style.display = "block";
        }else{
          this.elements[i + 1].style.display = "block";
          break;
        }
      }
    }
  }

  /**
   * [lecteurDiapo gere l'afficher du bouton lecture/stop et l'arret ou non du diapo]
   * @param  {[object]} lecteurDiapo [objet de la method sliderFunction]
   */
  lecteurDiapo(lecteurDiapo){
    var lecteur = 1;
    this.footerDiapo.addEventListener("click", () => {
      if(lecteur === 1){
        lecteur = 0;
        this.footerDiapo.innerHTML = "<p style=\"color:#0081d5;\"><i style=\"font-size:1.1em;\" class=\"fas fa-play-circle\"></i> Reprendre la lecture</p>";
        clearInterval(lecteurDiapo);
      }else if(lecteur === 0){
        lecteur = 1;
        this.footerDiapo.innerHTML = "<p style=\"color:#0081d5;\"><i style=\"font-size:1.1em;\" class=\"fas fa-pause-circle\"></i> Stopper la lecture</p>";
        diaporama.sliderFunction();
      }
    });
  }

  /**
   * [pressKey gere l'appui des touches fléché sur le clavier]
   * @param  {[object]} lecteurDiapo [objet de la method sliderFunction]
   */
  pressKey(lecteurDiapo){
    document.addEventListener("keydown", (e) => {
      if(e.keyCode === 39){//->
        clearInterval(lecteurDiapo);
        this.footerDiapo.innerHTML = "<p style=\"color:#0081d5;\"><i style=\"font-size:1.1em;\" class=\"fas fa-play-circle\"></i> Reprendre la lecture</p>";
        this.displayElement();
      }else if(e.keyCode === 37){//<-
        clearInterval(lecteurDiapo);
        this.footerDiapo.innerHTML = "<p style=\"color:#0081d5;\"><i style=\"font-size:1.1em;\" class=\"fas fa-play-circle\"></i> Reprendre la lecture</p>";
        this.prevSlide();
      }
    });

  }

  /**
   * [prevSlide permet de revenir un cran en arriére sur le slider]
   */
  prevSlide(){
    var visible = this.whoIsVisible();
    if(visible > 0){
      for(var i = 0; i != this.numberElementsDiapo; i++){
        if(this.elements[i].style.display === "block"){
          this.elements[i].style.display = "none";
          this.elements[i - 1].style.display = "block";
        }
      }
    }else{}
  }

/**
 * Méthode qui permet de fermer le diaporama.
 */
 downDiapo(){
    this.down.addEventListener("click", function(){
       document.getElementById("informations").style.display = "none";
    });
 }

/**
 * Méthode qui permet d'ouvrir le diaporama.
 */
 upDiapo(){
   this.up.addEventListener("click", function(){
      document.getElementById("informations").style.display = "block";
   });
 }











///////////////////////////////////////////// END /////////////////////////////////////////////
}

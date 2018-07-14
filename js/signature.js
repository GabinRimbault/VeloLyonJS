class Signature{
///////////////////////////////////////////// START /////////////////////////////////////////////


  /**
   * Constructor
   * @param {[string]} idCanvas récupérer l'id du canvas
   */
  constructor(idCanvas){

    //Mouse Pos
    this.mousePos = { x:0, y:0 };
    this.lastPos = this.mousePos;

    //Canvas
    this.canvas = document.getElementById(idCanvas);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#222222";
    this.ctx.lineWith = 2;

    //Other
    this.drawing = false;
    this.clearBtn = document.getElementById("clearSig");
  }

  /**
   * Evenement au Clic enfoncer : Calcul de la position de la souris
   * @return {[null]} Ne return rien
   */
  posMouseDown(){
    this.canvas.addEventListener("mousedown", (e) => {
      this.drawing = true;
      this.lastPos = this.getMousePos(e);
    });
  }

  /**
  * Evenement au Clic relacher : Stop le dessin
  * @return {[null]} Ne return rien
   */
  posMouseUp(){
    this.canvas.addEventListener("mouseup", (e) => {
      this.drawing = false;
    });
  }

  /**
  * Evenement quand la souris bouge : Calcul de la trajectoire
  * @return {[null]} Ne return rien
   */
  posMouseMove(){
    this.canvas.addEventListener("mousemove", (e) => {
      this.mousePos = this.getMousePos(e);
      this.renderSignature();
    });
  }

  /**
   * Calcul, les positions/trajectoire de la souris depuis les evenements
   * @param  {[evenement]} mouseEvent Prend un tableau des positions
   * @return {[int]}  Return les position dans le canvas sous forme x et y
   */
  getMousePos(mouseEvent) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    };
  }

  /**
   * Affiche le dessin dans le canvas
   * @return {[null]} Ne return rien
   */
  renderSignature(){
    if(this.drawing){
      this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
      this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
      this.ctx.stroke();
      this.lastPos = this.mousePos;
    }
  }

  /**
   * Fait un clear de la signature
   * @return {[null]} Ne return rien
   */
  clearSignature(){
    this.clearBtn.addEventListener("click", () => {
      this.canvas.width = this.canvas.width;
    });
  }










///////////////////////////////////////////// END /////////////////////////////////////////////
}

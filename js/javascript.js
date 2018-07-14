///////////////////////////////////////////// START /////////////////////////////////////////////

//On gére l'affichage du diaporama
var diaporama = new Slider("diaporama", 1);
diaporama.isActiv();
diaporama.applyVisibleInCSS();
diaporama.sliderFunction();
diaporama.lecteurDiapo();
diaporama.downDiapo();
diaporama.upDiapo();


//On gére les éléments de la signature
var signature = new Signature("sig-canvas");
signature.posMouseDown();
signature.posMouseUp();
signature.posMouseMove();

//On gére les éléments de réservation
var reservation = new Reservation();
reservation.closeEltReserv();
reservation.reservElt();
reservation.cancelElt();
reservation.acceptReservation();
reservation.verifTimeStamp();


///////////////////////////////////////////// END /////////////////////////////////////////////

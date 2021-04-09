
const myVivus = new Vivus('polaroid');

myVivus.finish()
function ani(){

    myVivus.stop().reset().play(3)


}
function rev(){
    myVivus.play(-3)
}
function morph(){

    gsap.to("#circle", {
        duration: 2,
        morphSVG:"#big"
    });
}

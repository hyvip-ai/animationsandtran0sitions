// const video = document.querySelector("video")
// const intro = document.querySelector(".intro")
var controller = new ScrollMagic.Controller();

// create a scene
const scene = new ScrollMagic.Scene({
    duration: 97000, // the scene should last for a scroll distance of 97000px
     offset: 720, // start this scene after scrolling for 50px
    triggerHook:0
}).addIndicators()
.setPin(".video")
.addTo(controller)

let scrollpos = 0;

scene.on("update",(e) => {
    // console.log("")
    // console.log(scrollpos)
    // console.log("updated")
    scrollpos = e.scrollPos/1000;
})
setInterval(() => {
    // delay  += (scrollpos-delay)*easing
    document.querySelector("video").currentTime = scrollpos
}, 80);

const tl = new TimelineLite({paused:true})
tl.fromTo(".imdiv",1,{
    width:"0%",
    // scale: 0.5
},{
    width:"70%",
    // scale:1
    
}).fromTo(".container",1,{
    width:"0%",
   
},{
    width:"100%",
   
   
}).fromTo(".head",0.5,{
    opacity:0,
    y:100
},{
    opacity:1,
    y:0
})
window.addEventListener("load",()=>{
    tl.restart();
})
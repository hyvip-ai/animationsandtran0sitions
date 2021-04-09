var down = false;
const cltl = new TimelineLite({
  onComplete: function () {
    this.restart();
  }
})
cltl.fromTo(".cloud1", 15, {
  x: -500
}, {
  x: 1500
}).fromTo(".cloud2", 20, {
  x: -1500
}, {
  x: 1200
}, "-=12").fromTo(".cloud3", 30, {
  x: 1500
}, {
  x: -1200
}, "-=22")

const asttl = new TimelineLite({paused:true,onComplete:function(){
  hptl.play()
}});
asttl.fromTo(".firstcover",1,{
  opacity:1
},{
  opacity:0
}).fromTo(".circular",2,{
  opacity:1,
  scale:1
},{
  scale:80,
  opacity:0
},"-=0.9")

// asttl.play()
const tl = new TimelineLite({ paused: true });
tl.to(".bar1", 0.5, {
  rotation: 45,
  y: 20
}).to(".bar2", 0.5, {
  rotation: -45,
  y: -20
}, "-=0.5").to(".bar_cover", 1, {
  height: "100%"
}).fromTo(".home", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
}).fromTo(".About", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
}).fromTo(".work", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
}).fromTo(".conatct", 0.5, {
  opacity: 0,
  y: 100
}, {
  opacity: 1,
  y: 0
})
function clicked() {
  // console.log("clicked");
  if (!down) {
    tl.play();

    down = true
  }
  else {
    tl.reverse();

    down = false
  }
}

 


var options = {
  strings: ["", "Student", "Web-Designer", "Web-Developer", "Coder", "Geek", "Enthusiast"],
  showCursor: false,
  backSpeed: 20,
  typeSpeed: 80,
  loop: true
};

var typed = new Typed('#hobbies', options);
typed.start();



document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".stars").forEach(parallax => {

    const speed = parallax.getAttribute("data-speed")

    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    parallax.style.transform = `translateX(${-x}px) translateY(${-y}px)`
  })

})


const hptl = new TimelineLite({ paused: true })
hptl.fromTo(".hm", 0.5, {
  opacity:0
},{
  opacity: 1
}).fromTo(".main-menu", 0.8, {
  y: -150
}, {
  y: 0
}).fromTo(".mainsvg", 1, {
  x: 200,
  opacity: -2
}, {
  x: 0,
  opacity: 1
}).fromTo(".paar", 0.8, {
  opacity: 0
}, {
  opacity: 1
}).fromTo(".myname", 1, {
  opacity: 0,
  y: 150
}, {
  opacity: 1,
  y: 0

}, "-=0.8").fromTo(".middle", 1, {
  opacity: 0
}, {
  opacity: 1
}, "-=0.6").fromTo(".hobbs", 1, {
  x: -100,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}, "-=1").fromTo(".mainlinks", 1, {
  opacity: 0,
  y: -100
}, {
  opacity: 1,
  y: 0
}, "-=1").fromTo(".click", 0.5, {
  opacity: 0,
  x: -80
}, {
  opacity: 1,
  x: 0
})

window.addEventListener("load", (e) => {
  document.getElementById("cov").style.pointerEvents = "none"
  document.getElementById("homeline").style.background = "tomato"
  document.getElementById("aboutline").style.background = "white"
  setTimeout(function(){
    asttl.play();
  },3000)
})

var options = {
  strings: ["", "I love Technology!", "I love Animations!", "I love Programming!", "I love Challenges!", "I love Designs!", "I like Engineering!"],
  showCursor: false,
  backSpeed: 20,
  typeSpeed: 80,
  loop: true
};
var homeopen = true;
var aboutopen = false;

var conatctopen = false;
var type = new Typed('#abtme', options);

function openabout() {
  document.getElementById("homeline").style.background = "white"
  document.getElementById("aboutline").style.background = "tomato"
  document.getElementById("hireline").style.background = "white"

  if (!aboutopen) {
    currentpage = "about";
    homeopen = false;
    aboutopen = true;
  
    conatctopen = false;
    aptl.restart();
    sttl.restart();

  }

}

function openhire(){
  document.getElementById("homeline").style.background = "white"
  document.getElementById("aboutline").style.background = "white"
  document.getElementById("hireline").style.background = "tomato"

  
  if (!conatctopen) {
    currentpage = "hire";
    homeopen = false;
    aboutopen = false;
  
    conatctopen = true;
    hrtl.restart();

  }
}
const hrtl = new TimelineLite({paused:true})
hrtl.fromTo(".about",0.2,{
  opacity:0
},{
  opacity:0
}).fromTo(".hm",0.2,{
  opacity:0
},{
  opacity:0
}).fromTo(".touch",0.5,{
  width:0,
  opacity:0
},{
  width:"100%",
  opacity:1
}).fromTo(".gettouch",1,{
  x:200,
  y:-150,
  opacity:0
},{
  x:0,
  y:200,
  opacity:1
})

function homeclick() {
  let x = document.getElementById("homebtn1");
  tl.reverse();
  x.click();
}
function aboutclick() {

  let x = document.getElementById("aboutbtn1")
  tl.reverse();
  x.click();
}
function hireclick(){
  let x = document.getElementById("hirebtn1")
  tl.reverse();
  x.click();
  
}
var currentpage = "home";
var homepage = document.getElementById("home");
var aboutpage = document.getElementById("abt");
const aptl = new TimelineLite({ paused: true })
aptl.fromTo(".hm", 0.1, {
  opacity: 0
},{
  opacity:0
}).fromTo(".touch",0.1,{
  opacity:0
},{
  opacity:0
}).fromTo(".about", 1, {
  width: 0,
  opacity: 0
}, {
  width: "100%",
  opacity: 1
}).fromTo(".me",1,{
  opacity:0,
  x:-150
},{
  opacity:1,
  x:0
}).fromTo(".underline1", 0.5, {
  x: 150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}, "-=0.6").fromTo(".underline2", 0.5, {
  x: 150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".types", 1, {
  y: 100,
  opacity: 0
}, {
  y: 0,
  opacity: 1
}).fromTo(".skill-set", 1, {
  y: -150,
  opacity: 0
}, {
  y: 0,
  opacity: 1
}).fromTo(".main-card1", 1, {
  y: 150,
  opacity: 0
}, {
  y: 0,
  opacity: 1
}).fromTo(".main-card2", 1, {
  x: -150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".main-card3", 1, {
  x: 150,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".page-number1", 1, {
  y: 100,
  opacity: 0
}, {
  y: 0,
  opacity: 1
})
const sttl = new TimelineLite({
  paused: true, onComplete: function () {
    this.restart()
  }
})
sttl.fromTo(".star1", 2, {
  opacity: 0,
  x: 0,
  y: 0
}, {
  opacity: 1,
  x: -1200,
  y: 1200
}).fromTo(".star2", 1.5, {
  opacity: 0,
  x: 250,
  y: 0
}, {
  opacity: 1,
  x: -950,
  y: 1150
}, "-=1").fromTo(".star3", 3, {
  opacity: 0,
  x: 400,
  y: 0
}, {
  opacity: 1,
  x: -1300,
  y: 1450
}, "-=0.8").fromTo(".star4", 3, {
  opacity: 0,
  x: 520,
  y: 100
}, {
  opacity: 1,
  x: -1300,
  y: 1450
}, "-=2.5").fromTo(".star5", 3, {
  opacity: 0,
  x: 620,
  y: 250
}, {
  opacity: 1,
  x: -1550,
  y: 1700
}, "-=2.5")

function openhome() {
  document.getElementById("homeline").style.background = "tomato"
  document.getElementById("aboutline").style.background = "white"
  document.getElementById("hireline").style.background = "white"


  if (!homeopen) {
   
      

      newhptl.restart();
     
    
   
    currentpage = "home"
    // homepage.style.height = "80%"
    // homepage.style.opacity = "1";
    homeopen = true;
    aboutopen = false;
   
    conatctopen = false;
  }

}
const newhptl = new TimelineLite({ paused: true })
newhptl.fromTo(".about",0.2,{
  opacity:0
},{
  opacity:0
}).fromTo(".touch",0.2,{
  opacity:0
},{
  opacity:0
}).fromTo(".hm", 0.5, {
  opacity:0
},{
  opacity: 1
}).fromTo(".mainsvg", 1, {
  x: 200,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}).fromTo(".paar", 0.8, {
  opacity: 0
}, {
  opacity: 1
}).fromTo(".myname", 1, {
  opacity: 0,
  y: 150
}, {
  opacity: 1,
  y: 0

}, "-=0.8").fromTo(".middle", 1, {
  opacity: 0
}, {
  opacity: 1
}, "-=0.6").fromTo(".hobbs", 1, {
  x: -100,
  opacity: 0
}, {
  x: 0,
  opacity: 1
}, "-=1")

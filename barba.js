function delay(n) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, n);
    });
  }

barba.init({
    sync:true,
    transitions: [{
      name: 'opacity-transition',
      async leave(data) {
       tras();
       await delay(2100)
      },
      async enter(data) {
       
        content();
     
      }
    }]
  });

  function tras(){

    var ltl=gsap.timeline();
    ltl.fromTo(".part1",0.4,{
        height:"0%"
    },{
        
        height:"100%"
    }).fromTo(".part2",0.4,{
        height:"0%"
    },{
       
        height:"100%"
    },"-=0.2").fromTo(".part3",0.4,{
        height:"0%",
        
    },{
        
        height:"100%"
    },"-=0.2").fromTo(".part4",0.4,{
        height:"0%",
        
    },{
        
        height:"100%"
    },"-=0.2").fromTo(".part5",0.4,{
        
        height:"0%"
    },{
        
        height:"100%"
    },"-=0.2").fromTo(".part6",0.4,{
        
        height:"0%"
    },{
        
        height:"100%"
    },"-=0.2").fromTo(".part7",0.4,{
        
        height:"0%"
    },{
        
        height:"100%"
    },"-=0.2").fromTo(".part8",0.4,{
        
        height:"0%"
    },{
       
        height:"100%"
    },"-=0.2").fromTo(".part9",0.4,{
        
        height:"0%"
    },{
       
        height:"100%"
    },"-=0.2").fromTo(".part10",0.4,{
       
        height:"0%"
    },{
       
        height:"100%"
    },"-=0.2")
  }
  function content(){
  var etl = gsap.timeline();
  etl.to(".body",0,{
    opacity:1
}).to(".body2",0,{
    opacity:1
}).fromTo(".part1",0.4,{
    height:"100%"
},{
    height:"0%"
}).fromTo(".part2",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part3",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part4",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part5",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part6",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part7",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part8",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part9",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2").fromTo(".part10",0.4,{
    height:"100%"
},{
    height:"0%"
},"-=0.2")

}
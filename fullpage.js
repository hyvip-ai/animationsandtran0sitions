new fullpage('#fullpage', {
	//options here
	autoScrolling:true,
	scrollHorizontally: true,
    anchors:['firstPage', 'secondPage', 'thirdPage','fourthpage'],
    navigation: true,
    navigationPosition: 'right',
    keyboardScrolling: true,
	animateAnchor: true,
	recordHistory: true,
    navigationTooltips: ['First Slide', 'Second Slide','Third Slide','Fourth Slide'],
	showActiveTooltip: false,
	
	scrollOverflow: true,


	onLeave: function(origin, destination, direction){
		if(destination.index==1){
			// console.log("trigger hocche")
			
                tl.restart();
		}
		if(origin.index==1){
			tl.reverse();
		}
		if(origin.index==1 || origin.index==3){
			ntl.restart()
		}
		if(origin.index==2){
			ntl.reverse();
		}
		if(origin.index==2 && destination.index==3){
		
			ptl.restart();
		}
		if(origin.index==3 && destination.index==2){
			
			ptl.reverse();
		}
	},

});
const tl = new TimelineLite({paused:true})
            tl.fromTo(".side",1,{
				x:0
			},{
				x:750
			}).fromTo(".back",1,{
				x:0
			},{
				x:350
			},"-=0.5")
const ntl = new TimelineLite({paused:true})
ntl.fromTo(".third",1,{
	x:0
},{
	x:-150
}).fromTo(".first",1,{
	x:0,
	y:0
},{
	x:-60,
	y:150
},"-=0.5").fromTo(".second",1,{
	y:0,
	x:0
},{
	x:-100,
	y:-200
},"-=0.6")
const ptl = new TimelineLite({paused:true})
ptl.fromTo(".animate",2,{
	y:0
},{
	ease: Elastic.easeOut.config(1, 0.5),
	y:700
})
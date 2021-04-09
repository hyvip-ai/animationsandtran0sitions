var close = true

function flod(){
    if(close){
        document.getElementById("fo").style.width="350px"
        document.getElementById("mai").style.borderRadius="50% 0px 0px 50%";
        close=false
    }
    else{
        document.getElementById("fo").style.width="0px";
       
       setTimeout(() => {
        document.getElementById("mai").style.borderRadius="50%"
       }, 500);
        close=true
    }
}



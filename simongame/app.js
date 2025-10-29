let gameseq=[];
let userseq=[];
let level=0;
let colors=["yellow","green","red","purple"];
let started=false;
let h2=document.querySelector('h2');
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
    }
    levelup();

});
function buttonflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=colors[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);

    buttonflash(randBtn);


}
function checkAns(idx){
    console.log("curr level:",level);
    // let idx=level-1;
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000)
        }
        console.log("same value")
    }else{
        h2.innerHTML=`Game Over Your score was <b>${level}</b><br>Press any key to start the game`;
        document.querySelector("body").style.backgroundcolor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundcolor="white";
        },150)
        reset();
    }
}

function btnPress(){
    let btn=this;
    buttonflash(btn);
    userColor=btn.getAttribute("id");
    userseq.push(userColor);

    console.log(this);
    console.log("button was pressed");
    checkAns(userseq.length-1);
}
let btn=document.querySelectorAll('.btn');
for(bt of btn){
    bt.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}
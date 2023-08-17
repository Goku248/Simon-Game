let gameseq = [];
let userseq = [];

let startgame = false;
let level = 0;

let btns = ["red","yellow","green","blue"];

let h2 = document.querySelector("h2");

let maxhigh = 0;

document.addEventListener("keypress",function(){
    if (startgame == false) {
        console.log("game started😊");
        startgame = true;

        levelup();
    }
});


function gameflash(btn){
    btn.classList.add("gameflash");

    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq = [];
    level++;

    h2.innerText = `Level ${level}`;

    // random btn flash
    let randIdx = Math.floor(Math.random()*4);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);

    gameseq.push(randcolor);
    console.log("gm",gameseq);
    gameflash(randbtn);
}

function checkAns(idx){
    // console.log("curr level :", level);
    if (gameseq[idx] == userseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over!<br><h4>  Your Score : ${level} </h4>Press any key to start `;

        let highscore = document.querySelector("h3");
        if (maxhigh < level) {
            maxhigh = level;
            highscore.innerText = `High Score = ${maxhigh}`;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
   let btn = this;
   userflash(btn);

   let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log("um",userseq);

    checkAns(userseq.length-1);
}

let allbtn = document.querySelectorAll(".btn");

for(btn of allbtn){
    btn.addEventListener("click",btnPress);
}



function reset(){
    startgame = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


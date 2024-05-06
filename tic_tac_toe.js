let boxes=document.querySelectorAll('.box');
let resetbtn=document.querySelector("#reset-btn");
let newbtn=document.querySelector("#new-btn")
let msgcontainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg");
let player=document.querySelector("#player")

const clickSound1 = new Audio('678248__pixeliota__mouse-click-sound.mp3');
clickSound1.playbackRate = 1.5; 

const clickSound2 = new Audio('341985__unadamlar__goodresult.wav');

const clickSound3 = new Audio('620792__melokacool__game-over.wav');
// clickSound2.playbackRate = 1.5; 

let turnX=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false
        box.innerText="";
        msgcontainer.classList.add("hide");
    }
}


const resetGame=()=>{
    clickSound1.play()
    c=0;
    turnX=true;
    if (turnX) {
        player.innerText = "Player X's turn";
    } else {
        player.innerText = "Player O's turn";
    }
    enableBoxes()
    
}
const switchTurn = () => {
    if (turnX) {
        player.innerText = "Player O's turn";
    } else {
        player.innerText = "Player X's turn";
    }
}
boxes.forEach((box)=>
    box.addEventListener("click",()=>{
        clickSound1.play(); 
        switchTurn()
        if(turnX==true){            
            box.innerText='X';
            box.style.color="green";
            turnX=false;
        }
        else{
            box.innerText='O';
            box.style.color="red";
            turnX=true;
        }
        box.disabled=true;
        count++;
        let isWinner=checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
            
        }
    })
)

const gameDraw=()=>{
    clickSound3.play()
    msg.innerText=`Game was a Draw`
    msgcontainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled=true
    }
    
}

const showWinner=(winner)=>{
    clickSound2.play()
    msg.innerText=`Congratulations, Winner is Player '${winner}' 🎉`
    switchTurn()
    msgcontainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled=true
    }
    
}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let posval1=boxes[pattern[0]].innerText;
        let posval2=boxes[pattern[1]].innerText;
        let posval3=boxes[pattern[2]].innerText;
        if(posval1 !="" && posval2 !="" && posval3!=""){
            if(posval1===posval2 && posval2===posval3){
                showWinner(posval1)
                return true;
            }
        }
    }
}

newbtn.addEventListener("click",resetGame)
resetbtn.addEventListener("click",resetGame)
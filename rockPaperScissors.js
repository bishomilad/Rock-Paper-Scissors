const buttonsfig = document.querySelector('.btndiv');
const qlabel = document.querySelector(".question");
console.log(document);
let currentChoice;
let humanScore=0;
let computerScore=0;
buttonsfig.addEventListener("click",getHumanChoice)

function getComputerChoice(){
    const choice = parseChoice(getRandom());
}

function getRandom(){
    return Math.floor(Math.random()*3);
}

function parseChoice(choice){
        switch (choice){
        case 0:
            return "rock";
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors"
            break;
        default:
            return NaN;
    }
}

//user press on one of 3 buttons
function getHumanChoice(e){
    //check when the user clicks
    if(e.target.value!==undefined){
        currentChoice = parseChoice(e.target.value);
    } 
}

//computer chooses a sign

function playRound(pChoice, cChoice){
    if(pChoice===cChoice){
        console.log("That's a tie!");
        qlabel.textContent="That's a tie!";

    }else if(calcLoser(pChoice,cChoice)){
            console.log("CPU wins!");
            qlabel.textContent="CPU wins!";
            computerScore++;
    }else if(calcLoser(cChoice,pChoice)){
            console.log("You win!");
            qlabel.textContent="You win!"
            humanScore++;
        }
    
}

function calcLoser(pChoice,cChoice){
    return (pChoice==="rock" && cChoice==="paper"
        || pChoice==="paper" && cChoice==="scissors" 
        || pChoice==="scissors" && cChoice==="rock")
}

function playGame(){
    
}
const buttonsfig = document.querySelector('.btndiv');
const qlabel = document.querySelector(".question");
const scoreslabel = document.querySelector(".scores");
const popupdiv = document.querySelector(".popup");

//

console.log(document);
let currentChoice;
let humanScore=0;
let computerScore=0;
let rounds = 5;
let gamestarted = false;
//buttonsfig.addEventListener("click",getHumanChoice);

async function waitForInput(){
    return new Promise((resolve,reject)=> {
        buttonsfig.addEventListener("click", (e)=>{
            if(e.target.value!==undefined){
                currentChoice = parseChoice(parseInt(e.target.value));
                console.log(e.target.value);
                if(gamestarted===false)
                    playGame();
                resolve();
                }else reject();

               
        })

    })
}



function getComputerChoice(){
    return parseChoice(getRandom());
}

function getRandom(){
    let n = Math.floor(Math.random()*3);
    console.log(n);
    return n
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
        currentChoice = parseChoice(parseInt(e.target.value));
        console.log(e.target.value);
        if(gamestarted===false)
            playGame();
    }
}


function playRound(pChoice, cChoice){
    qlabel.textContent="";
    if(pChoice===cChoice){
        qlabel.textContent="That's a tie!\n";

    }else if(calcLoser(pChoice,cChoice)){
        qlabel.textContent="Ouch!\n";
        computerScore++;
    }else{ 
        qlabel.textContent="Nice!\n";
        humanScore++;
    }
    qlabel.textContent+=`CPU played ${cChoice}!`;
    updateScores();
}

function calcLoser(pChoice,cChoice){
    return (pChoice==="rock" && cChoice==="paper"
        || pChoice==="paper" && cChoice==="scissors" 
        || pChoice==="scissors" && cChoice==="rock")
}

function updateScores(){
    scoreslabel.textContent = `${humanScore} : ${computerScore}`;
}

async function playGame(){
    //enables replaying after 5 rounds are over
    gamestarted=true;
    while(rounds>0){
        //important to prevent event delegation from rejecting the promise
        let keeptrying=false;
        do{
            try{
                await waitForInput();
                keeptrying=false;
            }catch{
                keeptrying=true;
            }
        }while(keeptrying)

        playRound(currentChoice,getComputerChoice());
        rounds--;
    }
    compareScores();
    humanScore=0;
    computerScore=0;
    popupdiv.classList.add("visible");
    popupdiv.classList.remove("popup");

    updateScores();
    gamestarted=false;

}

function compareScores(){
    if(humanScore>computerScore)
        popupdiv.firstChild.textContent="You win!";
    else if(humanScore<computerScore)
        popupdiv.firstChild.textContent="You lose!";
    else popupdiv.firstChild.textContent="It's a tie!";
    popupdiv.firstChild.textContent+=`\n with a score of ${humanScore}`;
}

playGame();



const buttonsfig = document.querySelector('.btndiv');
const qlabel = document.querySelector(".question");
const scoreslabel = document.querySelector(".scores");
const popupdiv = document.querySelector(".popup");

//

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
                if(!gamestarted) gamestarted=true;
                resolve();
                }else reject();

               
        },{once:true})

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
            return "🪨";
            break;
        case 1:
            return "📜";
            break;
        case 2:
            return "✂️"
            break;
        default:
            return NaN;
    }
}

//user press on one of 3 buttons

/*function getHumanChoice(e){
    //check when the user clicks
    if(e.target.value!==undefined){
        currentChoice = parseChoice(parseInt(e.target.value));
        console.log(e.target.value);
        if(gamestarted===false)
            playGame();
    }
}*/


function playRound(pChoice, cChoice){   //Plays the game rounds based on the player's choice and CPU's choice
    //qlabel.textContent=""; //removes the previous description
    if(pChoice===cChoice){
        displayDesc("That's a tie\n");

    }else if(calcLoser(pChoice,cChoice)){ //checks if the player is in a losing state
        displayDesc("Ouch!\n");
        computerScore++;
    }else{                               //checks if the CPU is in a losing state
        displayDesc("Nice!\n");
        humanScore++;
    }
    displayDesc(`CPU played ${cChoice}!`,true);
    //updating the scores on the interface
    updateScores();
}


function displayDesc(string, add=false){ //replaces the "question" on text with another description of the turn
    if(add) (qlabel.textContent+=string);
    else qlabel.textContent=string;
}

function calcLoser(pChoice,cChoice){    //Checks the 3 cases of winning for each choice
    return (pChoice==="🪨" && cChoice==="📜"
        || pChoice==="📜" && cChoice==="✂️" 
        || pChoice==="✂️" && cChoice==="🪨")
}

function updateScores(){
    scoreslabel.textContent = `${humanScore} : ${computerScore}`;
}

async function playGame(){
    gamestarted=true;
    while(gamestarted){
        displayDesc("Choose...");
        popupdiv.classList.add("popup");
        popupdiv.classList.remove("visisble");
        //stops the game after 5 rounds are over
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
        displayDesc("Play again?")
        updateScores();
 
        popupdiv.classList.add("visible");
        popupdiv.classList.remove("popup");
        gamestarted=false
        await waitForInput();
        rounds=5

        humanScore=0;
        computerScore=0;
        updateScores();
    }

}

function compareScores(){
    let highest
    if(humanScore>computerScore){
        popupdiv.firstChild.textContent="You win";
        highest=humanScore;
    }else if(humanScore<computerScore){
        popupdiv.firstChild.textContent="CPU wins";
        highest=computerScore;
    }else{
        popupdiv.firstChild.textContent="It's a tie!";
        highest=humanScore;
    }
    popupdiv.firstChild.textContent+=` 
        with a score of ${highest}!`;
}

playGame();



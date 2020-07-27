document.addEventListener('DOMContentLoaded', () => {
    const panel = document.querySelector('.panel');
    let width = 10;
    let board = [];
    let numberOfMines = 20;
    let numberOfFlags = 0;
    let gameEnd = false;
    let Mines = Array(numberOfMines).fill('mine');
    let emptyArray = Array(width * width - numberOfMines).fill('safe');
    let gameArray = emptyArray.concat(Mines);
    let shuffle = gameArray.sort(() => Math.random() - 0.5);

    newGame();

    

    //document.querySelector(".annoying-pop-up").style.display = "block";


    function createBoard(){
        
    

        for(let i=0; i<width * width; i++){
            const box = document.createElement('div')
            box.setAttribute('id', i);
            box.classList.add(shuffle[i]);
            panel.appendChild(box);
            board.push(box);
            
            //event listener

            box.addEventListener('click', function(event){
                
                click(box);
            })

            //control left click
            box.oncontextmenu = function(event){
                event.preventDefault();
                addFlag(box);
            }

        }


    //add numbers

    for(let i=0; i < board.length; i++){
        let total = 0;
        const leftEdge = i % width === 0;
        const rightEdge = i % width === width - 1;
        
        if(board[i].classList.contains('safe')){
            
            if(i > 0 && !leftEdge && board[i - 1].classList.contains('mine')) total++;
            if(i > 9 && !rightEdge && board[i + 1 - width].classList.contains('mine')) total++;
            if(i > 10 && board[i - width].classList.contains('mine')) total++;
            if(i > 11 && !leftEdge && board[i - 1 - width].classList.contains('mine')) total++;
            if(i < 98 && !rightEdge && board[i + 1].classList.contains('mine')) total++;
            if(i < 90 && !leftEdge && board[i - 1 + width].classList.contains('mine')) total++;
            if(i < 88 && !rightEdge && board[i + 1 + width].classList.contains('mine')) total++;
            if(i < 89 && board[i + width].classList.contains('mine')) total++;


            board[i].setAttribute('data', total);
            

        }
    }
}


    //click function

    function click(box){
        let cid = box.id;
        if(gameEnd) return;
        if(box.classList.contains('clicked') || box.classList.contains('flag')) return;
        if(box.classList.contains('mine')){
            gameOver(box);
        } else{
            let total = box.getAttribute('data');

            if(total != 0){
                box.classList.add('clicked');
                 if (total == 1) box.classList.add('one');
                 if (total == 2) box.classList.add('two');
                 if (total == 3) box.classList.add('three');
                 if (total == 4) box.classList.add('four');
                box.innerHTML = total;
                return;
            }
            
            checkbox(box, cid);
   
        }
        box.classList.add('clicked');

    }


    function checkbox(box, cid){
        const leftEdge = (cid % width === 0);
        const rightEdge = (cid % width === width - 1);

        setTimeout(() => {
            
            if(cid > 0 && !leftEdge){
                const nid = board[parseInt(cid) - 1].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
            if(cid > 9 && !rightEdge){
                const nid = board[parseInt(cid) + 1 - width].id;
                const newbox = document.getElementById(nid);

                click(newbox);
            }

            if(cid > 10){
                const nid = board[parseInt(cid - width)].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
            if(cid > 11 && !leftEdge){
                const nid = board[parseInt(cid) - 1 - width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
            if(cid < 98 && !rightEdge){
                const nid = board[parseInt(cid) + 1].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }

            if(cid < 90 && !leftEdge){
                const nid = board[parseInt(cid) - 1 + width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }

            if(cid < 88 && !rightEdge){
                const nid = board[parseInt(cid) + 1 + width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }

            if(cid < 89){
                const nid = board[parseInt(cid) + width].id;
                const newbox = document.getElementById(nid);
                click(newbox);
            }
        
        }, 50);

    }

    function gameOver(box){
        gameEnd = true;
    
    board.forEach(box => {
        if(box.classList.contains('mine')){
            box.style.backgroundColor = "#be3144";
            box.style.padding = "3px 0 0 4px";
            box.innerHTML = "<img src='Images/bomb.png'/>";
            box.classList.remove('mine');
            box.classList.add('clicked');
                        
        }
        document.getElementById("status").innerHTML = "Game Over!";
        document.querySelector(".pop-up").style.display = "block";
        document.querySelector(".pop-up").style.backgroundColor = "#222629";


    })

    
}    



function checkWin(){
    let matches = 0;

    for(let i=0 ;i<board.length; i++){
        if(board[i].classList.contains('flag') && board[i].classList.contains('mine')){
            matches++;
        }
        if(matches === numberOfMines){
            document.getElementById("status").innerHTML = "You Won!";
            document.querySelector(".pop-up").style.display = "block";
            document.querySelector(".pop-up").style.backgroundColor = "#1a73e8";
            gameEnd = true;

        }
    }
}

function newGame(){

        //const panel =  document.querySelector('.panel');
        panel.innerHTML = '';
        gameEnd = false;
        shuffle = gameArray.sort(() => Math.random() - 0.5);
        board  = [];
        numberOfFlags = 0;
        document.getElementById('flags').innerHTML = 20;
        createBoard();
        
        
    }

    function addFlag(box){
        
        if(gameEnd) return;


            if(!box.classList.contains('clicked') && (numberOfFlags < numberOfMines)){

                if(!box.classList.contains('flag')){
                    box.classList.add('flag');
                    box.style.padding = "5px 0 0 4px";
                    box.innerHTML = "<img src='Images/flag.png'/>";
                   // box.style.backgroundColor = "green";
                    //box.innerHTML = 'F';
                    numberOfFlags++;
                    document.getElementById('flags').innerHTML = numberOfMines - numberOfFlags;
                    checkWin();

                }else{
                    box.classList.remove('flag');
                   // box.style.backgroundColor = '#b4b4b4';
                    box.style.padding = "8px";
                    box.innerHTML = '';
                    numberOfFlags--;
                    document.getElementById('flags').innerHTML = numberOfMines - numberOfFlags;

                }


            }
        }

         document.querySelector('.reset').addEventListener('click', function(){

            document.querySelector(".pop-up").style.display = "none";
            newGame();
        
    });

       document.getElementById("close").onclick = function(){

            document.querySelector(".pop-up").style.display = "none";

       }

    var down = {};
    $(document).keydown(function(e) {
        down[e.keyCode] = true;
    }).keyup(function(e) {
        if (down[67] && down[72] && down[84]) {
            board.forEach(box =>{
                if(box.classList.contains('mine')){

                    box.style.backgroundColor = "#be3144";

                }
            })
        }
        down[e.keyCode] = false;
    })


    document.getElementById("close-this").onclick = function(){

        document.querySelector(".annoying-pop-up").style.display = "none";

   }



document.getElementById('save').onclick = function(){
    if(!gameEnd){
        saveGame();
    }else{
        document.getElementById("status").innerHTML = "Cannot save if the game is over!";
        document.querySelector(".pop-up").style.display = "block";
    }

}

document.getElementById('recreate').onclick = function(){
    
     rec();
     
     }



function rec(){
    const g = localStorage.getItem('saveFile');
    const obj = JSON.parse(g);
    // for(let i=0; i<g.length; i++){
    //     console.log(g[i]);
    // }
    board = []
    panel.innerHTML = '';
    console.log(obj);
    Mines = obj.mine_array;
    emptyArray = obj.empty_Array;
    gameArray = obj.game_Array;
    shuffle = obj.shuffle_;
  //  board = obj.board_;
    console.log(board);
    createBoard();
    //Mines = JSON.parse(g.mine_array);

    //console.log(Mines);
    

}

function saveGame(){

    let gameData = {
            mine_array: Mines,
            empty_Array: emptyArray,
            game_Array: gameArray,
            shuffle_:shuffle
    }

    localStorage.setItem('saveFile', JSON.stringify(gameData));


}






})
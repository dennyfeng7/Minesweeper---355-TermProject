document.addEventListener('DOMContentLoaded', () => {
    const panel = document.querySelector('.panel');
    let width = 10;
    let board = [];
    let numberOfMines = 20;
    let numberOfFlags = 0;
    let gameEnd = false;

    newGame();

    function createBoard(){
 
        const Mines = Array(numberOfMines).fill('mine');

        const emptyArray = Array(width * width - numberOfMines).fill('safe');
        
        const gameArray = emptyArray.concat(Mines);

        const shuffle = gameArray.sort(() => Math.random() - 0.5);

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



    //createBoard();


    //click function

    function click(box){
        let cid = box.id;
        if(gameEnd) return;
        if(box.classList.contains('clicked') || box.classList.contains('flag')) return;
        if(box.classList.contains('mine')){
            console.log('Game over');
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
       // console.log("game over");
        gameEnd = true;
    
    board.forEach(box => {
        if(box.classList.contains('mine')){
            box.style.backgroundColor = "#be3144";
            box.style.padding = "3px 0 0 4px";
            box.innerHTML = "<img src='https://img.icons8.com/windows/32/000000/bomb-with-burning-wick.png'/>";
            box.classList.remove('mine');
            box.classList.add('clicked');
                        
        }
    })

    
}    



function checkWin(){
    let matches = 0;

    for(let i=0 ;i<board.length; i++){
        if(board[i].classList.contains('flag') && board[i].classList.contains('mine')){
            matches++;
        }
        if(matches === numberOfMines){
            console.log('You win');
            gameEnd = true;

        }
    }
}

function newGame(){

        const panel =  document.querySelector('.panel');
        panel.innerHTML = '';
        gameEnd = false;
        board  = [];
        numberOfFlags = 0;
        createBoard();
        
        
    }

    function addFlag(box){
        
        if(gameEnd) return;


            if(!box.classList.contains('clicked') && (numberOfFlags < numberOfMines)){

                if(!box.classList.contains('flag')){
                    box.classList.add('flag');
                    box.style.padding = "5px 0 0 4px";
                    box.innerHTML = "<img src='https://img.icons8.com/metro/26/000000/empty-flag.png'/>";
                   // box.style.backgroundColor = "green";
                    //box.innerHTML = 'F';
                    numberOfFlags++;
                    checkWin();

                }else{
                    box.classList.remove('flag');
                   // box.style.backgroundColor = '#b4b4b4';
                    box.innerHTML = '';
                    numberOfFlags--;
                }

                console.log('number of flags: '  + numberOfFlags);

            }
        }

         document.querySelector('.reset').addEventListener('click', function(){
        
        newGame();
        
    });

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

    console.log(board)


})
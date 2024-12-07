$(document).ready( function(){

    let player_one = 'X';
    let player_two = 'O';
    let current_player = player_one;
    let board = ['','','','','','','','',''];
    let IsgameFinished = false;
    const cells = $(".cell");
    let winMessage = $("#statusResult");
    cells.on("click" , function(){
        const cellIndex = $(this).data("cell"); 
        if( board[cellIndex] === '' && !IsgameFinished ){
             
            board[cellIndex] = current_player; 

            updateCell($(this) , current_player );

            
            if( checkWin(current_player) ){
                handleWin(current_player);
            }
             if (checkDraw()) {
                 handleDraw();
            }
            else{
               handleSwitch();
               if( current_player === player_two ){
                setTimeout(makeComputerMove , 500 );
               }
            }
        }
    });

    function makeComputerMove(){
        const empty_cell_list = [];
        for( const i = 0 ; i < board.length ; ++i ){
            if( board[i] === ''){
                empty_cell_list.push(i);
            }
        }

        const randomIndex = Math.floor( Math.random() * empty_cell_list.length );
        const computerMoveIndex = empty_cell_list[randomIndex];
        board[computerMoveIndex] = player_two;
        updateCell($(`.cell[data-cell='${computerMoveIndex}']`), player_two);

        if( checkWin(player_two )){
            handleWin(player_two);
        }
        else if( checkDraw()){
            handleDraw();
        }
        else{
            handleSwitch();
        }
    }

    function updateCell( cell , player){
        setTimeout( () => {
            cell.text(player).addClass("player-symbol");
        },100);
    }

    function handleSwitch(){
        current_player = (current_player === player_one) ? player_two : player_one; 
    }

    function handleDraw(){
        winMessage.text("It is a draw!").hide().fadeIn("slow");
        IsgameFinished = true;
    }

    function handleWin(current_player){
        const winningCombination = getWinningCombinations(current_player);
        highlightWinningCells(winningCombination);
        IsgameFinished = true;
        winMessage.text(`Player ${current_player} Wins!🏆`).hide().fadeIn("slow");
    }

    function highlightWinningCells(winningCombination) {
        winningCombination.forEach(index => {
            $(`.cell[data-cell='${index}']`).addClass("winning-cell");
        });
    }
    
    function getWinningCombinations(player){
        let winningConditions = [
            [0 , 1 , 2], [3, 4 , 5] , [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8] , 
            [0, 4, 8], [2, 4, 6] 
            ];
            
            

                for( let i = 0 ; i < winningConditions.length ; ++i ){
                    if( winningConditions[i].every( index => board[index] == player )){
                        return winningConditions[i];
                    }
                }
                return null;
        }

        
    $("#resetBtn").on("click" ,() => {
        cells.empty();
        winMessage.empty();
        board = ['','','','','','','','',''];
        current_player = 'X';
        cells.removeClass("winning-cell");
        IsgameFinished = false;
    });
        function checkWin(player){
        let winningConditions = [
            [ 0 , 1 , 2 ], [ 3 , 4 , 5 ] , [ 6, 7, 8] , 
            [0, 3, 6], [1, 4, 7], [2, 5, 8] , 
            [0, 4, 8], [2, 4, 6] 
            ];
  
            for( let condition of winningConditions ){
                if( condition.every( index => board[index] === player )){
                    return true;
                }
            }
            return false;
    }
    
    function checkDraw(){
        return board.every( cell => cell !== '');
    } 
  });
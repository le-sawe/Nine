var player ;
var player_1_score;
var player_2_score;
//initialize the board
var board=[];// 0 mean clickable square , 1 mean smile square
var board_height;
var board_width ;
var row =[]; 
var the_board = document.getElementById('board');
var player_1_score_indicator = document.getElementById('player_1_indicator');
var player_2_score_indicator = document.getElementById('player_2_indicator');
var player_turn_indicator = document.getElementById('player_turn')

//start board function
function start_board(status){
    player =1;
    player_1_score=0;
    player_2_score=0;
    board=[];
    if (status !=2){        
        board_height= 12;
        board_width = 9;
    }
    if (status==1){
        do{
            board_height = prompt("Please enter board height:", 12);
            board_width = prompt("Please enter board width:", 9);
            }while((board_height > 100 || board_height <12) || (board_width > 100 || board_width <9) );//make sure that the game will not crash
    }
    for(var i=0;i<board_height;i++){
        row =[];
        for(var j=0;j<board_width;j++){row.push(0);}
        board.push(row);      
    }

    refresh();
}

// refresh function
function refresh(){
    player_turn_indicator.innerHTML=player;
    //refresh the score
    player_1_score_indicator.innerHTML = player_1_score;
    player_2_score_indicator.innerHTML = player_2_score;
    // refresh the board
    the_board.innerHTML='';
    for(var j=0;j<board_height;j++){
        the_board.innerHTML +="<div id ='row"+j+"'class='row'></div>";
        var the_row = document.getElementById("row"+j);
        for(var i=0;i<board_width;i++){
            var square_class="";
            if(board[j][i]==0)square_class="closed_square";
            if(board[j][i]==1)square_class="smile_square";
            the_row.innerHTML += "<button id ='row"+j+"col"+i+"' class='"+square_class+"' onclick='put_smile(" + j + "," + i + ");' ></button>";//print cell
        }
    }
    
}
// put a smile face
function put_smile(y,x){
    if(board[y][x] !=1){
        board[y][x]=1;
        var collected_socre =smile_align_finder(y,x);
        if(collected_socre > 0)add_score(collected_socre);else switch_player();
    }
    else alert("-_- can you click an empty square ?")
    refresh();
    
}

//switch player function
function switch_player(){
    if (player==1)player=2;else player=1;
}
// add score function
function add_score(score){
    if(player==1)player_1_score += score;
    if(player==2)player_2_score += score;
}
function smile_align_finder(y,x){
    //check left
    var left=0;
    for(var i=x-1;i>-1;i--){
        if(board[y][i] ==0)break;
        else left++;
    }
    //check right
    var right =0;
    for(var i=x+1;i<board_width;i++){
        if(board[y][i] ==0)break;
        else right++;
    }
    //check top
    var top=0;
    for(var j=y+1;j<board_width;j++){
        if(board[j][x] ==0)break;
        else top++;
    }
    // check bottom
    var bottom=0;
    for(var j=y-1;j<board_width;j--){
        if(board[j][x] ==0)break;
        else bottom++;
    }    
    var horizontal_align = right + left +1;
    var vertical_align = bottom + top +1;
    if(!(vertical_align ==3 ||vertical_align ==6 ||vertical_align ==9 ||vertical_align ==12))vertical_align=0;
    if(!(horizontal_align ==3 ||horizontal_align ==6 ||horizontal_align ==9 ||horizontal_align ==12))horizontal_align=0;
    return horizontal_align+vertical_align;
}
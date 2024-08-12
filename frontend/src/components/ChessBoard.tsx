import { MOVE } from "../extras/types";

export default function ChessBoard({board,from,setFrom,socket,color}){
    
    function handleClick(i:number, j:number){
        const piece = board[i][j];
        if(from==null && (!piece || piece.color !== color)) return;

        const square = String.fromCharCode(97 + j) + (8 - i);
        if(from === null) setFrom(square);
        else{
            const moveStr = from + square;
            const move = {type: MOVE, move: moveStr};

            if(socket){
                console.log('Data sent to webSocket:',move);
                socket.send(JSON.stringify(move));
            }

            setFrom(null);
        }
    }

    return (
        <div className={color==='b' ? 'rotate-180' : ''}>
            <div id="board" className="grid grid-cols-8 grid-rows-8">
                {
                    board.map((row, i) => 
                        row.map((item, j) => 
                            <div 
                                key={`${i}${j}`} 
                                onClick={() => handleClick(i,j)}  
                                className={`h-[35px] w-[35px] sm:h-[50px] sm:w-[50px] center text-xl md:text-2xl font-semibold ${(i + j) % 2 == 0 ? 'bg-[#ebecd0]' : 'bg-[#779556]'} ${color === 'b' ? 'rotate-180' : ''}`}>{item ? item.type : ''}{item && item.color==='b' ? 'b' : ''}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}
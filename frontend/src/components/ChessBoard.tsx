import { MOVE } from "../extras/types";
import kb from '../assets/pieces/kb.svg';
import kw from '../assets/pieces/kw.svg';
import qb from '../assets/pieces/qb.svg';
import qw from '../assets/pieces/qw.svg';
import bb from '../assets/pieces/bb.svg';
import bw from '../assets/pieces/bw.svg';
import nb from '../assets/pieces/nb.svg';
import nw from '../assets/pieces/nw.svg';
import rb from '../assets/pieces/rb.svg';
import rw from '../assets/pieces/rw.svg';
import pw from '../assets/pieces/pw.svg';
import pb from '../assets/pieces/pb.svg';

const pieceSVGs = {
    kw, kb, qw, qb, rw, rb, bw, bb, nb, nw, pw, pb
};

export default function ChessBoard({board, from, setFrom, socket, color}) {
    function handleClick(i, j) {
        const piece = board[i][j];
        if(from == null && (!piece || piece.color !== color)) return;

        const square = String.fromCharCode(97 + j) + (8 - i);
        if(from === null) setFrom(square);
        else {
            const moveStr = from + square;
            const move = { type: MOVE, move: moveStr };

            if(socket) {
                console.log('Data sent to webSocket:', move);
                socket.send(JSON.stringify(move));
            }

            setFrom(null);
        }
    }

    return (
        <div className={color === 'b' ? 'rotate-180' : ''}>
            <div id="board" className="grid grid-cols-8 grid-rows-8">
                {
                    board.map((row, i) => 
                        row.map((item, j) => 
                            <div 
                                key={`${i}${j}`} 
                                onClick={() => handleClick(i, j)}  
                                className={`h-[35px] w-[35px] sm:h-[50px] sm:w-[50px] center text-xl md:text-2xl font-semibold ${(i + j) % 2 === 0 ? 'bg-[#ebecd0]' : 'bg-[#779556]'} ${color === 'b' ? 'rotate-180' : ''}`}>
                                {item ? <img src={pieceSVGs[item.type+item.color]} alt={item.type} className={`w-full h-full`} /> : ''}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

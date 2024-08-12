import { Chess } from 'chess.js'
import { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { MOVE, PLAY, WAIT } from '../extras/types';
import ChessBoard from '../components/ChessBoard';


function Play() {
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board());
    const [from, setFrom] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const [color, setColor] = useState<string>('w');
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(()=>{
        if(socket === null) return;
        socket.onmessage = (event: MessageEvent) => {
            const pD = JSON.parse(event.data); //parsedData
            
            if(pD.type === WAIT){
                console.log('Waiting for Opponent');
                setLoader(true);
            }
            else if(pD.type === PLAY){
                console.log('Game Started Your color is ',pD.color);
                setLoader(false);
                setDisabled(true);
                if(pD.color==='b') setColor('b');
            }
            else if(pD.type === MOVE){
                console.log('Move:',pD.fen);
                const nchess = new Chess();
                nchess.load(pD.fen);
                setChess(nchess);
                setBoard(nchess.board());
            }
        }

        return () => {
            socket.onmessage = null;
            if(socket) socket.close();
        }
    },[socket]);

    function startGame(){
        setLoader(true);
        if(socket){
            socket.send(JSON.stringify({type:PLAY}));
        }
    }

    return (
        <div className="w-screen h-screen bg-zinc-900 flex flex-col md:flex-row gap-8 md:gap-32 p-4 justify-center items-center select-none relative">
            {loader && (
                <div className="absolute w-full h-full bg-zinc-900 text-white text-4xl center">
                    Waiting for Opponent.....
                </div>
            )}

            <ChessBoard board={board} from={from} setFrom={setFrom} socket={socket} color={color}/>

            <button 
                disabled={disabled} 
                onClick={startGame} 
                className='bg-green-500 text-white p-4 rounded-md text-xl font-bold disabled:bg-gray-500'
            >
                {disabled ? 'Game Running' : 'Start Game'}
            </button>
        </div>
    )
}

export default Play;

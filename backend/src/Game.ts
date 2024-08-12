import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAMEOVER, MOVE, PLAY } from "./Type";

class Game{
    player1 : WebSocket;
    player2 : WebSocket;
    chess : Chess;

    constructor(player1: WebSocket, player2: WebSocket, chess: Chess){
        this.player1 = player1;
        this.player2 = player2;
        this.chess = chess;

        this.player1.send(JSON.stringify({type:PLAY, color:'w'}));
        this.player2.send(JSON.stringify({type:PLAY, color:'b'}));
    }

    makeMove(socket: WebSocket, message: string){
        // is this valid user move
        // if this valid move
        if(this.chess.turn() === 'w' && socket !== this.player1) return;
        if(this.chess.turn() === 'b' && socket !== this.player2) return;

        console.log('Move:',message);

        //if yes , update board -> send to both players
        try{
            let result = this.chess.move(message);
            if(result){
                let res = JSON.stringify({type:MOVE, fen:this.chess.fen()});
                this.player1.send(res);
                this.player2.send(res);
            }
        }
        catch(e){
            console.log('Invalid move:', e);
        }

        // check if game is over -> send to both players
        if(this.chess.isGameOver()){
            let res = JSON.stringify({type:GAMEOVER, result:this.chess.isCheckmate() ? 'checkmate' : 'draw'});
            this.player1.send(res);
            this.player2.send(res);
        }
    }
}

export default Game;
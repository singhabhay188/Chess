import { WebSocket } from "ws";
import Game from "./Game";
import { Chess } from 'chess.js'
import { MOVE, PLAY, WAIT } from "./Type";

class GameManager{
    games: Game[];
    pendingPlayer: WebSocket | null;

    constructor(){
        this.games = [];
        this.pendingPlayer = null;
    }

    connectPlayer(socket: WebSocket){
        socket.on('message',(data: string)=>{
            let message = JSON.parse(data);

            if(message.type === PLAY){
                this.addPlayer(socket);
            }
        })
    }

    addPlayer(socket: WebSocket){
        if(this.pendingPlayer === null){
            this.pendingPlayer = socket;
            let response = { type: WAIT, response: 'Waiting for an opponent .......' };
            socket.send(JSON.stringify(response));
        }
        else{
            this.startGame(this.pendingPlayer, socket);
            this.pendingPlayer = null;
        }
    }

    startGame(player1: WebSocket, player2: WebSocket){
        let chess = new Chess();
        let newGame:Game = new Game(player1,player2,chess);
        this.games.push(newGame);

        const handleMove = (player: WebSocket, data: string) => {
            try {
                const message = JSON.parse(data);
                console.log('Data received from webSocket:',message);
                if (message.type === MOVE) {
                    newGame.makeMove(player,message.move);
                }
            } catch (e) {
                console.error('Error processing message:', e);
            }
        }

        player1.on('message', (data: string) => handleMove(player1, data));
        player2.on('message', (data: string) => handleMove(player2, data));
    }

    removePlayer(socket: WebSocket){
        if(this.pendingPlayer === socket){
            this.pendingPlayer = null;
        }
        else{
            let targetGame = this.games.find(game => game.player1 === socket || game.player2 === socket);
            this.games = this.games.filter(game => game !== targetGame);

            // close the targetGame
        }
    }
}

export default GameManager;
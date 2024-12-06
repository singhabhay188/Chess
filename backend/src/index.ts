import { WebSocketServer } from 'ws';
import GameManager from './GameManager';
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    GameManager.getInstance().connectPlayer(ws);
    ws.on('close', ()=> GameManager.getInstance().removePlayer(ws));
});

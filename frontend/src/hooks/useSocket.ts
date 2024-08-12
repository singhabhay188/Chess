import { useEffect, useState } from "react"

const URL = 'ws://localhost:8080';

const useSocket = () => {
    let [socket,setSocket] = useState<WebSocket | null>(null);
    
    useEffect(()=>{
        const ws = new WebSocket(URL);

        ws.onopen = () => {
            console.log('Connected to Server');
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log('Disconnected from Server');
            setSocket(null);
        }

        return () => {
            ws.close();
        }
    },[]);

    return socket;
}

export default useSocket;
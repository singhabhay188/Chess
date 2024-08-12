import { Link } from 'react-router-dom';
import chess from '../assets/chess.gif';
import pawn from '../assets/pawn.webp';

function Home() {

  return (
    <div className="w-screen relative h-screen bg-zinc-900 flex flex-col items-center md:flex-row p-6 sm:p-8 gap-[5vw]">
      <div>
        <img src={chess} alt="Chess Board" title="Chess Board" className="max-w-[450px] md:max-w-[500px] w-full" />
      </div>
      <div className="flex flex-col gap-5 items-center">
        <p className="text-white text-3xl text-center max-w-[350px] md:text-4xl">
          Play Chess Online on Number #1 Website
        </p>
        <Link
          className="text-white bg-[#749654] p-3 sm:px-6 rounded-lg font-bold flex items-center cursor-pointer"
          title="Play Online" to={'/play'}
        >
          <div>
            <img src={pawn} alt="Pawn" className="h-16" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl text-center">Play Online</h1>
            <p className="text-center">Play with someone at your Level</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;

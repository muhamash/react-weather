// import React from 'react'
import Header from './header/Header';
import Board from './weather/Board';

export default function Root() {
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover">
      <Header />
      <main>
        {/* <FavModal/> */ }
        {/* <AddFav/> */ }
        <Board />
      </main>
    </div>
  );
}

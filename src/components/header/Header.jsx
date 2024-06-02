import React from 'react'
import Fav from './Fav'
import FavModal from './FavModal'
import Logo from './Logo'
import Search from './Search'

export default function Header() {
  const [show, setShow] = React.useState(false);

  const handleClick = () => {
    setShow(!show);
  }

  return (
    <header className="w-full top-0 bg-gradient-to-b from-black/60 to-black/0 pb-10">
      <nav className="container flex items-center justify-between py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Search />
          <div className="relative">
            <Fav onShow={handleClick} />
            {show && <FavModal onShow={handleClick} />}
          </div>
        </div>
      </nav>
    </header>
  );
}
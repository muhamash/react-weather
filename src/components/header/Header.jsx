import React, { useEffect, useRef } from 'react';
import Fav from './Fav';
import FavModal from './FavModal';
import Logo from './Logo';
import Search from './Search';

export default function Header() {
  const [show, setShow] = React.useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/60 to-black/0 pb-10">
      <nav className="container flex items-center justify-between py-6">
        <Logo />

        <div className="flex items-center gap-4 relative">
          <Search />
          <Fav onShow={() => setShow(!show)} />
          {show && <FavModal ref={modalRef} />}
        </div>
      </nav>
    </header>
  );
}

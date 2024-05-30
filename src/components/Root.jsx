// import React from 'react'
import FavModal from './header/FavModal'
import Header from './header/Header'

export default function Root() {
  return (
    <div className="grid place-items-center h-screen bg-no-repeat bg-cover">
          <Header />
          <main>
              <FavModal/>
          </main>
    </div>
  )
}

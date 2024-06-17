import { Suspense, useState } from 'react'

import './App.css'
import Scene from './components/Scene'
import Labels from './components/Labels'

function App() {

  return (
    <>
     <div className="scene-container">
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </div>
    <Labels />
    </>
  
  )
}

export default App

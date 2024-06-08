import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Body from './component/body'
import Footer from './component/Footer'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App

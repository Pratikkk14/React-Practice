import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [color, setColor ] = useState("gray")

  return (
    <>
      <div
        className={` h-screen flex items-center justify-center bg-${color}-500`}
      >
        <div className=" p-6 rounded-lgflex flex-col">
          <div className="bg-orange-700 text-white text-3xl font-bold px-6 py-4 rounded text-center mb-4 relative">
            Test
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card username="Pratik" btntxt="Click Here" />
            <Card username="Pranav" />
          </div>
          <div className="bg-white gap-3 rounded-lg px-4 py-4 mt-4 flex items-center justify-center flex-wrap">
            <button
              onClick={() => setColor("orange")}
              className="bg-orange-500 text-white px-4 py-2 rounded-4xl "
            >
              Orange
            </button>
            <button
              onClick={() => setColor("purple")}
              className="bg-purple-500 text-white px-4 py-2 rounded-4xl "
            >
              Purple
            </button>
            <button
              onClick={() => setColor("pink")}
              className="bg-pink-500 text-white px-4 py-2 rounded-4xl "
            >
              Pink
            </button>
            <button onClick={ ()=> setColor("gray")} className='bg-gray-600 text-white px-4 py-2 rounded-4xl'>
              Gray
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App

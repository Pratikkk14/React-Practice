import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(() => { 
    let charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (number) {
      charSet += '0123456789';
    }
    if (symbol) {
      charSet += '!@#$%^&*_+~}{[]:;?><,./-=';
    }

    let generatedPassword = '';
    for (let index = 0; index < length; index++) {
      const element = charSet.charAt(Math.floor(Math.random() * charSet.length));
      generatedPassword += element;
    }
    setPassword(generatedPassword);
  }, [length, number, symbol]);


  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
   }

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit,length,number,symbol]);

  const passwordRef = useRef(null);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg bg-gray-500 px-4 py-2 my-8">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="bg-gray-300 rounded-l-xl w-full outline-none selection:bg-blue-200 selection:text-blue-400 py-1 px-3 "
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-800 hover:cursor-pointer rounded-r-xl px-3 py-0.5"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-x-1">
            <input
              type="checkbox"
              className='text-xs'
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev);
              }} />
            <label className='gap-x-1'>Numbers</label>
            <input
              type="checkbox"
              className='text-xs'
              defaultChecked={symbol}
              onChange={() => {
                setSymbol((prev) => !prev);
              }} />
            <label className='gap-x-1'>Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App

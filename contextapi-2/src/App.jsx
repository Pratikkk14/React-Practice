import { useState, useEffect } from 'react'
import Card from './components/Card'
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {
  const [themeMode, setThemeMode] = useState('light')

  const lightTheme = () => {
    setThemeMode('light')
  }

  const darkTheme = () => {
    setThemeMode('dark')
  }

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", themeMode);
    html.classList.remove("light", "dark");
    html.classList.add(themeMode);
  }, [themeMode])
  
  return (
    <ThemeContextProvider value={{ lightTheme, darkTheme, themeMode }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <h1 className="text-3xl font-bold underline mt-5 p-5 text-base-content">
          Context API - 2
        </h1>
        <div className="border-2 border-base-300 rounded-lg p-8 bg-base-100">
          <Card />
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default App

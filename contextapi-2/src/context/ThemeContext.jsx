import React from 'react';
import { createContext, useContext, } from 'react';

const ThemeContext = createContext({
    themeMode:("light"),
    lightTheme: () => { },
    darkTheme: () => { }
});

export const ThemeContextProvider = ThemeContext.Provider;


//custom hook for exporting context
const useTheme = () => useContext(ThemeContext);

export default useTheme;
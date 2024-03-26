"use client"
import { createContext, useState, useContext } from "react";

// Step 1: Create a new context
const ColorContext = createContext();

export const useColorContext = () => {
  return useContext(ColorContext);
};

// Step 2: Create a provider component
export const ColorProvider = ({ children }) => {
  // State for colors
  const [colors, setColors] = useState({colors: [
    {r:255, g:255, b:255},
    {r:255, g:255, b:255},
    {r:255, g:255, b:255},
    {r:255, g:255, b:255},
  ]});

  const [luminosity, setLuminosity] = useState(100);

  // Step 3: Pass state and any necessary functions as values to the context provider
  const value = {
    colors,
    setColors,
    luminosity,
    setLuminosity,
  };

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

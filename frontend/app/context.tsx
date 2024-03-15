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
  const [colors, setColors] = useState([]);

  // Step 3: Pass state and any necessary functions as values to the context provider
  const value = {
    colors,
    setColors,
  };

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

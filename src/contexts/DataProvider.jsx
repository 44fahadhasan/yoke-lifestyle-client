"use client";
import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  //   common state of pagination
  const [activePageNumber, setActivePageNumber] = useState(0);
  const [totalPageNumber, setTotalPageNumber] = useState(0);

  // categories state
  const [totalCategorieNumber, setTotalCategorieNumber] = useState(0);
  const [parPageCategorie, setParPageCategorie] = useState(6);

  const data = {
    activePageNumber,
    setActivePageNumber,
    totalPageNumber,
    setTotalPageNumber,
    totalCategorieNumber,
    setTotalCategorieNumber,
    parPageCategorie,
    setParPageCategorie,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;

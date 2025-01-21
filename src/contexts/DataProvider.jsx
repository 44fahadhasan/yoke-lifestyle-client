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

  // tags state
  const [totalTagNumber, setTotalTagNumber] = useState(0);
  const [parPageTag, setParPageTag] = useState(6);

  // attributes state
  const [totalAttributeNumber, setTotalAttributeNumber] = useState(0);
  const [parPageAttribute, setParPageAttribute] = useState(6);

  const data = {
    activePageNumber,
    setActivePageNumber,
    totalPageNumber,
    setTotalPageNumber,
    totalCategorieNumber,
    setTotalCategorieNumber,
    parPageCategorie,
    setParPageCategorie,
    totalTagNumber,
    setTotalTagNumber,
    parPageTag,
    setParPageTag,
    totalAttributeNumber,
    setTotalAttributeNumber,
    parPageAttribute,
    setParPageAttribute,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;

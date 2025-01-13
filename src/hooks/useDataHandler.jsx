"use client";
import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";

const useDataHandler = () => {
  return useContext(DataContext);
};

export default useDataHandler;

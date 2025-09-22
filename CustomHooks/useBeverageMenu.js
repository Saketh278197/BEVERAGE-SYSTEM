import { useEffect, useState } from "react";
import data from "../utils/Api";

const useBeverageMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(data);
    if (!response.ok) {
    }
    const jsonData = await response.json();
    setMenu(jsonData);
  };
  return menu;
};

export default useBeverageMenu;

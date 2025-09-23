import { useEffect, useState } from "react";
import Description from "./Description";
import "../style/beverage_Menu.css";
import useBeverageMenu from "../CustomHooks/useBeverageMenu";
const Menu = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [goodRated, setGoodRated] = useState(" - OFF");
  const [filteredMenu, setFilteredMenu] = useState([]);
  const menu = useBeverageMenu();
  useEffect(() => {
    if (menu.length > 0) {
      setMenuData(menu);
      setFilteredMenu(menu);
    }
  }, [menu]);

  if (menu.length === 0) {
    return (
      <div
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          marginTop: "2rem",
          color: "#555",
          fontWeight: "bold",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Loading menu...
      </div>
    );
  }

  const handleClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  function starRated() {
    if (goodRated === " - ON") {
      setGoodRated(" - OFF");
      setFilteredMenu(menuData);
    } else {
      setGoodRated(" - ON");
      const newMenu = menuData.filter((menu) => menu.starrated === "yes");
      setFilteredMenu(newMenu);
    }
  }

  return (
    <>
      <div className="Menu">
        <div>
          <button className="filter" onClick={starRated}>
            MustTry{goodRated}
          </button>
          <h1>Beverage Menu</h1>
        </div>
        <div id="menu">
          {filteredMenu.map((item) => (
            <div key={item.id}>
              <div className="MenuItem" onClick={() => handleClick(item.id)}>
                <span>{item.name}</span>
                <span>&#11167;</span>
              </div>
              {selectedId === item.id && <Description description={item} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;

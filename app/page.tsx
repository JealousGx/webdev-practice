import React from "react";
import Search from "./components/Search/Search";

export const metadata = {
  title: "World Ranks - Home",
  description: "Created by JealousGx",
};

export default function Home() {
  return (
    <React.Fragment>
      <div className="nav__container">
        <h3>234 countries found!</h3>

        <Search />
      </div>

      {/* Labels */}
      <div className="labels__container">
        <div className="labels__container--label">
          <h3>Country</h3>
        </div>

        <div className="labels__container--label">
          <h3>Population</h3>
        </div>

        <div className="labels__container--label">
          <h3>Area</h3>
        </div>

        <div className="labels__container--label">
          <h3>Gini</h3>
        </div>
        </div>
    </React.Fragment>
  )
}

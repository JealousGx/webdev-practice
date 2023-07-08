"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAllCountries,
  sortCountriesByValue,
} from "./actions/countriesActions";
import Search from "./components/Search/Search";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string | null>("asc");

  const switchSort = () => {
    // If previously, the sort was ascending, then switch to descending then if function is invoked again, switch to null
    if (sort === "asc") {
      setSort("desc");
    } else if (sort === "desc") {
      setSort(null);
    } else {
      setSort("asc");
    }
  };

  useEffect(() => {
    getAllCountries().then((data) => {
      setCountries(sortCountriesByValue(data, "asc", "name"));
    });
  }, []);

  const filterCountries = (keyword: string) => {
    if (keyword.length === 0) {
      getAllCountries().then((data) => {
        setCountries(sortCountriesByValue(data, "asc", "name"));
      });
    }

    setCountries(
      countries.filter(
        (country: any) =>
          country.name.common.toLowerCase().includes(keyword.toLowerCase()) ||
          country.region?.toLowerCase().includes(keyword.toLowerCase()) ||
          country.subregion?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  return (
    <React.Fragment>
      <div className="nav__container">
        <h3>{countries.length} countries found!</h3>

        <Search filterCountries={filterCountries} />
      </div>

      {/* Labels */}
      <div className="labels__container">
        <h3
          onClick={() => {
            setCountries(sortCountriesByValue(countries, sort, "name"));
            switchSort();
          }}
          className="label__name"
        >
          Country
        </h3>

        <h3
          onClick={() => {
            setCountries(sortCountriesByValue(countries, sort, "population"));
            switchSort();
          }}
          className="label__population"
        >
          Population
        </h3>

        <h3
          onClick={() => {
            setCountries(sortCountriesByValue(countries, sort, "area"));
            switchSort();
          }}
          className="label__area"
        >
          Area (km <sup style={{ fontSize: "12px" }}>2</sup>)
        </h3>

        <h3
          onClick={() => {
            setCountries(sortCountriesByValue(countries, sort, "gini"));
            switchSort();
          }}
          className="label__gini"
        >
          Gini
        </h3>
      </div>

      {/* Countries */}
      <div className="countries__container">
        {countries &&
          countries.map((country: any) => (
            <Link
              href={`/country/${country.cca2}`}
              className="country"
              key={country.name.common}
            >
              {country.flags && (
                <Image
                  className="country__flag"
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  width={50}
                  height={38}
                />
              )}

              {country.name && (
                <h3 className="country__name">{country.name.common}</h3>
              )}

              <h3 className="country__population">
                {country.population
                  ? country.population.toLocaleString("en")
                  : 0}
              </h3>

              <h3 className="country__area">
                {country.area ? country.area.toLocaleString("en") : 0}
              </h3>

              <h3 className="country__gini">
                {country.gini
                  ? Object.values(country.gini).toLocaleString()
                  : 0}
              </h3>
            </Link>
          ))}
      </div>
    </React.Fragment>
  );
}

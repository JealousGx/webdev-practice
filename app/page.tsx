"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAllCountries,
  sortCountriesByValue,
} from "./actions/countriesActions";
import Search from "./components/Search/Search";

const PAGE_SIZE = 20;

export default function Home() {
  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sort, setSort] = useState<string | null>("asc");
  const [page, setPage] = useState<number>(1);

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
    setLoading(true);
    getAllCountries()
      .then((data) => {
        const sortedCountries: any = sortCountriesByValue(data, "asc", "name");
        setCountries(sortedCountries.slice(0, PAGE_SIZE));
      })
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        getAllCountries().then((data) => {
          const startIndex = page * PAGE_SIZE;
          const endIndex = startIndex + PAGE_SIZE;
          const sortedCountries: any = sortCountriesByValue(data, sort, "name");
          setCountries([
            ...countries,
            ...sortedCountries.slice(startIndex, endIndex),
          ]);
        });
        setPage(page + 1);
        setLoading(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [countries, page, sort]);

  const filterCountries = (keyword: string) => {
    if (keyword.length === 0) {
      setLoading(true);
      getAllCountries()
        .then((data) => {
          setCountries(sortCountriesByValue(data, "asc", "name"));
        })
        .then(() => setLoading(false));
    }

    setLoading(true);
    setCountries(
      countries.filter(
        (country: any) =>
          country.name.common.toLowerCase().includes(keyword.toLowerCase()) ||
          country.region?.toLowerCase().includes(keyword.toLowerCase()) ||
          country.subregion?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setLoading(false);
  };

  return (
    <React.Fragment>
      <div className="nav__container">
        <h3>{countries.length} countries found!</h3>

        <Search filterCountries={filterCountries} />
      </div>

      {loading && (
        <div className="loading__container">
          <div className="loading__bar"></div>
          <div className="loading__bar"></div>
          <div className="loading__bar"></div>
          <div className="loading__bar"></div>
          <div className="loading__bar"></div>
          <div className="loading__bar"></div>
        </div>
      )}

      {countries.length === 0 && !loading && (
        <div className="no__countries">No countries found.</div>
      )}

      {!loading && (
        <>
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
                setCountries(
                  sortCountriesByValue(countries, sort, "population")
                );
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
                      alt={country.flags.alt || country.name.common}
                      width={50}
                      height={38}
                      priority
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
                    <div className="gini__bar">
                      <div
                        className="gini__bar--fill"
                        style={{
                          width: `${
                            country.gini ? Object.values(country.gini) : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                    {country.gini
                      ? Object.values(country.gini).toLocaleString()
                      : 0}
                    %
                  </h3>
                </Link>
              ))}
          </div>
        </>
      )}
    </React.Fragment>
  );
}

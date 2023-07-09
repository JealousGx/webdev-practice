"use client";

import { getCountryByCode } from "@/actions/countriesActions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import "@/css/Country.css";
import Link from "next/link";

const Country = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [country, setCountry] = useState<any>({});
  const [neighbouringCountries, setNeighbouringCountries] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCountry = async () => {
      if (slug) {
        const countryData = await getCountryByCode(slug as string);
        setCountry(countryData[0]);
        setLoading(false);
      }
    };
    getCountry();
  }, [slug]);

  useEffect(() => {
    const getNeighbourCountries = async () => {
      if (!slug) return null;

      if (!country || !country.borders) return null;

      const countries: any = [];

      await Promise.all(
        country.borders.map(async (borderCountry: any) => {
          const getNeighbourCountry = await getCountryByCode(
            borderCountry as string
          );

          countries.push(getNeighbourCountry[0]);
        })
      );

      setNeighbouringCountries(countries);
    };

    getNeighbourCountries();
  }, [slug, country]);

  if (loading)
    return (
      <div className="loading__container">
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
        <div className="loading__bar"></div>
      </div>
    );

  if (Object.keys(country).length === 0) return <div>Country not found!</div>;

  return (
    <React.Fragment>
      <div className="country__container">
        <div className="flag">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt || country.name.common}
            width={150}
            height={155}
            priority
          />

          <h3>{country.name.common}</h3>

          <span>{country.region}</span>

          <div className="population__area__wrapper">
            <p>
              {country.population.toLocaleString("en")}
              <span>Population</span>
            </p>

            <p>
              {country.area.toLocaleString("en")}
              <span>
                Area (km <sup style={{ fontSize: "12px" }}>2</sup>)
              </span>
            </p>
          </div>
        </div>

        <div className="country__info">
          <h4>Details</h4>

          {country.capital && (
            <p>
              <span>Capital: </span>
              {country.capital[0]}
            </p>
          )}
          {country.subregion && (
            <p>
              <span>Subregion: </span>
              {country.subregion}
            </p>
          )}
          {country.languages && (
            <p>
              <span>Languages: </span>
              {[...Object.values(country.languages)].join(", ")}
            </p>
          )}
          {country.currencies && (
            <p>
              <span>Currencies: </span>
              {Object.values(country.currencies)
                .map((currency: any) => currency.name)
                .join(", ")}
            </p>
          )}
          {country.name.nativeName && (
            <p>
              <span>Native name: </span>
              {Object.values(country.name.nativeName)
                .map((nativeNames: any) => nativeNames.common)
                .join(", ")}
            </p>
          )}
          {country.gini && (
            <p>
              <span>Gini: </span>
              <div className="gini__bar">
                <div
                  className="gini__bar--fill"
                  style={{
                    width: `${country.gini ? Object.values(country.gini) : 0}%`,
                  }}
                ></div>
                <span className="gini__value">
                  {[...Object.values(country.gini)].map((gini: any) => gini)}%
                </span>
              </div>
            </p>
          )}

          {neighbouringCountries.length > 0 && (
            <div className="country__neighbour__countries">
              <h4>Neighbouring Countries</h4>

              <div className="neighbouring_countries_wrapper">
                {neighbouringCountries.map((neighbourCountry: any) => (
                  <Link
                    href={`/country/${neighbourCountry.cca2}`}
                    key={neighbourCountry.name.common}
                    className="neighbouring_country"
                  >
                    <Image
                      src={neighbourCountry.flags.svg}
                      alt={
                        neighbourCountry.flags.alt ||
                        neighbourCountry.name.common
                      }
                      width={78}
                      height={60}
                      priority
                    />

                    <h6>{neighbourCountry.name.common}</h6>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Country;

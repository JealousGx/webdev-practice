export const getAllCountries = () => {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
};

export const getCountryByCode = (code: string) => {
  return fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(
    (response) => response.json()
  );
};

export const sortCountriesByValue = (
  countries: any,
  sort: string | null,
  value: string
): any => {
  // sort by name
  if (value === "name") {
    if (sort === "asc") {
      return countries.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
    } else {
      return countries.sort((a: any, b: any) => {
        if (a.name.common > b.name.common) {
          return -1;
        }
        if (a.name.common < b.name.common) {
          return 1;
        }
        return 0;
      });
    }
  } else if (value === "gini") {
    if (sort === "asc") {
      return countries.sort((a: any, b: any) => {
        if (Object.values(a.gini) < Object.values(b.gini)) {
          return -1;
        }
        if (Object.values(a.gini) > Object.values(b.gini)) {
          return 1;
        }
        return 0;
      });
    }
    return countries.sort((a: any, b: any) => {
      if (Object.values(a.gini) > Object.values(b.gini)) {
        return -1;
      }
      if (Object.values(a.gini) < Object.values(b.gini)) {
        return 1;
      }
      return 0;
    });
  } else if (sort === null)
    return sortCountriesByValue(countries, "asc", "name");
  else {
    if (sort === "asc") {
      return countries.sort((a: any, b: any) => {
        if (a[value] < b[value]) {
          return -1;
        }
        if (a[value] > b[value]) {
          return 1;
        }
        return 0;
      });
    }
    return countries.sort((a: any, b: any) => {
      if (a[value] > b[value]) {
        return -1;
      }
      if (a[value] < b[value]) {
        return 1;
      }
      return 0;
    });
  }
};

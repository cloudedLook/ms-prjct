import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { ALL_COUNTRIES } from "../API";
import { Controls } from "../components/Controls";

export const HomePage = ({ setCountries, countries }) => {
  const { push } = useHistory();

  useMemo(() => {
    if (!countries.length)
      axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
  }, []);
  return (
    <>
      <Controls />
      <List>
        {countries.map((c) => {
          const countryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: "Population",
                description: c.population.toLocaleString(),
              },
              {
                title: "Region",
                description: c.region,
              },
              {
                title: "Capital",
                description: c.capital,
              },
            ],
          };

          return (
            <Card
              key={c.name}
              onClick={() => push(`/country/${c.name}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};

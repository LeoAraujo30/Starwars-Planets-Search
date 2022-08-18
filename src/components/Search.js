import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Search() {
  const { allPlanets, setPlanets, filterByName } = useContext(PlanetContext);

  const filterTable = () => {
    if (filterByName.name.length > 0) {
      setPlanets(allPlanets.filter((planet) => (planet.name.toLowerCase())
        .includes(filterByName.name.toLowerCase())));
    } else {
      setPlanets(allPlanets);
    }
  };

  useEffect(() => filterTable(), [filterByName.name]);

  const inpChange = ({ target }) => {
    const { value } = target;
    filterByName.setName(value);
  };

  return (
    <div>
      <label htmlFor="name">
        Search:
        <input
          type="text"
          id="name"
          name="name"
          data-testid="name-filter"
          value={ filterByName.name }
          onChange={ inpChange }
        />
      </label>
    </div>
  );
}

export default Search;

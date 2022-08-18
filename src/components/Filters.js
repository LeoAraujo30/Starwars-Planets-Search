import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function Filters() {
  const { column, comparison, number, setColumn, setComparison, setNumber,
    setPlanets, allPlanets, filterByNumericValues, setFilterByNumericValues,
  } = useContext(PlanetContext);

  const inpChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'column') {
      setColumn(value);
    } else if (name === 'comparison') {
      setComparison(value);
    } else {
      setNumber(value);
    }
  };

  const addFilter = () => {
    if (comparison === 'maior que') {
      setPlanets(
        allPlanets.filter((planet) => parseFloat(planet[column]) > parseFloat(number)),
      );
    } else if (comparison === 'menor que') {
      setPlanets(
        allPlanets.filter((planet) => parseFloat(planet[column]) < parseFloat(number)),
      );
    } else {
      setPlanets(
        allPlanets.filter((planet) => parseFloat(planet[column]) === parseFloat(number)),
      );
    }
  };

  const addFilterInArray = () => {
    const obj = { column, comparison, value: number };
    const bool = filterByNumericValues.some(
      (filter) => filter.column === obj.column
        && filter.comparison === obj.comparison && filter.value === obj.value,
    );
    if (bool === false) {
      setFilterByNumericValues([
        ...filterByNumericValues,
        { column, comparison, value: number },
      ]);
    } else {
      setFilterByNumericValues(filterByNumericValues);
    }
  };

  useEffect(() => addFilter(), [filterByNumericValues]);

  return (
    <div>
      <label htmlFor="column">
        Coluna:
        <select
          id="column"
          name="column"
          data-testid="column-filter"
          value={ column }
          onChange={ inpChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          id="comparison"
          name="comparison"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ inpChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          type="number"
          id="number"
          name="number"
          data-testid="value-filter"
          value={ number }
          onChange={ inpChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        // disabled={ !number > 0 }
        onClick={ addFilterInArray }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;

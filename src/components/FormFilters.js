import React, { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function FormFilters() {
  const { column, comparison, number, setColumn, setComparison, setNumber,
    setPlanets, allPlanets, planets, filterByNumericValues,
    setFilterByNumericValues, options, setOptions,
  } = useContext(PlanetContext);

  const updateTable = () => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        if (filter.comparison === 'maior que') {
          setPlanets(
            planets.filter(
              (planet) => parseFloat(planet[filter.column]) > parseFloat(filter.value),
            ),
          );
        } else if (filter.comparison === 'menor que') {
          setPlanets(
            planets.filter(
              (planet) => parseFloat(planet[filter.column]) < parseFloat(filter.value),
            ),
          );
        } else {
          setPlanets(
            planets.filter(
              (planet) => parseFloat(planet[filter.column]) === parseFloat(filter.value),
            ),
          );
        }
      });
    }
    if (filterByNumericValues.length === 0) {
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
          allPlanets
            .filter((planet) => parseFloat(planet[column]) === parseFloat(number)),
        );
      }
    }
  };

  useEffect(() => {
    updateTable();
    setColumn(options[0]);
    if (filterByNumericValues.length === 0) {
      setPlanets(allPlanets);
      setOptions(['population', 'orbital_period', 'diameter',
        'rotation_period', 'surface_water']);
      setColumn('population');
    }
  }, [filterByNumericValues]);

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

  const optionOn = () => {
    const bool1 = filterByNumericValues.some((filter) => filter.column === 'population');
    const bool2 = filterByNumericValues
      .some((filter) => filter.column === 'orbital_period');
    const bool3 = filterByNumericValues.some((filter) => filter.column === 'diameter');
    const bool4 = filterByNumericValues
      .some((filter) => filter.column === 'rotation_period');
    const bool5 = filterByNumericValues
      .some((filter) => filter.column === 'surface_water');

    return [bool1, bool2, bool3, bool4, bool5];
  };

  const addFilter = () => {
    const obj = { column, comparison, value: number };
    const bool = filterByNumericValues.some(
      (filter) => filter.column === obj.column,
    );
    if (bool === false) {
      setFilterByNumericValues([
        ...filterByNumericValues,
        { column, comparison, value: number },
      ]);
    } else {
      setFilterByNumericValues(filterByNumericValues);
    }
    setOptions(options.filter((option) => option !== column));
  };

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
          { !optionOn()[0] && <option value="population">population</option> }
          { !optionOn()[1] && <option value="orbital_period">orbital_period</option> }
          { !optionOn()[2] && <option value="diameter">diameter</option> }
          { !optionOn()[3] && <option value="rotation_period">rotation_period</option>}
          { !optionOn()[4] && <option value="surface_water">surface_water</option> }
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
        onClick={ addFilter }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FormFilters;

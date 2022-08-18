import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [allPlanets, setAllPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('0');

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [options, setOptions] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);

  const fetchPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await response.json();
    const list = data.results.map((planet) => ({
      name: planet.name,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: planet.surface_water,
      population: planet.population,
      films: planet.films,
      created: planet.created,
      edited: planet.edited,
      url: planet.url,
    }));
    setAllPlanets(list);
    setPlanets(list);
  };

  useEffect(() => fetchPlanets(), []);

  const state = {
    allPlanets,
    planets,
    setPlanets,
    filterByName: {
      name,
      setName,
    },
    column,
    setColumn,
    comparison,
    setComparison,
    number,
    setNumber,
    filterByNumericValues,
    setFilterByNumericValues,
    options,
    setOptions,
  };

  return (
    <PlanetContext.Provider value={ state }>
      { children }
    </PlanetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;

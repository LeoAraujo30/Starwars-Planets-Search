import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [allPlanets, setAllPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');

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

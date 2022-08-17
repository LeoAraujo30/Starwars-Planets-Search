import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets(data.results.map((planet) => ({
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
      }))));
  };

  useEffect(() => getPlanets(), []);

  const state = {
    planets,
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

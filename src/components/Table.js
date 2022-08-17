import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { planets } = useContext(PlanetContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          { planets.map((planet, id) => {
            const { name, rotation_period: rotationPeriod, orbital_period: orbitalPeriod,
              diameter, climate, gravity, terrain, surface_water: surfaceWater,
              population, films, created, edited, url } = planet;
            return (
              <tr key={ id }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{ films.map((film) => <li key={ film }>{ film }</li>) }</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
                {/* <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editOnDispatch(id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeExpensesDispatch(id) }
                  >
                    Excluir
                  </button>
                </td> */}
              </tr>
            );
          }) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;

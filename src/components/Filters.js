import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Filters() {
  const { setPlanets, allPlanets, options, setOptions,
    filterByNumericValues, setFilterByNumericValues,
  } = useContext(PlanetContext);

  const removeFilter = (obj) => {
    const filtersList = filterByNumericValues.filter(
      (filter) => filter.column !== obj.column,
    );
    setPlanets(allPlanets);
    setFilterByNumericValues(filtersList);
    setOptions(options.concat(obj.column));
  };

  return (
    <div>
      { filterByNumericValues.map((filter, id) => {
        const { column: col, comparison: comp, value } = filter;
        return (
          <div key={ id } data-testid="filter">
            {`${col}, ${comp}, ${value}`}
            <button
              type="button"
              onClick={ () => {
                removeFilter(filter);
              } }
            >
              X
            </button>
          </div>
        );
      }) }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilterByNumericValues([]) }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default Filters;

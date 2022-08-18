import React from 'react';
import './App.css';
import FormFilters from './components/FormFilters';
import Filters from './components/Filters';
import Search from './components/Search';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Search />
      <FormFilters />
      <Filters />
      <Table />
    </div>
  );
}

export default App;

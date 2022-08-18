import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Search from './components/Search';
import Table from './components/Table';

function App() {
  return (
    <div>
      <Search />
      <Filters />
      <Table />
    </div>
  );
}

export default App;

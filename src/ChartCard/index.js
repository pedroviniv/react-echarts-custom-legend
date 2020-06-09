import React, { useState } from 'react';
import PieChart from "../charts/PieChart";
import SearchBar from '../SearchBar';
import { HORIZONTAL } from '../charts/orientation';

function getData() {
  return [
    {
      label: 'Masculino',
      value: 541
    },
    {
      label: 'Feminino',
      value: 378
    },
    {
      label: 'Não Informou',
      value: 187
    },
    {
      label: 'Não Informou X',
      value: 187
    },
  ]
}

const ChartCard = (props) => {

  const [query, setQuery] = useState('');

  function handleSearchBarChange(newQuery) {
    setQuery(newQuery);
  }

  const data = getData();

  return (
    <div style={{width: '500px', height: '900px'}}>
      <SearchBar
        placeholder='Busque legendas'
        onChange={handleSearchBarChange}
      />
      <PieChart
        data={data}
        legendsQuery={query}
        legendsScrollable
        orientation={HORIZONTAL}
        legendIcon={legend => <span><svg width="13" height="13" fill={legend.color}>
        <circle cx="6.5" cy="6.5" r="6.5" /></svg></span>}
      />
    </div>
  );
};

export default ChartCard;
import React, { useState } from 'react';
import PieChart from "../charts/PieChart";
import SearchBar from '../SearchBar';
import { HORIZONTAL, VERTICAL } from '../charts/orientation';

function getData() {
  return [
    {
      label: 'Masculino',
      value: 541,
      percent: 50.0
    },
    {
      label: 'Feminino',
      value: 378,
      percent: 37.8
    },
    {
      label: 'Não Informou',
      value: 187,
      percent: 18.7
    },
    {
      label: 'Não Informou X',
      value: 187,
      percent: 18.7
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
    <div style={{width: '800px', height: '400px'}}>
      <SearchBar
        placeholder='Busque legendas'
        onChange={handleSearchBarChange}
      />
      <PieChart
        data={data}
        legendsQuery={query}
        legendsScrollable
        orientation={VERTICAL}
        legendIcon={legend => <span><svg width="13" height="13" fill={legend.color}>
        <circle cx="6.5" cy="6.5" r="6.5" /></svg></span>}
        gridSettings={{ legend: 18, chart: 82 }} // used when chart orientation is horizontal
        legendMaxCharacters={10}
      />
    </div>
  );
};

export default ChartCard;
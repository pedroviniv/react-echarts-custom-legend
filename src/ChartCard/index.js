import React, { useState } from 'react';
import PieChart from "../charts/PieChart";
import SearchBar from '../SearchBar';
import { HORIZONTAL, VERTICAL } from '../charts/orientation';
import { genData } from './namegen';

const data = genData(50);

function getData() {
  return data;
}

const ChartCard = (props) => {

  const [query, setQuery] = useState('');

  function handleSearchBarChange(newQuery) {
    setQuery(newQuery);
  }

  const data = getData();

  return (
    <div style={{ width: '100%', height: '100%' }}>
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
        legendMaxCharacters={20}
      />
    </div>
  );
};

export default ChartCard;
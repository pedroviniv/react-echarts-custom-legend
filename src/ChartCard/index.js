import React, { useState } from 'react';
import PieChart from "../charts/PieChart";
import SearchBar from '../SearchBar';
import { VERTICAL } from '../charts/orientation';
import { genData } from './namegen';
import CircleLegendIcon from 'simple-charts-legend/dist/icon/CircleLegendIcon';
import DefaultDisabledLegendIcon from 'simple-charts-legend/dist/DefaultDisabledLegendIcon';
import DefaultDisabledLegendText from 'simple-charts-legend/dist/DefaultDisabledLegendText';
import { HORIZONTAL } from 'simple-charts-legend/dist/orientation';

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
    <div style={{ width: '100%', height: '100%', fontSize: '90%' }}>
      <SearchBar
        placeholder='Busque legendas'
        onChange={handleSearchBarChange}
      />
      <PieChart
        data={data}
        horizontalAlign='center'
        verticalAlign='center'
        legendsQuery={query}
        orientation={VERTICAL}
        legendIcon={CircleLegendIcon}
        legendDisabledIconColor='#e3e3e3'
        legendDisabledIcon={DefaultDisabledLegendIcon}
        legendDisabledTextColor='#e3e3e3'
        legendDisabledText={DefaultDisabledLegendText}
        gridSettings={{ legend: 18, chart: 82 }} // used when chart orientation is horizontal
        legendMaxCharacters={20}
      />
    </div>
  );
};

export default ChartCard;
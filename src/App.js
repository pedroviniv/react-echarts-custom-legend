import React from 'react';
import ChartCard from './ChartCard';
import Legend from './charts/Legend';
import { genData } from './ChartCard/namegen';
import { HORIZONTAL } from './charts/orientation';
import CircleLegendIcon from './charts/Legend/icon/CircleLegendIcon';

const data = genData(50);

/**
 * extracts the legends from the given data,
 * converting it to the format expected HoC WithLegend
 * @param {*} data 
 */
function mapDataToLegends(data) {

  const colors = [
    '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
    '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'
  ];

  return data.map((dataItem, index) => {
    const { label } = dataItem;
    return {
      label,
      color: colors[index % colors.length],
      numeric: dataItem.value,
      percent: dataItem.percent,
    };
  });
}

function App() {

  const legendData = mapDataToLegends(data);

  return (
    <div className="App" style={{ width: '900px', height: '500px' }}>
      <ChartCard />
      <Legend
        data={legendData} // [{label,color}]
        onClick={(legend) => {}} // desnecessário pro relatório
        onHover={(event) => {}} // desnecessário pro relatório
        orientation={HORIZONTAL} // 'HORIZONTAL' | 'VERTICAL'
        icon={CircleLegendIcon} // componente que renderiza o icone
        scrollable={false} // pro relatório este atributo deve ser false
        maxCharacters={999} // quantidade máxima de caracteres por label (se não passar nada, não ter max)
      />
    </div>
  );
}

export default App;

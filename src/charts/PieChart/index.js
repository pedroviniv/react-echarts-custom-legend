import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { toOption } from './toEchartData';
import WithLegend from '../WithLegend';

class PieChart extends React.Component {

  constructor(props) {
    super(props);
    
    this.echarts = React.createRef();
  }

  /**
   * executed when the echarts instance is fully loaded,
   * it just sets the received instance as a component field
   * @param {*} echartsInstance 
   */
  handleChartReady(echartsInstance) {
    this.echarts = echartsInstance;

    const { forwardChartInstance } = this.props;
    if (forwardChartInstance) {
      forwardChartInstance(this.echarts);
    }
  }

  render() {

    const {
      data = [],
    } = this.props;

    const option = toOption(data);

    return (
      <ReactEcharts
        option={option}
        style={{height: '100%'}}
        onChartReady={echarts => this.handleChartReady(echarts)}
      />
    );
  }
}

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

export default WithLegend(PieChart, mapDataToLegends);
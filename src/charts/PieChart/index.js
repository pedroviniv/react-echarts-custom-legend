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
  return data.map(dataItem => {
    const { label } = dataItem;
    return {
      label,
    };
  });
}

export default WithLegend(PieChart, mapDataToLegends);
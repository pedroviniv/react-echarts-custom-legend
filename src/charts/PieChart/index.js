import React from 'react';
import ReactEcharts from 'echarts-for-react';
import Legend from '../Legend';

export default class PieChart extends React.Component {

  constructor(props) {
    super(props);
    
    this.echarts = React.createRef();
  }

  getOption() {
    return {
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: ['Masculino', 'Feminino', 'Não Informou'],
        show: false,
      },
      series: [
          {
              name: 'Informe o seu sexo',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: [
                  {value: 335, name: 'Masculino'},
                  {value: 310, name: 'Feminino'},
                  {value: 234, name: 'Não Informou'}
              ]
          }
        ]
    };
  }

  onLegendClick(legend) {
    if (!this.echarts) {
      return;
    }

    const action = {
      type: 'legendToggleSelect',
      name: legend.label
    };
    
    this.echarts.dispatchAction(action);
  }

  /**
   * 
   * @param {*} name name of data to be hightlited
   * @param {*} isHightlight should be hightlighted or downplayed (opposite of hightlighted)
   */
  hightlightOrDownPlay(name, isHightlight = true) {

    const echartInstance = this.echarts;
    if (!echartInstance) {
      return;
    }

    const actionType = isHightlight ? 'highlight' : 'downplay';

    const action = {
      type: actionType,
      name,
    };

    echartInstance.dispatchAction(action);
  }

  onLegendHover(event) {
    this.hightlightOrDownPlay(event.target.label, event.enter);
  }

  handleChartReady(echartsInstance) {
    this.echarts = echartsInstance;
  }

  setColors(legends, colors) {
    
    const legendsWithColor = legends.map((legend, index) => ({
      ...legend,
      color: colors[index % colors.length],
    }));

    console.log('legends with color: ', legendsWithColor);

    return legendsWithColor;
  }

  setDefaultColors(legends) {
    const colors = [
      '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
      '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'
    ];
    return this.setColors(legends, colors);
  }

  render() {

    /**
     * TODO: define colors and icons
     */
    const legendData = [
      { label: 'Masculino' },
      { label: 'Feminino' },
      { label: 'Não Informou' }
    ];


    const option = this.getOption();

    return (
      <div>
        <Legend
          data={this.setDefaultColors(legendData)}
          onClick={(legend) => this.onLegendClick(legend)}
          onHover={(event) => this.onLegendHover(event)}
          orientation='vertical'
          icon={legend => <span><svg width="13" height="13" fill={legend.color}>
            <circle cx="6.5" cy="6.5" r="6.5" /></svg></span>}
        />
        <ReactEcharts
          option={option}
          onChartReady={echarts => this.handleChartReady(echarts)}
        />
      </div>
    );
  }
}
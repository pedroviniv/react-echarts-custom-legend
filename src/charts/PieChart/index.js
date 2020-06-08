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

    console.log('legend clicked: ', legend);

    const action = {
      type: 'legendToggleSelect',
      name: legend.label
    };

    console.log('dispatching action: ', action);
    
    this.echarts.dispatchAction(action);

    console.log('action dispatched');
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

    console.log('dispatching action: ', action);

    echartInstance.dispatchAction(action);

    console.log('dispatched!');
  }

  onLegendHover(event) {
    console.log(`legend ${event.target.label} is${!event.enter ? '\'nt' : ' '} focused!`);
    this.hightlightOrDownPlay(event.target.label, event.enter);
  }

  handleChartReady(echartsInstance) {
    this.echarts = echartsInstance;
  }

  render() {

    /**
     * TODO: define colors and icons
     */
    const legendData = [
      { color: '', label: 'Masculino', icon: '' },
      { color: '', label: 'Feminino', icon: '' },
      { color: '', label: 'Não Informou', icon: '' }
    ];
    const option = this.getOption();

    return (
      <div>
        <Legend
          data={legendData}
          onClick={legend => this.onLegendClick(legend)}
          onHover={event => this.onLegendHover(event)}
          orientation='vertical'
        />
        <ReactEcharts
          option={option}
          onChartReady={echarts => this.handleChartReady(echarts)}
        />
      </div>
    );
  }
}
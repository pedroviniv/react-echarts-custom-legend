import React from 'react';
import Legend from './Legend';
import { VERTICAL, HORIZONTAL, toCssClass } from './orientation';
import './styles.css';

/**
 * Higher order component que adiciona legendas customizadas a um gráfico echarts
 * @param {*} ChartComponent componente de gráfico echarts
 * @param {*} mapDataToLegends função que mapeia os dados do gráfico para um conjunto de legendas
 * [{label,color,numeric,percent}]
 */
export default function WithLegend(ChartComponent, mapDataToLegends) {

  return class LegendedChart extends React.Component {

    /**
     * calcula a orientação da legenda baseado na orientação do gráfico + legenda.
     * ex: se a orientação do gráfico for vertical, ou seja: legenda em cima e gráfico em baixo,
     * então a orientação da legenda será horizontal: será renderizada inline.
     * @param {*} chartOrientation 
     */
    resolveLegendsOrientationByChartOrientation(chartOrientation) {
      if (chartOrientation === VERTICAL) {
        return HORIZONTAL;
      }
      return VERTICAL;
    }

    setChartInstance(chartInstance) {
      this.echarts = chartInstance;
    }
    /**
     * trata evento de clique na legenda, enviando action correspondente para o echarts
     * @param {*} legend legenda clicada
     */
    handleLegendClick(legend) {
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

    /**
     * hightlights or downplays that legend on mouse hover
     * @param {*} event 
     */
    handleLegendHover(event) {
      this.hightlightOrDownPlay(event.target.label, event.enter);
    }

    /**
     * filter the given legends returning only the ones that match with the given legendsQuery
     * @param {*} legends 
     * @param {*} legendsQuery 
     */
    filterLegends(legends, legendsQuery) {
      return legends.filter(legend => {
        return legend.label.toLowerCase().includes(legendsQuery.toLowerCase());
      });
    }

    gridStyles(orientation, props) {

      const orientationStrategies = {};
      orientationStrategies[VERTICAL] = props => {
        return [{}, {}];
      };

      orientationStrategies[HORIZONTAL] = props => {
        const { gridSettings } = props;
        const { legend, chart } = gridSettings;
        return [{ width: `${legend}%` }, { width: `${chart}%` }];
      };

      return orientationStrategies[orientation](props);
    }

    render() {

      // main props
      const { data, orientation } = this.props;

      const [legendStyle, chartStyle] = this.gridStyles(orientation, this.props);

      // legends props
      const { legendIcon, legendsScrollable, legendsQuery, legendMaxCharacters } = this.props;    

      const legends = mapDataToLegends(data);

      const filteredLegends = this.filterLegends(legends, legendsQuery);

      const containerClassName = `chart ${toCssClass(orientation)}`;

      return (
        <div className={containerClassName}>
          <div className="header" style={legendStyle}>
            <Legend
              data={filteredLegends}
              onClick={(legend) => this.handleLegendClick(legend)}
              onHover={(event) => this.handleLegendHover(event)}
              orientation={this.resolveLegendsOrientationByChartOrientation(orientation)}
              icon={legendIcon}
              scrollable={legendsScrollable}
              maxCharacters={legendMaxCharacters}
            />
          </div>
          <div className="content" style={chartStyle}>
            <ChartComponent
              {...this.props}
              forwardChartInstance={echarts => this.setChartInstance(echarts)}
            />
          </div>
        </div>
      );
    }
  };
}
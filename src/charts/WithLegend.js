import React from 'react';
import Legend from 'simple-chart-legend/dist/index';
// legend constants
import { VERTICAL as CHART_VERTICAL, HORIZONTAL as CHART_HORIZONTAL, toCssClass } from './orientation';
// chart constants
import { VERTICAL as LEGEND_VERTICAL, HORIZONTAL as LEGEND_HORIZONTAL } from 'simple-chart-legend/dist/orientation';
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
      if (chartOrientation === CHART_VERTICAL) {
        return LEGEND_HORIZONTAL;
      }
      return LEGEND_VERTICAL;
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

    /**
     * get orientation styles based in the chart orientation and  in the properties passed.
     * 
     * ex: if the orientation is 'HORIZONTAL', it fill return styles for the legend-area and the
     * chart-area in the following format:
     * 
     * styles = [{width},{width}]
     * where styles[0] is the legend-area styles 
     * and styles[1] is the chart-area styles
     * 
     * @param {*} orientation 
     * @param {*} props 
     */
    gridStyles(orientation, props) {

      const orientationStrategies = {};
      orientationStrategies[CHART_VERTICAL] = props => {
        return [{}, {}];
      };

      orientationStrategies[CHART_HORIZONTAL] = props => {
        const { gridSettings } = props;
        const { legend, chart } = gridSettings;
        return [{ width: `${legend}%` }, { width: `${chart}%` }];
      };

      return orientationStrategies[orientation](props);
    }

    render() {

      /* main props */
      const { data, orientation } = this.props;

      const [legendStyle, chartStyle] = this.gridStyles(orientation, this.props);

      /* legends props */

      // filter
      const { legendsQuery, legendsFilterStrategy = this.filterLegends } = this.props;

      // general
      const {
        legendsScrollable,
        legendMaxCharacters,
        legendIcon,
        legendDisabledIconColor,
        legendDisabledIcon,
        legendDisabledTextColor,
        legendDisabledText,
      } = this.props;

      // extracting legends from data
      const legends = mapDataToLegends(data);
      // applying filter on the extracted legends
      const filteredLegends = legendsFilterStrategy(legends, legendsQuery);

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
              disabledIconColor={legendDisabledIconColor}
              disabledIcon={legendDisabledIcon}
              disabledTextColor={legendDisabledTextColor}
              disabledText={legendDisabledText}
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
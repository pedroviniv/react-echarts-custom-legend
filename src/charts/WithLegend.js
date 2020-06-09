import React from 'react';
import Legend from './Legend';
import { VERTICAL, HORIZONTAL, toCssClass } from './orientation';
import './styles.css';

export default function WithLegend(ChartComponent, mapDataToLegends) {

  return class LegendedChart extends React.Component {

    resolveLegendsOrientationByChartOrientation(chartOrientation) {
      if (chartOrientation === VERTICAL) {
        return HORIZONTAL;
      }
      return VERTICAL;
    }

    setChartInstance(chartInstance) {
      this.echarts = chartInstance;
    }

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
     * set the given colors in the given legends
     * @param {*} legends 
     * @param {*} colors 
     */
    setColors(legends, colors) {
      
      const legendsWithColor = legends.map((legend, index) => ({
        ...legend,
        color: colors[index % colors.length],
      }));

      return legendsWithColor;
    }

    /**
     * set some default colors in the given legends
     * @param {*} legends 
     */
    setDefaultColors(legends) {
      const colors = [
        '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
        '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'
      ];
      return this.setColors(legends, colors);
    }

    render() {

      // main props
      const { data, orientation } = this.props;

      // legends props
      const { legendIcon, legendsScrollable, legendsQuery } = this.props;    

      const legends = this.setDefaultColors(mapDataToLegends(data));

      const filteredLegends = this.filterLegends(legends, legendsQuery);

      const containerClassName = `chart ${toCssClass(orientation)}`;

      return (
        <div className={containerClassName}>
          <div className="legend">
            <Legend
              data={filteredLegends}
              onClick={(legend) => this.handleLegendClick(legend)}
              onHover={(event) => this.handleLegendHover(event)}
              orientation={this.resolveLegendsOrientationByChartOrientation(orientation)}
              icon={legendIcon}
              scrollable={legendsScrollable}
            />
          </div>
          <div className="content">
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
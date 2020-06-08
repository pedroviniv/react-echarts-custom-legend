import React, { useState } from 'react';
import './index.css';

/**
 * componente que renderiza um item de legenda
 * @param {*} props propriedades do componente que inclue:
 *  - index (posição deste item de legenda na lista de legendas)
 *  - disabled (flag indicando se esta legenda está desabilitada ou não)
 *  - item (dado a ser renderizado no item)
 *  - onClick (callback executado quando é realizado um click sobre o item)
 *  - onHover (callback executado quando o cursor do mouse está sobre o item)
 */
const LegendItem = ({index, disabled, item, onClick, onHover}) => {

  const className = `legend-item ${disabled ? ' disabled' : ''}`;

  const target = {
    ...item,
    index,
  };

  return (
    <li
      className={className}
      key={item.label}
      onClick={ev => onClick(target)}
      onMouseOver={ev => onHover({target, enter: true})}
      onMouseLeave={ev => onHover({target, enter: false})}
    >
      {item.label}
    </li>
  );
};

const Legend = ({data, onClick, onHover, orientation}) => {

  const [selectedLegends, setSelectedLegends] = useState([]);

  /**
   * removes the given legend
   * @param {*} legend 
   */
  function removeLegend(legend) {
    const remainingLegends = selectedLegends.filter(selected => {
      return selected !== legend.label;
    });
    setSelectedLegends(remainingLegends);
  }

  /**
   * selects the given select
   * @param {*} legend 
   */
  function selectLegend(legend) {
    setSelectedLegends([...selectedLegends, legend.label]);
  }

  /**
   * verifies if the given legend is currently selected
   * @param {*} legend 
   */
  function isSelected(legend) {
    return selectedLegends.includes(legend.label);
  }

  /**
   * handles legend item on click event
   * @param {*} target 
   */
  function handleOnClickEvent(legend) {
    
    /**
     * if the given legend is selected, it will be removed for the state
     */
    if (isSelected(legend)) {
      removeLegend(legend);
    }
    /**
     * if not, the given legend will be added to the state
     */
    else {
      selectLegend(legend);
    }

    /**
     * propagates the onClick event to the parent
     */
    if (onClick) {
      onClick(legend);
    }
  }

  const legendClassName = `legend ${orientation}`;

  return (
    <ul className={legendClassName}>
      {data.map((item, index) => <LegendItem disabled={isSelected(item)} index={index} key={item.label} item={item} onClick={handleOnClickEvent} onHover={onHover} /> )}
    </ul>
  );
};

export default Legend;
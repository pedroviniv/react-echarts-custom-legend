import React from 'react';
import './styles.css';

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/**
 * componente que renderiza um item de legenda
 * @param {*} props propriedades do componente que inclue:
 *  - index (posição deste item de legenda na lista de legendas)
 *  - disabled (flag indicando se esta legenda está desabilitada ou não)
 *  - item (dado a ser renderizado no item)
 *  - onClick (callback executado quando é realizado um click sobre o item)
 *  - onHover (callback executado quando o cursor do mouse está sobre o item)
 */
const LegendItem = ({index, disabled, item, onClick, onHover, icon}) => {

  const className = `legend-item${disabled ? ' disabled' : ''}`;

  const target = {
    ...item,
    index,
  };

  let renderedIcon = icon;

  if (isFunction(icon)) {
    renderedIcon = icon(target);
  }

  return (
    <li
      className={className}
      key={item.label}
      onClick={ev => onClick(target)}
      onMouseOver={ev => onHover({target, enter: true})}
      onMouseLeave={ev => onHover({target, enter: false})}
    >
      <span className='legend-icon'>{renderedIcon}</span>
      {item.label}
    </li>
  );
};

export default LegendItem;
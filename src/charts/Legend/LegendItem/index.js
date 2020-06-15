import React from 'react';
import './styles.css';

/**
 * dado um objeto, verifica se este é uma função.
 * @param {*} object 
 */
function isFunction(object) {
  return object && {}.toString.call(object) === '[object Function]';
}

/**
 * renderiza o conteudo textual exibido quando o mouse está sobre a legenda,
 * exibindo o num. de coletas e o valor percentual.
 * @param {*} data 
 */
function renderTitle(data) {
  return `coletas: ${data.numeric}. percentual: ${data.percent}%`;
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
const LegendItem = ({index, disabled, item, onClick, onHover, icon, maxCharacters = -1}) => {

  const className = `legend-item${disabled ? ' disabled' : ''}`;

  const target = {
    ...item,
    index,
  };

  let renderedIcon = icon;

  if (isFunction(icon)) {
    renderedIcon = icon(target);
  }

  const maxCharactersStyle = maxCharacters === -1 ? {} : {maxWidth: `${maxCharacters}ch`};

  return (
    <li
      className={className}
      key={item.label}
      onClick={ev => onClick(target)}
      onMouseOver={ev => onHover({target, enter: true})}
      onMouseLeave={ev => onHover({target, enter: false})}
      title={renderTitle(item)}
    >
      <span className='legend-icon'>{renderedIcon}</span>
      <span className='legend-text' style={maxCharactersStyle}>{item.label}</span>
    </li>
  );
};

export default LegendItem;
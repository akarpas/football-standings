import React from 'react';

import './Button.module.scss';

const Button = (props) => {
  const { data, handleClick } = props;
  const { sort, type, label, column } = data;
  const { which, order } = sort;

  return (
    <button
      onClick={handleClick}
      id={`${type}-${column}`}
    >
      {which === `${type}-${column}` && (
        <span id={`${type}-${column}`}>{order === 'ascending'
          ? <span id={`${type}-${column}`}>&darr;</span>
          : <span id={`${type}-${column}`}>&uarr;</span>}
        </span>)}
      <span id={`${type}-${column}`}>{label}</span>
    </button>
  )
}

export default Button;

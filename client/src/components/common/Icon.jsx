import React from 'react';

export function Icon({ name, className = '', style = {} }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default Icon;

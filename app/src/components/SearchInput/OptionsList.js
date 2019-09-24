import PropTypes from 'prop-types';
import React from 'react';
import './OptionsList.scss';


function OptionsList({ ...props }) {
  const { options, selectedOptionIndex, onClick } = props;

  return (
    <ul className="suggestions">
      {options.map((option, optionIndex) => (
        <li
          className={optionIndex === selectedOptionIndex ? 'suggestion-active' : ''}
          key={option}
          onClick={() => onClick(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

OptionsList.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOptionIndex: PropTypes.number,
  onClick: PropTypes.func,
};


export default OptionsList;

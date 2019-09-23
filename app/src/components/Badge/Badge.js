import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import './Badge.scss';


function Badge({ ...props }) {
  const { displayName, variant } = props;
  const badgeClasses = classNames(
    'badge',
    variant && `badge-${variant}`,
  );

  return <span className={displayName && badgeClasses}>{displayName}</span>;
}

Badge.defaultProps = {
  variant: 'info',
};

Badge.propTypes = {
  variant: PropTypes.oneOf([
    'danger',
    'success',
    'info',
  ]).isRequired,
  displayName: PropTypes.string.isRequired,
};


export default Badge;

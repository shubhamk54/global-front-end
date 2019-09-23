import PropTypes from 'prop-types';
import React from 'react';
import './NoDataAvailable.scss';

function NoDataAvailable({ ...props }) {
    const { title, subTitle } = props;

    return <section className='no-data'>
        <p className='no-data-title'>{title}</p>
        <p className='no-data-subTitle'>{subTitle}</p>
    </section>;
}

NoDataAvailable.defaultProps = {
    title: 'Data not available',
    subTitle: '',
};

NoDataAvailable.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
};


export default NoDataAvailable;
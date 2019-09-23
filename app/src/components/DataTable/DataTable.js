import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Badge from '../Badge/Badge.js';
import './DataTable.scss';

import { abbreviateAmount } from '../../utils/dateUtils.js';

class DataTable extends Component {

    renderTableHeader(columns) {
        return columns.map((column, columnIndex) => <th key={columnIndex}>{column.title}</th>);
    }

    renderTableData(columns, data) {
        return data.map((dataRow, rowIndex) => <tr key={rowIndex}>
            {columns.map((column, columnIndex) => {
                const cellClassName = classNames(
                    'cell',
                    column.type && `cell-${column.type}`,
                );
                switch (column.type) {
                    case 'pill':
                        return <td className={cellClassName} key={columnIndex}>
                            <Badge
                                displayName={dataRow[column.dataKey].title}
                                variant={dataRow[column.dataKey].type} />
                        </td>

                    case 'amount':
                        return <td className={cellClassName}
                            key={columnIndex}>
                            {`${abbreviateAmount(dataRow[column.dataKey])} ${this.props.currency ? this.props.currency : ''}`}
                        </td>

                    default:
                        return <td className={cellClassName}
                            key={columnIndex}
                        >{dataRow[column.dataKey]}</td>
                }
            })}
        </tr>);
    }


    render() {
        return (
            this.props.data.length > 0 && <table className='data-table'>
                <tbody>
                    <tr>{this.renderTableHeader(this.props.columns)}</tr>
                    {this.renderTableData(this.props.columns, this.props.data)}
                </tbody>
            </table>
        )
    }
}



DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    currency: PropTypes.string,
};

DataTable.defaultProps = {
    currency: 'USD',
}

export default DataTable
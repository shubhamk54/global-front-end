import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './DataTable.scss';
import Badge from '../Badge/Badge.js';

class DataTable extends Component {

    renderTableHeader(columns) {
        return columns.map((column, columnIndex) => <th key={columnIndex}>{column.title}</th>);
    }

    renderTableData(columns, data) {
        return data.map((dataRow, rowIndex) => <tr key={rowIndex}>
            {columns.map((column, columnIndex) => {
                switch (column.type) {
                    case 'pill':
                        return <td align="center" key={columnIndex}>
                            <Badge
                                displayName={dataRow[column.dataKey].title}
                                variant={dataRow[column.dataKey].type} />
                        </td>
                    default:
                        return <td key={columnIndex}>{dataRow[column.dataKey]}</td>
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
};

DataTable.defaultProps = {

}

export default DataTable
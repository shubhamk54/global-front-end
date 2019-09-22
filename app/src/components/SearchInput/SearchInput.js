import React, { Component } from "react";
import PropTypes from "prop-types";

import OptionList from './OptionsList.js';

import './SearchInput.scss';

const KeyBoardBinding = {
    ENTER: 13,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
}

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
        };
    }

    onChange = e => {
        const inputValue = e.target.value;
        const filteredOptions = this.props.suggestedOptions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );

        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
        }, () => this.props.onChange(this.props.name, inputValue, true));
    };

    onClick = value => {
        console.log(value);
        this.setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
        }, () => this.props.onChange(this.props.name, value));
    };

    onKeyDown = e => {
        const { activeOption, filteredOptions } = this.state;

        // User pressed the enter key
        if (e.keyCode === KeyBoardBinding.ENTER) {
            this.setState({
                activeOption: 0,
                showOptions: false,
            }, () => this.props.onChange(this.props.name, filteredOptions[activeOption]));
        }
        // User pressed the up arrow
        else if (e.keyCode === KeyBoardBinding.UP_ARROW) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === KeyBoardBinding.DOWN_ARROW) {
            if (activeOption - 1 === filteredOptions.length) {
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    render() {
        return (
            <div className="search-input">
                <input
                    type="text"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    value={this.props.value}
                />
                {this.state.filteredOptions.length > 0 && this.state.showOptions && this.props.value && <OptionList
                    options={this.state.filteredOptions}
                    onClick={this.onClick}
                    selectedOptionIndex={this.state.activeOption}
                />}
            </div>
        );
    }
}



SearchInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    suggestedOptions: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
    suggestedOptions: [],
}

export default SearchInput;

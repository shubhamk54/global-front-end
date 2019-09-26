import React, { Component } from "react";
import PropTypes from "prop-types";

import OptionList from './OptionsList';

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
            activeOption: -1,
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
            filteredOptions,
            showOptions: true,
        }, () => this.props.onChange(this.props.name, inputValue, true));
    };

    onOptionClick = value => {
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

    onSearchClick = e => {
        this.setState({
            showOptions: false,
        }, () => this.props.onSearchClick());
    };

    onInputClick = e => {
        this.setState(prevState => ({
            showOptions: !prevState.showOptions
        }));
    }

    render() {
        return (
            <div className="search-input">
                <input
                    type="text"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    onClick={this.onInputClick}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                />
                <button
                    onClick={this.onSearchClick}
                ><i className="fa fa-search"></i></button>

                {this.state.filteredOptions.length > 0 && this.state.showOptions && this.props.value && <OptionList
                    options={this.state.filteredOptions}
                    onClick={this.onOptionClick}
                    selectedOptionIndex={this.state.activeOption}
                />}
            </div>
        );
    }
}



SearchInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    suggestedOptions: PropTypes.array,
    onSearchClick: PropTypes.func,
};

SearchInput.defaultProps = {
    suggestedOptions: [],
    placeholder: 'Search...',
}

export default SearchInput;

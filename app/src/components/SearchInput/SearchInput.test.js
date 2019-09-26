
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchInput from './SearchInput.js';
import OptionList from './OptionsList';


const fakeProps = {
  suggestedOptions: ['test-1', 'test-2'],
  name: 'test',
  value: 'test val',
  placeholder: 'Search...',
  onChange: () => jest.fn(),
  onSearchClick: () => jest.fn(),
};

describe('Snapshot testing for SearchInput component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<SearchInput {...fakeProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test SearchInput component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <SearchInput {...fakeProps} />,
    );
  });

  it('Component tests value simulation for SearchInput component', () => {
    const input = wrapper.find('input');
    const newValue = 'test val';
    input.simulate('change', { target: { value: newValue } });
    expect(wrapper.props().value).toEqual(newValue);
  });


  it('Component tests Options in dropdown are vailable when on click for SearchInput component', () => {
    const input = wrapper.find('input');
    const showOptionsChanged = true;
    input.simulate('click');
    expect(wrapper.state().showOptions).toEqual(showOptionsChanged);
  });

  it('Component tests Options should not change in dropdown when user press down arrow key for SearchInput component', () => {
    const input = wrapper.find('input');
    const activeOptionChanged = -1;
    input.simulate('keydown');
    expect(wrapper.state().activeOption).toEqual(activeOptionChanged);
  });


  it('Component tests Options should move on list above in dropdown when user press up arrow key for SearchInput component', () => {
    wrapper.setState({
      activeOption: 1,
    });
    const input = wrapper.find('input');
    const activeOptionChanged = 0;
    input.simulate('keydown', { keyCode: 38 });
    expect(wrapper.state().activeOption).toEqual(activeOptionChanged);
  });

  it('Component tests Options should not update the state for activeOptions when user press up arrow key for SearchInput component', () => {
    const input = wrapper.find('input');
    const activeOptionChanged = -1;
    input.simulate('keydown', { keyCode: 38 });
    expect(wrapper.state().activeOption).toEqual(activeOptionChanged);
  });


  it('Component tests Options should not update list in dropdown when user press down arrow key for SearchInput component', () => {
    wrapper.setState({
      activeOption: 3,
      filteredOptions: fakeProps.suggestedOptions,
    });
    const input = wrapper.find('input');
    const activeOptionChanged = 3;
    input.simulate('keydown', { keyCode: 40 });
    expect(wrapper.state().activeOption).toEqual(activeOptionChanged);
  });

  it('Component tests Options should move on list below in dropdown when user press Down arrow key for SearchInput component', () => {
    wrapper.setState({
      activeOption: 2,
    });
    const input = wrapper.find('input');
    const activeOptionChanged = 3;
    input.simulate('keydown', { keyCode: 40 });
    expect(wrapper.state().activeOption).toEqual(activeOptionChanged);
  });

  it('Component tests Options should be selected from the list when user press Enter key for SearchInput component', () => {
    const input = wrapper.find('input');
    input.simulate('keydown', { keyCode: 13 });
    expect(wrapper.state().activeOption).toEqual(0);
    expect(wrapper.state().showOptions).toEqual(false);
  });


  it('Test for options dropdown is closed for SearchInput component', () => {
    const input = wrapper.find('button');
    const showOptionsChanged = false;
    input.simulate('click');
    expect(wrapper.state().showOptions).toEqual(showOptionsChanged);
  });


  it('OptionList should render for SearchInput component', () => {
    const input = wrapper.find('input');
    const showOptionsChanged = true;
    input.simulate('click');
    expect(wrapper.state().showOptions).toEqual(showOptionsChanged);
  });

  it('Test for options on click event as it should reset', () => {
    wrapper.instance().onOptionClick(fakeProps.value);
    expect(wrapper.state().activeOption).toEqual(0);
    expect(wrapper.state().filteredOptions).toEqual([]);
    expect(wrapper.state().showOptions).toEqual(false);
  });

  it('Test for optionsList is rending as child', () => {
    wrapper.setState({
      filteredOptions: ['test-1', 'test-2'],
      showOptions: true,
    });
    expect(wrapper.find(OptionList)).toHaveLength(1);
  });
});

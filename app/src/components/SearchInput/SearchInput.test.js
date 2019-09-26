
import React from 'react';
import SearchInput from './SearchInput.js';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const fakeProps = {
    suggestedOptions: [],
    name: 'test',
    value: 'test val',
    placeholder: 'Search...',
    onChange: () => { },
};

describe('Snapshot testing for SearchInput component', () => {

    it('matches the snapshot', () => {
        const tree = renderer.create(<SearchInput {...fakeProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('Should render SearchInput component', () => {
    const wrapper = mount(
        <SearchInput {...fakeProps} />
    );
    const searchInputWrapper = wrapper.find('.search-input');
    expect(searchInputWrapper.text()).toBeTruthy();
});
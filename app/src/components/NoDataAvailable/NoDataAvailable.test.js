import React from 'react';
import NoDataAvailable from './NoDataAvailable.js';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const fakeProps = {
    title: 'Data not available',
    subTitle: '',
};

describe('Snapshot testing for NoDataAvailable component', () => {

    it('matches the snapshot', () => {
        const tree = renderer.create(<NoDataAvailable {...fakeProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('NoDataAvailable renders the title inside it', () => {
    const wrapper = mount(
        <NoDataAvailable {...fakeProps} />
    );
    const title = wrapper.find('.no-data-title');
    expect(title.text()).toEqual(fakeProps.title);
});

test('NoDataAvailable renders the sub-title inside it', () => {
    const wrapper = mount(
        <NoDataAvailable {...fakeProps} />
    );
    const subTitle = wrapper.find('.no-data-subTitle');
    expect(subTitle.text()).toEqual(fakeProps.subTitle);
});

test('NoDataAvailable renders section, title, and sub-title', () => {
    const wrapper = mount(
        <NoDataAvailable {...fakeProps} />
    );
    const section = wrapper.find('.no-data');
    const title = wrapper.find('.no-data-title');
    const subTitle = wrapper.find('.no-data-subTitle');

    expect(section.text()).toBeTruthy();
    expect(title.text()).toEqual(fakeProps.title);
    expect(subTitle.text()).toEqual(fakeProps.subTitle);
});

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import NoDataAvailable from './NoDataAvailable.js';

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

describe('Unit tests for NoDataAvailable component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <NoDataAvailable {...fakeProps} />,
    );
  });

  it('NoDataAvailable renders the title inside it', () => {
    const title = wrapper.find('.no-data-title');
    expect(title.text()).toEqual(fakeProps.title);
  });

  it('NoDataAvailable renders the sub-title inside it', () => {
    const subTitle = wrapper.find('.no-data-subTitle');
    expect(subTitle.text()).toEqual(fakeProps.subTitle);
  });

  it('NoDataAvailable renders section, title, and sub-title', () => {
    const section = wrapper.find('.no-data');
    const title = wrapper.find('.no-data-title');
    const subTitle = wrapper.find('.no-data-subTitle');

    expect(section.text()).toBeTruthy();
    expect(title.text()).toEqual(fakeProps.title);
    expect(subTitle.text()).toEqual(fakeProps.subTitle);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import OptionsList from './OptionsList.js';

const fakeProps = {
  options: ['test-1', 'test-2', 'test-3'],
  selectedOptionIndex: 1,
  onClick: () => jest.fn(),
};

describe('Snapshot testing for OptionsList component', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<OptionsList {...fakeProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Chldern rendering tests for OptionsList component', () => {
  it('OptionsList renders single ul tag', () => {
    const wrapper = mount(<OptionsList {...fakeProps} />);

    expect(wrapper.find('ul').children()).toHaveLength(fakeProps.options.length);
  });

  it('OptionsList text on click event', () => {
    const mockCallBack = jest.fn();

    const wrapper = mount(
      <OptionsList
        options={fakeProps.options}
        selectedOptionIndex={fakeProps.selectedOptionIndex}
        onClick={mockCallBack}
      />,
    );
    const lists = wrapper.find('li');
    lists.forEach((li, index) => {
      li.simulate('click', fakeProps.options[index]);
    });
    expect(mockCallBack.mock.calls.length).toEqual(3);
  });
});

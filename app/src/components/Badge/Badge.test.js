import React from 'react';
import Badge from './Badge.js';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

const fakeProps = { displayName: 'Active' };

describe('Snapshot testing for Badge component', () => {

    it('matches the snapshot', () => {
        const tree = renderer.create(<Badge {...fakeProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Badge renders the text inside it', () => {
        const wrapper = mount(
            <Badge {...fakeProps} />
        );
        const span = wrapper.find('.badge');
        expect(span.text()).toBe(fakeProps.displayName);
    });

    test('Badge renders the text inside it', () => {
        const wrapper = mount(
            <Badge {...fakeProps} />
        );
        const span = wrapper.find('.badge');
        expect(span.text()).not.toBe('Invalid');
    });

});

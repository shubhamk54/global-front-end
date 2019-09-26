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
});

describe('Unit tests for Badge component', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = mount(
            <Badge {...fakeProps} />
        );
    });

    it('Badge renders the text inside it', () => {
        const span = wrapper.find('.badge');
        expect(span.text()).toBe(fakeProps.displayName);
    });

    it('Badge renders the text inside it', () => {
        const span = wrapper.find('.badge');
        expect(span.text()).not.toBe('Invalid');
    });

});

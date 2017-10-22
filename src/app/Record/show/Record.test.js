import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Record from './Record';

test('Record displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <Record
            id="1234567890"
            first_name="FirstName"
            last_name="LastName"
            phone_number="5555555555"
            onUpdateClick={() => {}}
            onDelete={() => {}}
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
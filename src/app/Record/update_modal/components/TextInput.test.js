import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TextInput from './TextInput';

test('TextInput displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <TextInput
            value="abc"
            id="def"
            onChange={() => {}}
            tab_index={1}
            label="Label"
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
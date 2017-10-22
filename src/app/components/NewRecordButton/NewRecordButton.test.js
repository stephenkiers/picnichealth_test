import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import NewRecordButton from './NewRecordButton';

test('NewRecordButton displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <NewRecordButton
            onClick={() => {}}
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Modal from './Modal';

test('Modal displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <Modal
            closeModal={() => {}}
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
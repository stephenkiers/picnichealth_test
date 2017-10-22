import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import App from './App';

test('App displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <App />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
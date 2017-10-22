import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Stats from './Stats';

test('Stats displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <Stats
            total_records={1}
            avg_per_hour={2}
            records_last_hour_ratio={3}
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
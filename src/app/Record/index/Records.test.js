import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Records from './Records';
import {Map, Set} from 'immutable'

test('Records displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <Records
            records={Set([
                Map({
                    id: "a1b2",
                    first_name: "FirstName",
                    last_name: "LastName",
                    phone_number: "55555555555",
                    created_at: 123456,
                    state: "idle",
                }),
                Map({
                    id: "c3d4",
                    first_name: "FirstName2",
                    last_name: "LastName2",
                    phone_number: "6666666666",
                    created_at: 654321,
                    state: "idle",
                })
            ])}
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
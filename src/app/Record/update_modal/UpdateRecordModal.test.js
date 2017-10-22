import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import UpdateRecordModal from './UpdateRecordModal';

test('UpdateRecordModal displays correct', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(
        <UpdateRecordModal
            id="1234567890"
            first_name="FirstName"
            last_name="LastName"
            phone_number="5555555555"
            created_at={123456}
            onSave={() => {}}
        />
    );
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot();
});
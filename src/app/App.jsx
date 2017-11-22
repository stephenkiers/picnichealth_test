import React, { Component } from 'react'
import ApplicationLayout from "./layouts/ApplicationLayout";
import GdaxQuoter from "./GdaxQuoter/GdaxQuoter";

class App extends Component {
    render () {
        return (
            <ApplicationLayout>
                <GdaxQuoter />
            </ApplicationLayout>
        )
    }
}

export default App;
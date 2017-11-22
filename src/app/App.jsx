import React, { Component } from 'react'
import ApplicationLayout from "./layouts/ApplicationLayout";
import ThingsContainer from "./Thing/index/ThingsContainer";
import ThingNewContainer from "./Thing/new/ThingNewContainer";
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
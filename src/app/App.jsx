import React, { Component } from 'react'
import ApplicationLayout from "./layouts/ApplicationLayout";
import ThingsContainer from "./Thing/index/ThingsContainer";
import ThingNewContainer from "./Thing/new/ThingNewContainer";

class App extends Component {
    render () {
        return (
            <ApplicationLayout>
                <ThingsContainer />
                <ThingNewContainer />
            </ApplicationLayout>
        )
    }
}

export default App;
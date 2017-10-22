import React, { Component } from 'react'
import ApplicationLayout from "./layouts/ApplicationLayout";
import ThingsContainer from "./Thing/index/ThingsContainer";

class App extends Component {
    render () {
        return (
            <ApplicationLayout>
                <ThingsContainer />
            </ApplicationLayout>
        )
    }
}

export default App;
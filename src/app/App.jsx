import React, { Component } from 'react'
import RecordsContainer from "./Record/index/RecordsContainer";
import NewRecordButtonContainer from "./components/NewRecordButton/NewRecordButtonContainer";
import UpdateRecordModalContainer from "./Record/update_modal/UpdateRecordModalContainer";
import StatsContainer from "./AppState/Stats/StatsContainer";
import ApplicationLayout from "./layouts/ApplicationLayout";

class App extends Component {
    render () {
        return (
            <ApplicationLayout>
                Container
            </ApplicationLayout>
        )
    }
}

export default App;
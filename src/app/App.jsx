import React, { Component } from 'react'
import RecordsContainer from "./Record/index/RecordsContainer";
import NewRecordButtonContainer from "./components/NewRecordButton/NewRecordButtonContainer";
import UpdateRecordModalContainer from "./Record/update_modal/UpdateRecordModalContainer";
import StatsContainer from "./AppState/Stats/StatsContainer";

class App extends Component {
    render () {
        return (
            <div>
                <header>
                    <h1>
                        <img src="https://palcehold.it/50x50" />
                        <span>
                            React Test Application
                        </span>
                    </h1>
                </header>
                <div className="container">
                    <div className="universal-actions clearfix">
                        <div className="pull-right">
                            <StatsContainer />
                        </div>
                        <div className="pull-left">
                            <NewRecordButtonContainer />
                        </div>
                    </div>
                    <RecordsContainer />
                </div>
                <UpdateRecordModalContainer />
            </div>
        )
    }
}

export default App;
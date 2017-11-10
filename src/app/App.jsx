import React, { Component } from 'react'
import ApplicationLayout from "./layouts/ApplicationLayout";
import SnomedCtConceptSearch from "./SnomedCt/ConceptSearch/SnomedCtConceptSearch";

class App extends Component {
    render () {
        return (
            <ApplicationLayout>
                <div className="row">
                    <div className="col-4">
                        Sidebar for instructions later
                    </div>
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" tabIndex={1} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Example select</label>
                                <select className="form-control" id="exampleFormControlSelect1" tabIndex={2}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <SnomedCtConceptSearch
                                tabIndex={3}
                            />

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                                <select multiple className="form-control" id="exampleFormControlSelect2" tabIndex={4}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"  tabIndex={5} />
                            </div>
                        </form>
                    </div>
                </div>
            </ApplicationLayout>
        )
    }
}

export default App;
import React, { Component } from 'react'
import ApplicationLayout from "./layouts/ApplicationLayout";
import SnomedCtConceptSearch from "./SnomedCt/ConceptSearch/SnomedCtConceptSearch";

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentInputId: undefined,
            ctConceptId: undefined,
        };
        this.handleCtConceptIdChange = (ctConceptId) => {
            this.setState(() => ({ctConceptId}));
        };
        this.onFocus = e => {
            // I really don't like this, but cannot think of a better solution at the moment
            const currentInputId = e.target.id;
            this.setState(() => ({currentInputId}))
        }
    }
    render () {
        return (
            <ApplicationLayout>
                <div className="row">
                    <div className="col-4">
                        <div className="sidebar">
                            <h2>
                                Overview Video
                            </h2>
                            <a href="https://www.youtube.com/v/bU2esIZHMGg?version=3&vq=hd1080" target="_blank" className="youtube-video">
                                <span className="glyphicons glyphicons-play-button" />
                                <img src="http://img.youtube.com/vi/bU2esIZHMGg/mqdefault.jpg" className="sidebar-image" />
                            </a>
                            <h2>Github Link</h2>
                            <p>
                                <a href="https://github.com/stephenkiers/picnichealth_test" target="_blank">
                                    View source here
                                </a>
                            </p>

                            <h2>Special Thanks</h2>
                            <p>
                                Data lookups provided by the <a href="https://snomed.terminology.tools/#/content#top" target="_blank">SNOMED Terminology Server</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-8">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Email address</label>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" tabIndex={1}
                                       onFocus={this.onFocus}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Example select</label>
                                <select className="form-control" id="exampleFormControlSelect1" tabIndex={2}
                                        onFocus={this.onFocus}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>

                            <SnomedCtConceptSearch
                                id="SnomedCtConceptInput"
                                tabIndex={3}
                                value={this.state.ctConceptId}
                                onChange={this.handleCtConceptIdChange}
                                /* want to find better way to do the below */
                                currentInputId={this.state.currentInputId}
                                onFocus={this.onFocus}
                            />

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                                <select multiple className="form-control" id="exampleFormControlSelect2" tabIndex={4}
                                        onFocus={this.onFocus}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"  tabIndex={5}
                                          onFocus={this.onFocus}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </ApplicationLayout>
        )
    }
}

export default App;
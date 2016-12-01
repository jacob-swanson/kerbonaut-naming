import React, {Component} from 'react';
import './App.css';
import KerbalGenerator from './KerbalGenerator'
import KerbalGender from './KerbalGender'

class App extends Component {
    state = {
        numKerbals: 12,
        kerbalGender: null,
        kerbals: []
    };

    componentDidMount() {
        this.updateKerbals();
    }

    updateKerbals() {
        const {numKerbals, kerbalGender} = this.state;

        const kerbals = [];
        for (let i = 0; i < numKerbals; i++) {
            if (kerbalGender) {
                kerbals.push(KerbalGenerator.generate(kerbalGender));
            } else {
                kerbals.push(KerbalGenerator.generateRandom());
            }
        }
        this.setState(prevState => ({...prevState, kerbals}));
    }

    onNumKerbalsChange = (e) => {
        const numKerbals = Math.max(0, Math.min(e.target.value, 1000));

        this.setState(prevState => ({...prevState, numKerbals}));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.updateKerbals();
    };

    setGenderRandom = () => {
        this.setState(prevState => ({...prevState, kerbalGender: null}))
    };

    setGenderMale = () => {
        this.setState(prevState => ({...prevState, kerbalGender: KerbalGender.Male}))
    };

    setGenderFemale = () => {
        this.setState(prevState => ({...prevState, kerbalGender: KerbalGender.Female}))
    };

    getGenderCssClass(kerbal) {
        switch (kerbal.gender) {
            case KerbalGender.Male:
                return 'kerbal-male';
            case KerbalGender.Female:
                return 'kerbal-female';
            default:
                throw new Error("Unknown gender", kerbal.gender);
        }
    }

    render() {
        let i = 0;
        const kerbalComponents = this.state.kerbals.map(kerbal => (
            <li key={i++}
                className={"list-group-item col-sm-3 " + (this.getGenderCssClass(kerbal))}>{kerbal.name}</li>));
        const year = new Date().getFullYear();

        return (
            <div className="App">
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Kerbonaut Naming</h1>
                        <p>Generate random Kerbonaut names</p>
                        <p>
                            <a className="github-button"
                               href="https://github.com/jacob-swanson/kerbonaut-naming"
                               data-style="mega"
                               data-count-href="/jacob-swanson/kerbonaut-naming/stargazers"
                               data-count-api="/repos/jacob-swanson/kerbonaut-naming#stargazers_count"
                               data-count-aria-label="# stargazers on GitHub"
                               aria-label="Star jacob-swanson/kerbonaut-naming on GitHub">
                                Star
                            </a>
                        </p>
                    </div>
                </div>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="form-group col-sm-3">
                                <label>Number of names to generate</label>
                                <input type="number"
                                       className="form-control"
                                       onChange={this.onNumKerbalsChange}
                                       value={this.state.numKerbals}/>
                            </div>
                        </div>
                        <fieldset className="form-group">
                            <legend>Gender</legend>
                            <label className="form-check-inline">
                                <input type="radio"
                                       className="form-check-input"
                                       name="genderRadios"
                                       checked={this.state.kerbalGender === null}
                                       onChange={this.setGenderRandom}/>
                                {' '}Random
                            </label>
                            <label className="form-check-inline">
                                <input type="radio"
                                       className="form-check-input"
                                       name="genderRadios"
                                       checked={this.state.kerbalGender === KerbalGender.Male}
                                       onChange={this.setGenderMale}/>
                                {' '}Male
                            </label>
                            <label className="form-check-inline">
                                <input type="radio"
                                       className="form-check-input"
                                       name="genderRadios"
                                       checked={this.state.kerbalGender === KerbalGender.Female}
                                       onChange={this.setGenderFemale}/>
                                {' '}Female
                            </label>
                        </fieldset>
                        <button type="submit" className="btn btn-primary">Generate</button>
                    </form>
                    <hr/>
                    <ul className="list-group">
                        {kerbalComponents}
                    </ul>
                </div>
                <nav className="navbar navbar-light bg-faded navbar-fixed-bottom">
                    <div className="container text-xs-center">
                        Copyright &copy; {year} Jacob Swanson. All rights reserved.
                    </div>
                </nav>
            </div>
        );
    }
}

export default App;

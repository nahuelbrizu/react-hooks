import React, { Component } from "react";
import { render } from "react-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import LoginRegister from "react-mui-login-register";
import Result from "./Result";

class App extends Component {
    state = {
        results: [],
        disableLocal: false,
        disableRegister: false
    };

    render() {
        return (
            <div>
                <LoginRegister
                    onLogin={this.handleLogin}
                    onRegister={this.handleRegister}
                    providers={[]}
                />
            </div>
        );
    }

    handleLogin = content => {
        this.addResult(`Logging in with ${JSON.stringify(content)}`);
    };
    handleLoginWithProvider = provider => {
        this.addResult(`Logging in with provider=${provider}`);
    };
    handleRegister = content => {
        this.addResult(`Registering with ${JSON.stringify(content)}`);
    };
    handleRegisterWithProvider = provider => {
        this.addResult(`Registering with provider=${provider}`);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    addResult = msg => {
        this.setState(prevState => {
            return {
                results: [...prevState.results, msg]
            };
        });
    };
}

render(<App />, document.getElementById("root"));

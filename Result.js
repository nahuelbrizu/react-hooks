import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Result extends Component {
    state = {
        open: true
    };

    render() {
        const { message } = this.props;

        return (
            <Snackbar
                open={this.state.open}
                message={<span>{message}</span>}
                onClose={this.handleClose}
                autoHideDuration={2000}
                action={[
                    <IconButton key="close" onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        );
    }

    handleClose = () => {
        this.setState({ open: false });
    };
}

export default Result;

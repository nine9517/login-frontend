import React, { Component } from "react";
import Background from '../layout/Background';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import 'bulma/css/bulma.css';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        const id = sessionStorage.getItem("id");
        if(id!=null){
            this.props.history.push('/home')
        }
        this.state = {
            alert: null,
            email: "",
            pass: ""
        };
    }

    goToRegister() {
        this.props.history.push('/register')
    }

    login() {
        if(this.state.email=="" || this.state.pass=="" || this.state.conpass==""){
            this.popup("Error : Please fill in all information.", "error");
        }else{
        axios.post('https://login-api-59161100.herokuapp.com/api/users/login', {
            email: this.state.email,
            password: this.state.pass
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status == 0) {
                    sessionStorage.setItem("id", response.data.id);
                    this.popup(response.data.message, "success");
                } else {
                    this.popup(response.data.message, "error");
                }

            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.popup("Error", "error");
            }.bind(this));
        }
    }

    popup(txt, type) {
        const getAlert = () => (
            <SweetAlert
                type={type}
                title="Login"
                onConfirm={() => this.hideAlert()}
            >
                {txt}
            </SweetAlert>
        );

        this.setState({
            alert: getAlert()
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
        if(sessionStorage.getItem("id")!=null){
            this.props.history.push('/home')
        }
    }

    updateInputEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    updateInputPass(e) {
        this.setState({
            pass: e.target.value
        });
    }
    responefacebook(respone){
        axios.post('https://login-api-59161100.herokuapp.com/api/users/login/facebook', {
            email: respone.email,
            picture: respone.picture.data.url
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status == 0) {
                    sessionStorage.setItem("id", response.data.id);
                    this.popup(response.data.message, "success");
                } else {
                    this.popup(response.data.message, "error");
                }

            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.popup("Error", "error");
            }.bind(this));
    }

    render() {
        return (
            <Background>
                <h1 className="title has-text-centered">Welcome</h1>
                <div className="field">
                    <div className="control has-icons-left">
                        <span class="icon is-small is-left icon-input">
                            <FontAwesomeIcon size="2x" icon={faEnvelope} className="icon-input" />
                        </span>
                        <input className="input is-large" type="email" onChange={evt => this.updateInputEmail(evt)} placeholder="Email" value={this.state.email} />
                    </div>
                </div>
                <div className="field">
                    <div className="control has-icons-left">
                        <span class="icon is-small is-left icon-input">
                            <FontAwesomeIcon size="2x" icon={faLock} className="icon-input" />
                        </span>
                        <input className="input is-large" type="password" placeholder="Password" onChange={evt => this.updateInputPass(evt)} value={this.state.pass} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-fullwidth bt-login is-large" onClick={() => this.login()}>Login</button>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <FacebookLogin
                            appId="714280018931580"
                            autoLoad={false}
                            size="medium"
                            scope="public_profile"
                            fields="name,email,picture"
                            callback={this.responefacebook.bind(this)}
                        />
                    </div>
                </div>
                <hr></hr>
                <div className="field">
                    <div className="control">
                        <button className="button is-fullwidth bt-register is-large" onClick={() => this.goToRegister()}>
                            Register
                        </button>
                    </div>
                </div>
                {this.state.alert}
            </Background>

        );
    }
}

export default Login;
import React, { Component } from "react";
import Background from '../layout/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faLock } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import 'bulma/css/bulma.css';
import './Register.css';

class Register extends Component {
    success = false;
    constructor(props) {
        super(props);
        const id = sessionStorage.getItem("id");
        if(id!=null){
            this.props.history.push('/home')
        }
        this.state = {
            alert: null,
            email: "",
            pass: "",
            conpass: ""
        };
       
    }
    confirm(){
        if(this.state.pass!=this.state.conpass){
            this.popup("Error : Password and Confirm Password not match.", "error");
        }else if(this.state.email=="" || this.state.pass=="" || this.state.conpass==""){
            this.popup("Error : Please fill in all information.", "error");
        }else{
            axios.post('https://login-api-59161100.herokuapp.com/api/users/register', {
            email: this.state.email,
            password:this.state.pass,
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status == 0) {
                    this.success=true;
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
                title="Register"
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
        if(this.success){
            this.props.history.push('/')
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
    updateInputConPass(e) {
        this.setState({
            conpass: e.target.value
        });
    }
    render() {
        return (
            <Background>
                <h1 className="title has-text-centered">Register</h1>
                <div className="field">
                    <div className="control has-icons-left">
                        <span class="icon is-small is-left icon-input">
                            <FontAwesomeIcon size="2x" icon={faEnvelope} className="icon-input" />
                        </span>
                        <input className="input is-large" type="email" onChange={evt => this.updateInputEmail(evt)} placeholder="Email" value={this.state.email}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control has-icons-left">
                        <span class="icon is-small is-left icon-input">
                            <FontAwesomeIcon size="2x" icon={faLock} className="icon-input" />
                        </span>
                        <input className="input is-large" type="password" onChange={evt => this.updateInputPass(evt)} placeholder="Password" value={this.state.pass}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control has-icons-left">
                        <span class="icon is-small is-left icon-input">
                            <FontAwesomeIcon size="2x" icon={faLock} className="icon-input" />
                        </span>
                        <input className="input is-large" type="password" onChange={evt => this.updateInputConPass(evt)} placeholder="Confirm Password" value={this.state.conpass}/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-fullwidth bt-register is-large" onClick={() => this.confirm()}>
                        Confirm
                        </button>
                    </div>
                </div>
                {this.state.alert}
            </Background>
        );
    }
}

export default Register;
import React, { Component } from "react";
import Background from '../layout/Background';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bulma/css/bulma.css';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        const id = sessionStorage.getItem("id");
        if(id==null){
            this.props.history.push('/')
        }
        this.state = {
            img:"http://bcnnow.decodeproject.eu/img/users/no-image.jpg",
            email:"example@domain.com",
            history:[],
            alert: null
        };
        
        axios.get('https://login-api-59161100.herokuapp.com/api/users/getdata/'+id)
            .then(function (response) {
                console.log(response);
                this.setState({
                    img:response.data.data.picture,
                    email:response.data.data.email,
                    history:response.data.data.history_login
                });

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this));
        
    }
    
    logout() {
        sessionStorage.removeItem("id");
        this.props.history.push('/')
    }
    
    render() {
        
        return (
            <Background>
                <div className="has-text-right">
                    <FontAwesomeIcon size="2x" icon={faSignOutAlt} onClick={() => this.logout()} className="icon-input" />
                </div>
                <div className="logoUser has-text-centered">
                    <figure className="image is-128x128">
                        <img className="is-rounded" src={this.state.img} />
                    </figure>
                </div>
                <h2 className="title has-text-centered">{this.state.email}</h2>
                <div>
                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                                {  
                                    this.state.history.map((val, i) => { 
                                        let date = new Date(val);
                                        return (
                                            <tr>
                                                <td>{ i+1 }</td>
                                                <td>{date.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok'})}</td>
                                            </tr>
                                        ) 
                                    })
                                }
                            
                        </tbody>
                    </table>
                </div>
            </Background>
                );
            }
        }
        
export default Home;
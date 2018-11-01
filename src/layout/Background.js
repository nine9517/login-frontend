import React, { Component } from "react";
import 'bulma/css/bulma.css';
import './Background.css';

class Background extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <section className="section hero is-fullheight has-background-white-ter bgpatterns">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-mobile is-centered">
                            <div className="column is-two-fifths"> 
                                <div className="box">
                                    <div className="media-content">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Background;
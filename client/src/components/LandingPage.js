import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import video from '../lib/videos/Video Of People Walking.mp4';

export default class LandingPage extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <section className='landing-page'>
                <video
                    src={video}
                    autoPlay
                    loop
                >
                </video>
                <div className='welcome'>
                    <div className='welcome-modal'>
                        <h1 className='title'><i className="material-icons">add_location</i>MapSocial</h1>
                        <h3 className='tag'>Your guide to find and share new experiences.</h3>
                        <Link to='/map'>
                            <button>Start Adventuring</button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}
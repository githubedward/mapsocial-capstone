import React, { Component } from 'react';
import Following from './Following';

export default class Community extends Component {
    state = {
        followings: []
    }

    renderFollowings(person, index, props) {
        return <Following {...props} person={person} key={index} />
    }

    render() {
        return (
            <section className='toggle-container'>
                <div className='community'>
                    <div className='community-header'>
                        <h1>Community</h1>
                    </div>
                    <div className='community-list'>
                        {this.props.followings ? this.props.followings.map((person, index) => 
                        this.renderFollowings(person, index, {...this.props})) : null}
                    </div>
                </div>
            </section>
        )
    }
}


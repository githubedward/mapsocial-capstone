import React, { Component } from 'react';

export default class Profile extends Component {
    render() {
        const { userInfo } = this.props
        return (
            <section className='toggle-container'>
                <div className='profile'>
                    <h1>My Profile</h1>
                    <div className='profile-details'>
                        <h3>First Name: <span>{userInfo.first_name}</span></h3>
                        <h3>Last Name: <span>{userInfo.last_name}</span></h3>
                    </div>
                </div>
            </section>
        )
    }
}
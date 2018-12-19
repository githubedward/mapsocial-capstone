import React, { Component } from 'react';

export default class Following extends Component {
    state = {
        active: false,
    }

    componentDidMount() {
        const index = this.props.otherPlaces.findIndex(place => {
            return place.user_id._id === this.props.person._id
            })
        if (index !== -1) {
            this.setState({active: true})
        }
    }

    onClick = (id) => {
        if (!this.state.active) {
            this.props.onGetOtherPlaces(id, 'add');
            this.setState({
                active: true
            })
        } else {
            this.props.onGetOtherPlaces(id, 'remove')
            this.setState({
                active: false
            })
        }
    }

    render() {
        const { _id, avatar, first_name, last_name, status } = this.props.person
        const { active } = this.state;
        return (
            <div id={_id} className='following'>
                <div className='following-left'>
                    {avatar ?  <img src={avatar} alt="avatar"/> : <i className="material-icons">person</i>}
                    <div className='following-left__info'>
                        <h4>{`${first_name} ${last_name}`}</h4>
                        <p>"{status}"</p>
                    </div>
                </div>
                <div className='following-right'>
                    <button onClick={() => this.onClick(_id)} type='button' name='view-profile-btn' className={`view-profile ${active ? 'active' : ''}`}>{active ? 'Disable' : 'View Map'}</button>
                    <button type='button' name='unfollow-btn' className='unfollow'>Unfollow</button>
                </div>
            </div>
        )
    }
}


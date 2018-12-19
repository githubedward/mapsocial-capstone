import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

class Navside extends Component {
    state = {
        active: 'map'
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            const { pathname } = this.props.location;
            if ( pathname === '/') this.setState({active: '/'})
            else if ( pathname === '/map/profile' ) this.setState({active: 'profile'})
            else if ( pathname === '/map/community' ) this.setState({active: 'community'})
            else if ( pathname === '/map/social/all' ) this.setState({active: 'social'})
            else if ( pathname === '/map' ) this.setState({active: 'map'});
        }
    }

    renderAvatar() {
        return <img className={`top-avatar ${this.state.active === 'profile' ? 'active' : null}`} src={this.props.avatar} alt="Avatar" />
    }

    onActive = (active) => {
        if (active === this.state.active) {
            return 'active'
        } else {
            return ''
        }
    }

    render () {
        return (
            <nav>
                <div className='top'>
                    <Link to='/opening'>
                        <i className={`material-icons top-home ${this.onActive('opening')}`}>home</i>
                    </Link>
                    <Link to='/map/profile'> 
                        { this.props.avatar ? this.renderAvatar() : <i className={`material-icons ${this.onActive('profile')}`}>person</i>}
                    </Link>
                    <Link to='/map/community'>
                        <i className={`material-icons top-community ${this.onActive('community')}`}>group</i>
                    </Link>
                    <Link to='/map/social/all'>
                        <i className={`material-icons top-feed ${this.onActive('social')}`}>chat</i>
                    </Link>
                    <Link to='/map'>
                        <i className={`material-icons top-pin ${this.onActive('map')}`}>place</i>
                    </Link>
                </div>
                <div className='bottom'>
                    <i className="material-icons">help_outline</i>
                    <i className="material-icons">settings</i>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navside);
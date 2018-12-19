import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

export default class Feed extends Component {
    state = {
        active: ''
    }

    componentDidMount() {
        const { pathname } = this.props.location;
        if (pathname === '/map/social/all') {
            this.setState({ active: 'all' })
        } else {
            this.setState({ active: 'personal' })
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            const { pathname } = this.props.location;
            if (pathname === '/map/social/all') {
                this.setState({ active: 'all' })
            } else {
                this.setState({ active: 'personal' })
            }
        }
    }

    onActive = (active) => {
        if (active === this.state.active) {
            return 'active'
        } else {
            return ''
        }
    }

    renderContentList() {
        const { pathname } = this.props.location;
        const { userInfo, otherPlaces } = this.props
        const myContentsJSX = userInfo.contents.sort().reverse().map((content, index) => {
            return <Post content={content} userInfo={userInfo} key={index} />
        })
        if (pathname === '/map/social/all') {
            const otherPlacesID = otherPlaces.map(place => place._id)
            const allContentsJSX = userInfo.followings.map(followings => {
                return followings.contents
                    .filter(content => otherPlacesID.includes(content.place_id))
                    .map((content, index) => {
                        return <Post content={content} userInfo={followings} key={index} />
                    })
            })
            return allContentsJSX.concat(myContentsJSX).sort((a, b) => {
                return a.timestamp - b.timestamp
            })
        }
        return myContentsJSX
    }

    render() {
        return (
            <section className='toggle-container'>
                <div className='feed'>
                    <div className="feed-header">
                        <div className='feed-header__title'>
                            <h1>Social Feed</h1>
                        </div>
                        <div className='feed-header__filter'>
                            <Link to='/map/social/all'>
                                <div className={this.onActive('all')}>View All Posts</div>
                            </Link>
                            <Link to='/map/social'>
                                <div className={this.onActive('personal')}>View My Posts</div>
                            </Link>
                        </div>
                    </div>
                    <div className="feed-list">
                        {this.props.userInfo.contents ? this.renderContentList() : null}
                    </div>
                </div>
            </section>
        )
    }
}


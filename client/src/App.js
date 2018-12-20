import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Map from './components/map/Map';
import Navside from './components/Navside';
import Feed from './components/feed/Feed';
import Community from './components/community/Community';
import Profile from './components/Profile';
import { server_key } from './api_key.js';
import * as func from './lib/functions';
import LandingPage from './components/LandingPage';

const baseURL = 'http://localhost:8080';
const serverKey = `?api_key=${server_key}`;
const userId = '5c095088f174490551984d6b'; /* ed */

const userUrl = `${baseURL}/${userId}${serverKey}`;

class App extends Component {
    state = {
        userInfo: {},
        otherPlaces: [],
        contents: []
    }

    componentDidMount() {
        console.log('App did mount')
        func.fetchRequest('GET', userUrl, (data) => {
            // console.log(data);
            let allContents = [];
            data.followings.forEach(user => allContents.concat(user.contents));
            this.setState({
                userInfo: data,
                contents: allContents.concat(data.contents)
            });
        });
    }

    onUpdateApp = () => {
        func.fetchRequest('GET', userUrl, (data) => {
            this.setState({
                userInfo: data
            });
        });
    }

    // get places on click --> linked from following component
    // if action === 'add' - send get request to the server to retrieved all places of user
    // otherwise, filter otherplaces and remove places w/ specified user id
    onGetOtherPlaces = (userId, action) => {
        // console.log('Calling other places')
        const { otherPlaces } = this.state;
        if (action === 'add') {
            func.fetchRequest('GET', `${baseURL}/${userId}/places${serverKey}`, (data) => {
                // console.log(data);
                this.setState({
                    otherPlaces: [...otherPlaces].concat(data)
                });
            });
        } else {
            this.setState({
                otherPlaces: [...otherPlaces].filter(place => place.user_id._id !== userId)
            })
        }
    }

    render() {
        // console.log(this.state.contents)
        return (
            <Router>
                <div className="App">
                    <Route path='/' exact render={()=> <Redirect to='/opening' />} />
                    <Route path='/opening' exact component={LandingPage}></Route>
                    <Route path='/map/social' render={(props) => 
                        <Feed {...props} userInfo={this.state.userInfo} onUpdateApp={this.onUpdateApp} contents={this.state.contents} otherPlaces={this.state.otherPlaces} />}>
                    </Route>
                    <Route path='/map/community' exact render={(props) =>
                        <Community {...props} userInfo={this.state.userInfo} followings={this.state.userInfo.followings} 
                        onUpdateApp={this.onUpdateApp} onGetOtherPlaces={this.onGetOtherPlaces} otherPlaces={this.state.otherPlaces} />}>
                    </Route>
                    <Route path='/map/profile' exact render={(props) =>
                        <Profile {...props} userInfo={this.state.userInfo} onUpdateApp={this.onUpdateApp} />}>
                    </Route>
                    <Route path='/map' render={(props) => 
                        <div>
                            <Navside {...props} avatar={this.state.userInfo.avatar} />
                            <Map {...props} userInfo={this.state.userInfo} onUpdateApp={this.onUpdateApp} otherPlaces={this.state.otherPlaces} />
                        </div>
                        }>
                    </Route>   
                </div>
            </Router>
        );
    }
}

export default App;

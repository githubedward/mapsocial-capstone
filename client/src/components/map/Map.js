import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContentForm from './ContentForm';
import MyMarker from './MyMarker';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { places_key, places_key2, server_key } from '../../api_key';
import * as func from '../../lib/functions';
import mapsCustom from '../../styles/map-styles/custom.json';

const baseURL = 'http://localhost:8080';
const serverKey = `?api_key=${server_key}`;

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: null,

            isToolsActive: false,
            isPlacesActive: false,
            places: [],
            userId: '',
            isAddressShown: false,

            otherPlaces: [],
            isOtherPlacesActive: true,

            // clicked marker
            clickedMarker: {},
            selectedPlace: null,
            isFormWindowOpen: false,

            // mouseover marker
            hoverMarker: {},
            hoverPlace: null,
            isHoverWindowOpen: false,

            // autocomplete place marker/info
            isNewPlaceWindow: false,
            newMarker: null,
            newPlace: {
                lat_lng: null,
                google_id: '',
                address: '',
                name: ''
            },
        }
    }

    componentDidMount() {
        this.renderAutoComplete();
        // console.log(this.props.userInfo)
        const { current_center, _id: userId } = this.props.userInfo;
        func.fetchRequest('GET', `${baseURL}/${userId}/places${serverKey}`, (data) => {
            // console.log(data)
            this.setState({
                places: data,
                isPlacesActive: true,
                position: current_center,
                userId: userId,
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps.map) this.renderAutoComplete();

        
        if (!this.state.position && this.props.userInfo) {
            const { current_center, _id: userId } = this.props.userInfo;
            if (this.props.userInfo !== prevState.userInfo) {
                const placesUrl = `${baseURL}/${userId}/places${serverKey}`;
                func.fetchRequest('GET', placesUrl, (data) => {
                    this.setState({
                        places: data,
                        position: current_center,
                        userId: userId
                    });
                });
            }
        }

        if (this.state.otherPlaces !== this.props.otherPlaces) {
            this.setState({
                otherPlaces: this.props.otherPlaces
            })
        }
    }

    renderAutoComplete() {
        const { google, map } = this.props;

        // if undefined, return
        if (!google || !map) return;

        // instantiate google autocomplete service in location input
        const autocomplete = new google.maps.places.Autocomplete(this.locationInput);
        autocomplete.bindTo('bounds', map)

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const { viewport, location } = place.geometry;

            if (!place.geometry) return;
            // if geometry is found within viewport, display location
            if (viewport) {
                map.fitBounds(viewport);
                map.setCenter(location);
                map.setZoom(17)
                // if geometry is found but not within viewport, set location in center of vport
            } else {
                map.setCenter(location);
                map.setZoom(17)
            }
            // set new location as state
            this.onMapClick()
            this.setState({
                position: location,
                isNewPlaceWindow: true,
                newPlace: {
                    lat_lng: location,
                    google_id: place.place_id,
                    name: place.name,
                    address: place.formatted_address,
                }
            })
            this.locationInput.value = ''
        })
    }

    renderSearchBox() {
        return <form className='search'>
            <input
                className='search-input'
                placeholder='Enter a location'
                ref={ref => (this.locationInput = ref)}
                type='text'
                name='location-input'
            />
            <button className='search-button' type='button'><i className="material-icons">search</i></button>
        </form>
    }

    // handler when map is clicked
    onMapClick = () => {
        this.setState({
            isMapStyleActive: false,
            isToolsActive: false,
            clickedMarker: {},
            selectedPlace: null,
            isFormWindowOpen: false,
            isAddressShown: false,

            hoverMarker: {},
            hoverPlace: null,
            isHoverWindowOpen: false,

            isNewPlaceWindow: false,
            newMarker: null,
            newPlace: {
                lat_lng: null,
                google_id: '',
                address: '',
                name: ''
            }
        })
    }

    // handler that adds new marker when map is clicked
    onAddNewMarker = (mapProps, props, e) => {
        let latLng = e.latLng;
        const placesUrl = `${baseURL}/${this.state.userId}/places${serverKey}`;
        func.fetchRequest('POST', placesUrl, (data) => {
            this.setState({
                places: data
            })
        }, latLng)
    }

    // control function for content form that sends post request 
    onAddPlace = (event) => {
        const { places, userId, newPlace } = this.state
        console.log('Adding place.....', newPlace);
        func.fetchRequest('POST', `${baseURL}/${userId}/places${serverKey}`, (data) => {
            console.log(data)
            this.setState({
                places: places.concat(data),
                isNewPlaceWindow: false,
                newMarker: null,
                newPlace: {
                    lat_lng: null,
                    google_id: '',
                    address: '',
                    name: ''
                }
            })
        }, newPlace)
    }

    // handler to show form info window when pinned marker is clicked
    onShowFormWindow = (props, marker) => {
        this.setState({
            isHoverWindowOpen: false,
            hoverMarker: {},
            hoverPlace: null,
        })

        setTimeout(() => {
            this.setState({
                clickedMarker: marker,
                selectedPlace: props,
                position: props.position,
                isFormWindowOpen: true
            })
        }, 250)
    }

    // mouseover handler - renders infowindow with place details
    onShowPlaceDetails = (props, marker) => {
        setTimeout(() => {
            this.setState({
                hoverMarker: marker,
                hoverPlace: props,
                isHoverWindowOpen: true
            })
        }, 250)
    }

    // function to set new myMarker in state to render pin-infowindow
    onSetMarkerState = (marker) => {
        // console.log('onSetMarkerState ran')
        this.setState({
            newMarker: marker
        })
    }

    onToggleMyTools = () => {
        this.setState({
            isToolsActive: !this.state.isToolsActive,
            isMapStyleActive: false,
        })
    }
    onToggleMyPlaces = () => { this.setState({ isPlacesActive: !this.state.isPlacesActive }) }
    onToggleOtherPlaces = () => { this.setState({ isOtherPlacesActive: !this.state.isOtherPlacesActive }) }
    onToggleMapStyleWindow = () => { this.setState({ isMapStyleActive: !this.state.isMapStyleActive }) }

    onSelectMapStyle = (n) => {
        console.log('select map clicked');
        this.setState({
            mapStyle: n,
            isMapStyleActive: false,
            isToolsActive: false
        })
    }

    onToggleAddress = () => {
        console.log('toggle address....')
        if (!this.state.isAddressShown) {
            this.setState({isAddressShown: true})
        } else {
            this.setState({isAddressShown: false})
        }
    }

    // handler that renders the button on the infowindow
    renderInfoWindowReactElement(props, e) {
        const { newMarker, isNewPlaceWindow, selectedPlace, isFormWindowOpen, hoverPlace, isHoverWindowOpen, isAddressShown } = this.state
        if (newMarker && isNewPlaceWindow) {
            const button = (
                <button onClick={e => this.onAddPlace()}>Pin this place!</button>
            );
            ReactDOM.render(React.Children.only(button), document.getElementById("pin-button"));
        } else if (selectedPlace && isFormWindowOpen) {
            const contentForm = (
                <ContentForm place={this.state.selectedPlace} {...props} onCloseFormInfoWindow={this.onMapClick} />
            )
            ReactDOM.render(React.Children.only(contentForm), document.getElementById("content-form"));
        } else if (hoverPlace && isHoverWindowOpen) {
            const anchor = (
                <div className='address-link' href='' onClick={this.onToggleAddress}>{isAddressShown ? 'Hide Address' : 'Show Address'}</div>
            )
            ReactDOM.render(React.Children.only(anchor), document.getElementById("show-address"));
        }
    }

    renderAllMarkers(props, places, onClick, onHover) {
        const markerJSX = places.map((place, index) => {
            return <Marker
                key={index}
                _id={place._id}
                user_id={place.user_id}
                google_id={place.google_id}
                name={place.name}
                address={place.address}
                position={place.lat_lng}
                animation={props.maps.Animation.DROP}
                image={place.user_id.avatar}
                onMouseover={!this.state.selectedPlace ? onHover : null}
                onClick={onClick}
            >
            </Marker>
        })
        return markerJSX
    }

    render() {
        const { position, newPlace, newMarker, isNewPlaceWindow, clickedMarker,
            hoverMarker, hoverPlace, isHoverWindowOpen, isFormWindowOpen, places,
            otherPlaces, isPlacesActive, isOtherPlacesActive, isToolsActive, isMapStyleActive, isAddressShown} = this.state
        const { google } = this.props
        return (
            <div className='mapContainer'>
                <Map google={this.props.google}
                    containerStyle={{
                        height: '100vh',
                        position: 'relative',
                    }}
                    center={position}
                    centerAroundCurrentLocation={false}
                    zoom={13}
                    disableDefaultUI={true}
                    zoomControl={true}
                    styles={mapsCustom}
                    onClick={this.onMapClick}
                >
                    {/* render searchbox */}
                    {this.renderSearchBox()}

                    {/* render markers */}
                    {isPlacesActive && places.length > 0 ? this.renderAllMarkers(google, places, this.onShowFormWindow, this.onShowPlaceDetails) : null}

                    {/* render all other markers */}
                    {isOtherPlacesActive && otherPlaces.length > 0 ? this.renderAllMarkers(google, otherPlaces, this.onShowFormWindow, this.onShowPlaceDetails) : null}

                    {/* render content form window */}
                    <InfoWindow
                        marker={clickedMarker}
                        onClose={this.onMapClick}
                        visible={isFormWindowOpen}
                        onOpen={e => { this.renderInfoWindowReactElement(this.props, e) }}
                    >
                        <div id='content-form' />
                    </InfoWindow>

                    {/* on mouseover show place name */}
                    <InfoWindow
                        marker={hoverMarker}
                        onClose={this.onMapClick}
                        visible={isHoverWindowOpen}
                        onOpen={ e => { this.renderInfoWindowReactElement(this.props, e) } }
                    >
                        <div className='pinned-place'>
                            <img className='avatar' src={hoverPlace ? hoverPlace.user_id.avatar : null} alt='avatar' />
                            <p id='pinned'>Pinned!</p>
                            <h4>{hoverPlace ? hoverPlace.name : ''}</h4>
                            <div id='show-address' />
                            <div className={`pinned-address ${isAddressShown ? 'active' : ''}`}>{hoverPlace ? hoverPlace.address : ''}</div>
                        </div>
                    </InfoWindow>

                    {/* render searched marker & info window */}
                    <MyMarker
                        pos={newPlace.lat_lng}
                        setMarkerState={this.onSetMarkerState}
                    />
                    <InfoWindow
                        marker={newMarker}
                        visible={isNewPlaceWindow}
                        onClose={this.onMapClick}
                        onOpen={e => { this.renderInfoWindowReactElement(this.props, e) }}
                    >
                        <div className='new-place'>
                            <p>You found</p>
                            <h4>{newPlace.name}</h4>
                            <div id="pin-button" />
                        </div>
                    </InfoWindow>
                </Map>
                {/* LOGO */}
                <div className='logo'>
                    <i className="material-icons">add_location</i>
                    <h1>MapSocial</h1>
                </div>
                {/* Map tools */}
                <div className='tools'>
                    <i className="material-icons" onClick={this.onToggleMyTools}>expand_more</i>
                    <div className={`tools-list ${isToolsActive ? 'active' : 'inactive'}`}>
                        <div onClick={this.onToggleMyPlaces}>Toggle My Markers</div>
                        <div onClick={this.onToggleOtherPlaces}>Toggle Other Markers</div>
                        <div onClick={this.onToggleMapStyleWindow}>Change Map Style</div>
                        <div onClick={() => this.onSelectMapStyle('custom')} className={`map-styles ${isMapStyleActive ? 'map-active' : 'map-inactive'}`}>Custom</div>
                        <div onClick={() => this.onSelectMapStyle('retro')} className={`map-styles ${isMapStyleActive ? 'map-active' : 'map-inactive'}`}>Retro</div>
                        <div onClick={() => this.onSelectMapStyle('night')} className={`map-styles ${isMapStyleActive ? 'map-active' : 'map-inactive'}`}>Dark</div>
                    </div>
                </div>
            </div>
        )
    }
}

const MapWrapper = props => (
    <Map className="map" google={props.google} visible={true}>
        <MapContainer {...props} />
    </Map>
);

// export default MapWrapper
export default GoogleApiWrapper({
    apiKey: places_key2,
    libraries: ['places'],
})(MapWrapper)
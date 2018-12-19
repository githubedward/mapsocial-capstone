import { Component } from 'react';


export default class MyMarker extends Component {
    state = {
        animation: ''
    }
    
    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.pos !== prevProps.pos)) {
            this.renderMyMarker();
        }
    }

    renderMyMarker() {
        const { map, google, setMarkerState, pos } = this.props;
        // debugger;
        let bounce = '';
        if (pos) {
            bounce = google.maps.Animation.BOUNCE
        } else {
            bounce = null
        }
        const ref = {
            map: map,
            position: pos,
            animation: bounce
        };
        this.marker = new google.maps.Marker(ref);
        setMarkerState(this.marker)
        if (!pos) {
            this.marker.setMap(null)
        }
    }

    render() {
        return null
    }
}
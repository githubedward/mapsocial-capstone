import React, { Component } from 'react';

export class AddPlaceForm extends Component {
    render() {
        const { newPlace, onAddPlace } = this.props
        return (
            <div className='new-place'>
                <p>You found</p>
                <h4>{newPlace.name}</h4>
                <button type='submit' onClick={onAddPlace}>Pin it!</button>
            </div>
        )
    }
}
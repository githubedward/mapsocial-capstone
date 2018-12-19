import React, { Component } from 'react';
import * as func from '../../lib/functions';

export default class ContentForm extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            image: '',
            date: ''
        }
    }
    onDateChange = (e) => {
        console.log(e.target.value)
        this.setState({
            date: e.target.value
        })
    }
    onTextChange = (e) => {
        console.log(e.target.value)
        this.setState({
            text: e.target.value
        })
    }
    onImgChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            image: e.target.files[0]
        })
    }

    onSubmit = (props, e) => {
        const {text,image,date} = this.state;
        if (text && date) {
            const place = this.props.place;
            const newPost = {
                place_id: place._id,
                place_name: place.name,
                text: text,
                lat_lng: place.position,
                image: image,
                date_visited: date
            }
            console.log(newPost)
            const contentUrl = `http://localhost:8080/${this.props.userInfo._id}/contents?api_key=edward`
            func.fetchRequest('POST', contentUrl, (data) => {
                console.log('Reponse: ', data);
                setTimeout(()=> {
                    this.props.onCloseFormInfoWindow();
                    // method to update app state
                    this.props.onUpdateApp();  
                }, 250)
            }, newPost)
        } else {
            alert('Please provide valid inputs')
        }
    }

    render() {
        return (
            <form className='content-form'>
                <h2>Share your experience!</h2>
                <h3>Place: {this.props.place ? this.props.place.name : ''}</h3>
                <label className='content-form__date'>
                    When was your trip?
                    <input 
                        type='date'
                        name="trip-date" 
                        min="2015-01-01" max="2018-12-31"
                        value={this.state.date}
                        onChange={this.onDateChange}
                        required
                    />
                </label>
                <label className='content-form__post'>
                    <textarea 
                    placeholder={`Write something about this place...`}
                    onChange={this.onTextChange}
                    required
                    ></textarea>
                </label>
                <div className='content-form__buttons'>
                    <div className='content-form__buttons-left'>
                        <i className="material-icons">tag_faces</i>
                        
                        <label>
                            <i className="material-icons file">attach_file<input type='file' className='file-input' onChange={this.onImgChange} /></i>
                        </label>
                        <i className="material-icons gif">gif</i>
                        <i className="material-icons">face</i>
                    </div>
                    <input type='button' value='Submit' onClick={this.onSubmit}/>
                </div>
            </form>
        )
    }
}
import React, { Component } from 'react';
import * as func from '../../lib/functions';



export default class Post extends Component {
    render() {
        const { first_name, last_name, avatar } = this.props.userInfo;
        const { timestamp, text, image, /* likes, comments, */ _id, place_name, date_visited: date } = this.props.content;
        return (
            <div id={_id} className='content'>
                <div className='content-info'>
                    <div className='content-info__avatar'>
                        <img src={avatar} alt="avatar"/>
                    </div>
                    <div className='content-info__details'>
                        <h4>{`${first_name} ${last_name}`}</h4>
                        <p>{func.convertToRelativeTime(timestamp)}</p>
                    </div>
                </div>
                <div className='content-box'>
                    <h3>{place_name}</h3>
                    <p className='content-box__date'>Visited: {func.convertToDate(date)}</p>
                    <p className='content-box__text'>{text}</p>
                    {image ? <img src={image} alt='content' /> : null}
                </div>
                <div className='content-reaction'>
                    <button className='content-reaction__btns'>
                        <i className="material-icons">thumb_up</i><span>Like</span>
                    </button>
                    <button className='content-reaction__btns'>
                        <i className="material-icons">add_comment</i><span>Comment</span>
                    </button>
                    <button className='content-reaction__btns'>
                        <i className="material-icons">reply</i><span>Share</span>
                    </button>
                </div>
            </div>
        )
    }
}
// get me some libs
import moment from 'moment';
const numeral = require('numeral');


// function to convert numbers
// 1000 -> 1k && 1100 -> 1.1k and so on

// abbreviate all nums in an array
export function abbreviateAllNumsInArr(arr) {
    arr.forEach(obj => {
        abbreviateAllNumsInObj(obj);
    })
}

// abbreviate all nums in an obj
export function abbreviateAllNumsInObj(obj, exception) {
    for (let prop in obj) {
        if (prop === exception) {
            obj[prop] = numeral(obj[prop]).format('0,0');
        }
        if (typeof obj[prop] == 'number') {
            obj[prop] = abbreviateNum(obj[prop]);
        }
    }
}

// abbreviate nums individually
export function abbreviateNum(num) {
    if ((num >= 1000 && num < 1100) || (num >= 10000 && num < 10100) || (num >= 100000 && num < 100100) || (num >= 1000000 && num < 1100000) || (num >= 10000000 && num < 10100000)){
        return numeral(num).format('0a');
    } else if (num < 1000) {
        return num;
    }
    return numeral(num).format('0.0a')
}

// fetch request
export function fetchRequest(methodType, url, func = console.log, body = null) {
    if (methodType === 'GET') {
        fetch(url)
        .then(response => response.json())
        .then(data => {func(data);
        }).catch(err => console.error('YOU GOT AN ERROR: ', err))
    }
    else if (methodType === 'POST') {
        // debugger;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {func(data);
        }).catch(err => console.error('YOU GOT AN ERROR: ', err))
    } else if (methodType === 'DELETE') {
        fetch(url, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {func(data);
        }).catch(err => console.error('YOU GOT AN ERROR: ', err))
    } else if (methodType === 'PUT') {
        fetch(url, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => {func(data);
        }).catch(err => console.error('YOU GOT AN ERROR: ', err))
    }
}

// convert timestamp to relative time
export function convertToRelativeTime(timestamp) {
    let t = moment(timestamp).format()
    return moment(t).startOf('minutes').fromNow()
}

export function convertToDate(t) {
    return moment(t).format('dddd, MMM Do YYYY');
}
# Project Background
- The app presented in this repo was developed in 11 days - including basic UX/UI design (deployment not included)
- MapSocial is a collaborative platform where users can record, share and find new experiences on a digital map
- Developed as part of the Capstone Project at BrainStation

# Tech Stack
- Google Maps API for maps interface and autocomplete service
- MERN stack (MongoDB, ExpressJS, ReactJS, Node)
- SaSS/ScSS for UI styling + BEM naming convention

# Project Features

Note: The app deployed to the link below is for demo purposes only and still has some performance issue, it takes a couple of seconds for the UI to initially load. Also, please hit refresh or go back to opening page if data doesn't load. 

Link to demo: https://mapsocial-demo.herokuapp.com

### Landing page

![landing page](https://user-images.githubusercontent.com/41134618/52088558-31028f80-257a-11e9-9415-b259086979df.gif)

### Demo

![demo](https://user-images.githubusercontent.com/41134618/52088545-2b0cae80-257a-11e9-86b7-13eb9ab49025.gif)

### My Map / Places 
- On initial page reload, user's pinned markers will drop. 

### Community (Connections) Tab
- Enable markers of some of my connections

### Feed 
- Posts displayed on feed are connected to what is shown on the map

### Write something about a specific pinned place
- Click the marker and modal will pop up where you can write something about your experience.

### Pin a New Place
- To pin a new place, type address or name of place in the Google Autocomplete searchbar. When place is clicked, client will send request to Google Places API for the places details and it will respond with the data. 

- When the user clicks 'Pin it!', client will pin it on the map UI and will send Post request to my server and it will save all the details, which will take the user's ID as its foreign ID, on my MongoDB database. 



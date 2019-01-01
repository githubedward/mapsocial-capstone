# Project Background
- The app presented in this repo was developed in 11 days - including planning and design
- MapSocial is a collaborative platform where users can record, share and find new experiences on a digital map
- Developed as part of the Capstone Project at Brainstation

# Tech Stack
- Google Maps API for maps interface and autocomplete service
- ReactJS and ScSS/SaSS for front-end
- Node Express for server
- MongoDB / mLabs for database

# Project Features

Link to demo: https://mapsocial-capstone.herokuapp.com

Note: the app is deployed for demonstration purposes only. The app has still some minor issues on heroku routing when user refreshes the page - when issue is encountered, please go to the original url as indicated above.

### Landing page

<img width="1474" alt="screen shot 2018-12-19 at 9 33 23 pm" src="https://user-images.githubusercontent.com/41134618/50260784-84a88780-03d7-11e9-982f-88f8884a95cb.png">

### My Map / Places 
On initial page reload, user's pinned markers will drop. 
<img width="1484" alt="screen shot 2018-12-19 at 9 48 43 pm" src="https://user-images.githubusercontent.com/41134618/50260867-e36e0100-03d7-11e9-92f8-e3e1a016d007.png">

### Pin a New Place
To pin a new place, type address or name of place in the Google Autocomplete searchbar. When place is clicked, client will send request to Google Places API for the places details and it will respond with the data. 

<img width="1485" alt="screen shot 2018-12-19 at 10 18 46 pm" src="https://user-images.githubusercontent.com/41134618/50262213-026f9180-03de-11e9-94a7-780c216ff7aa.png">

When the user clicks 'Pin it!', client will pin it on the map UI and will send Post request to my server and it will save all the details, which will take the user's ID as its foreign ID, on my MongoDB database. 

<img width="1482" alt="screen shot 2018-12-19 at 10 18 56 pm" src="https://user-images.githubusercontent.com/41134618/50262228-12877100-03de-11e9-9e17-0874c1c0ee8b.png">

### Write something about a specific pinned place

<img width="1484" alt="screen shot 2018-12-19 at 10 19 45 pm" src="https://user-images.githubusercontent.com/41134618/50262234-15826180-03de-11e9-8b36-1de3837b8f8c.png">

### Community (Connections) Tab 

- Enable markers of some of my connections
<img width="1480" alt="screen shot 2018-12-19 at 11 09 40 pm" src="https://user-images.githubusercontent.com/41134618/50263353-4fa23200-03e3-11e9-8131-a194899a9910.png">

- Hide my markers
<img width="1482" alt="screen shot 2018-12-19 at 11 09 54 pm" src="https://user-images.githubusercontent.com/41134618/50263356-52048c00-03e3-11e9-81d5-778d5cc6d419.png">

### Feed 
- Posts displayed on feed are connected to what is shown on the map

<img width="1484" alt="screen shot 2018-12-19 at 11 10 18 pm" src="https://user-images.githubusercontent.com/41134618/50263360-53ce4f80-03e3-11e9-89d9-36e165c2e058.png">

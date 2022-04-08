# EasyGameMap
This project implements a react native app that simplifies creating interactive game maps. 
Users can use the app to view, create or modify interactive maps. 

This repository is the front end of the app.

The backend can be found at [https://github.com/Leo927/EGMServer](https://github.com/Leo927/EGMServer).

## Preview
<img src="readme/resources/home.jpg"
     alt="Markdown Monster icon"
     style="height: 500px;" />

<img src="readme/resources/map.jpg"
     alt="Markdown Monster icon"
     style="height: 500px;" />

## Supported Platforms:

|Platforms| Planned| Tested |
----------|-----------|--|
|Web|✔|❌|
|Android|✔|✔|
|IOS|✔|❌|

## Download Published Builds
* Web: TBD
* Android: [https://expo.dev/@leo347/EasyGameMap?serviceType=classic&distribution=expo-go](https://expo.dev/@leo347/EasyGameMap?serviceType=classic&distribution=expo-go)
* IOS: [https://expo.dev/@leo347/EasyGameMap?serviceType=classic&distribution=expo-go](https://expo.dev/@leo347/EasyGameMap?serviceType=classic&distribution=expo-go)

## Building
1. Install [NodeJS](https://nodejs.org/en/download/).
2. Install expo cli. See more [here](https://docs.expo.dev/workflow/expo-cli/)
   
        npm install --global expo-cli

3. Clone the repository 

        git clone https://github.com/Leo927/EasyGameMap.git

4. Change directory
  
        cd EasyGameMap
1. Install depdencies. 
   
        npm install .
2. Build for targeted platform. See more [detail](https://docs.expo.dev/workflow/expo-cli/).
  
        expo build:<platform>

## Login
To login, the user can press the purple circle on the top right corner. 

<img src="readme/resources/home - login.jpg"
     alt="Markdown Monster icon"
     style="height: 500px;" />

A dialog will show up. Press the LOGIN button on the dialog. Then the user will be guided to login to github and authorize the app. 
Follow Github's instruction and login. Once authorized, the user is logged in. 

<img src="readme/resources/guest user menu.jpg"
     alt="Markdown Monster icon"
     style="height: 500px;" />

Currently the only supported login method is Github. 

## Logout
To log out of ones account, press the purple circle on the top right and select LOGOUT. Note this button is only avaialble when the user is already logged in.

## Map Managment
To manage all maps owned by the user, the user must be logged in. 

Once logged in, there are two tabs at the bottom of the screen: Home and Profile. Press profile to see all the maps owned by the currently logged in user.

After a short loading, all the maps owned by the current user should be listed in the center of the screen. 

### Creating A Map
To create a map. The user must first login to their account. 

In the profile page, press CREATE NEW MAP button. 

The user must first give the map a name. And then press the SAVE button to create the map. 

If creating was successful, a small print will show up underneath the SAVE button.



### Changing Name
Thje name of a map can be changed in the general tab of the map. Once the name is changed, press SAVE button in the general tab. 

### Manage Custom Icons
#### Create A Custom Icon
Custom icons can be managed in MapConfigMarker component. To add a custom icon, go to general tab of the map management. 
And then Click ```ADD CUSTOM ICON```. An dialog will show up prompting user to enter the name and select an image for the icon.
Once the name and the image are selected. Press ```CONFIRM``` on the bottom right of the dialog to confirm.
#### Editing A Custom Icon
Once a custom icon is created. The user can see the icon in general tab. Pressing the ```EDIT``` Button on an icon card will 
display the edit dialog for the icon. 
#### Deleting A Custom Icon
To delete a custom icon, press the DELETE button on the icon card. Note that all markers on the map currently using this icon will switch to using built-in default icon.


## Data Classes
### Map
Map has the following properties.

```javascript
_id: unique map id assigned by database,
name: name of the map. Cannot be empty. 
image: picture asset of the map. stored as a string
uid: uid of the user owning the map. Cannot be empty. 
width: Number representing the width of the map. Can be empty. Must be a number.
height: Number representing the height of the map. Can be empty. Must be a number.
markerGroups: set[str] representing the names of each markerGroups. each name must be unique. Can be empty. 
customIcons: dictionary[str, picture asset] representing a custom icon. 
markers: list of markers. format: list[marker]. May be empty or undefined. 
```

### Marker:
```javascript
id: uid of the marker,
title: String. Title of marker. Shown in the popup modal as title.
description: String. Detailed description of the marker.
label: String shown underneath the icon.
isCustomIcon: Bool. If true, the icon used will be from the customIcons. Other wise, the icon id points to a default icon. 
iconId: String representing the id of the icon. See isCustomIcon for more detail of where it comes from. 
left: number representing the distance of the center of icon from the left edge of the map. 
top: number representing the distance of the center of the icon from the top of the map. 
markerGroup: A list of strings pointing to several markerGroups from the map. 
```

### Icon:
```javascript
_id: string. Unique identifier to the icon.
name: string. Name of the icon. Must be unique within the same map;
image: string representation of the image. Supported format is gif, png, and jpg;
```

## Todos
* Refactor MapConfigMarker. Extract the icon card and marker card into their own components.  
* Make custom icon list update immediately
* Add more login methods. 
* Searching map by name, user name.
* Searching markers in a map
* Marker Group Toggling
* Map Context Menu
* Dragging markers on a map to change marker coordinate.
* Zooming in/out of map




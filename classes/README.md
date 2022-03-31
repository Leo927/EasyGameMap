# Map
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

# Marker:
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
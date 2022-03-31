/**
 * Represents a marker shown on a map
 */


import uuid from 'react-native-uuid';
export default class Marker{
    constructor(){
        //unique id of the marker,
        this._id = uuid.v4();

        // Title of marker. Shown in the popup modal as title.
        this.title = "";

        // Detailed description of the marker.
        this.description = "";

        // shown underneath the icon.
        this.label = "";
        
        // If true, the icon used will be from the customIcons. 
        // Other wise, the icon id points to a default icon. 
        this.isCustomIcon = false;
        
        // id of the icon. See isCustomIcon for more detail 
        // of where it comes from. 
        this.iconId = "default";

        // number representing the distance of 
        // the center of icon from the left edge of the map. 
        this.left = 0;

        // number representing the distance of the 
        // center of the icon from the top of the map. 
        this.top = 0;

        // A string pointing to one of the markerGroups from the map. 
        this.markerGroup = "";

    }
}
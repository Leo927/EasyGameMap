/**
 * Represents a marker shown on a map
 */
class Marker{
    constructor(){
        //unique id of the marker,
        _id = "";

        // Title of marker. Shown in the popup modal as title.
        title = "";

        // Detailed description of the marker.
        description = "";

        // shown underneath the icon.
        label = "";
        
        // If true, the icon used will be from the customIcons. 
        // Other wise, the icon id points to a default icon. 
        isCustomIcon = false;
        
        // id of the icon. See isCustomIcon for more detail 
        // of where it comes from. 
        iconId = "";

        // number representing the distance of 
        // the center of icon from the left edge of the map. 
        left = 0;

        // number representing the distance of the 
        // center of the icon from the top of the map. 
        top = 0;

        // A string pointing to one of the markerGroups from the map. 
        markerGroup = "";

    }
}
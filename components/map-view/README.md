# MapView
The original propsal was to use react-native-webview-leaflet. After further research, we realized it may not be the best option. First of all, the package is out of maintenance and is not compatable with the current version of expo sdk (44.0). Secondly, it is a webview component which is inconvinient to use. We eventually decided to use pure react native plus react-native-paper to achieve the same effect. react-native-paper is mainly used for its design and dialog component. 

## Props:

* map: the map data conforming to the class [Map](../../classes/README.md/#map).

* setMap: the setter function to modifer map

## States/Refs:

* mapPos: ```Animated.ValueXY```. Controls the map offset from the top left corner of the parent to the top left corner of the map.

* mapZoom: ```Animated.Value```. Controls the zoom level of the map.

* isEditMode: ```Boolean```. Control whether the map is in edit mode.

## The underlaying image.
The image is a animated object. 

### Position Offset
The position offset is controlled by ```mapPos```. It refers to the offset from the topleft corner of the map container to the top left corner of the map.

In view mode, the position is changed when the user is panning the map. 

In edit mode, the user must move the map by dragging on the map image itself instead of any marker. Start dragging from any marker will only move the marker. 

### Zooming
The zoom level is controlled by ```mapZoom```. 

When the player zoom, the center of zooming is the center of the viewport. 

The relative position of center of viewport on the image can be calculated as: {x: (screenWidth/2 - mapPos.x)/zoom, y: (screenHeight/ 2 - mapPos.y)/zoom}. Note it is the value before zooming is applied.

When zoom level change from zoom_0 to zoom_1, the center of the image must remain the same. Therefore we have:
{x: (screenWidth/2 - mapPos.x_0)/zoom_0, y: (screenHeight/ 2 - mapPos.y_0)/zoom_0} = {x: (screenWidth/2 - mapPos.x_1)/zoom_1, y: (screenHeight/ 2 - mapPos.y_1)/zoom_1}

And if we solve the equation we have:
(screenWidth/2 - mapPos.x_0)/zoom_0 = (screenWidth/2 - mapPos.x_1)/zoom_1
mapPos.x_1 = screenWidth/2 * (zoom_1 - zoom_0) / zoom_1 + mapPos.x_0 * zoom_0/zoom_1

And the equation is similar for y.

## Markers showing on top of the image
Markers show locations of interest. They are stored in ```map.markers```.

There are two ways to interact with them. 

In edit mode, the user can drag a marker without dragging the map. This allows the user to change the position of a marker.

In either edit mode or view mode, the user can click/touch on a marker to show a detail dialog. The dialog hides some editing option while not in edit mode. See [more](../marker-detail/README.md) for more information on marker dialog.

The relative position of each marker should be provided as ```Marker.top``` and ```Marker.left```. This is the unzoomed offset from the top left corner of the map. 

The absolute position of each marker can be calculated as:
markerPos + [Marker.left, Marker.top] * zoom

The size of markers are not affected by ```mapZoom```.

## Edit Mode Toggle
On the top right corner of the viewport. There is a toggle that is only visible when the owner of the map matches the logged in user's id. Toggling it will toggle [isEditMode](#statesrefs)

## Context Button and Dialog
The context button hovers on the top left corner of the viewport. It doesn't move or scale with the rest of the map. When clicked, it shows a diaglog box displaying some context information and some interactions. See more from [here](../map-context/README.md)

## Search Button and Dialog
The search button is similar to a context button. Upon clicking, it shows a dialog box with an text input box and a search button. Making a search returns an array of markers matching the search criteria under the text input. Upon clicking on any of the result, the dialog will close and the map will auto center on the marker clicked. See more from [here](../map-search/README.md)

## Marker Group Button and Diaglog
This button is also similar to context button. Upon clicking, it shows a list of marker groups with toggles next to them. Toggling a marker groups will hide or show the markers belonging to the marker group. 

## Toolbox
This is a list of buttons that contains functionality for editing a map. Currently the only relavant functionality is ```New Marker```. It inserts a new marker in the center of the viewport.
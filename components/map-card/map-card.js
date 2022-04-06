import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

/**
 * Implements a map card to show a map in a list
 * Props: 
 * <1> map: the map data to display
 * <2> canEdit: Boolean flag on whether the map card can be edited. 
 * <3> onDelete: Handler to be called when Delete is pressed. The map is passed in as argument.
 */
function MapCard({ map, canEdit, onDelete }) {
  const navigation = useNavigation();
  return (
    <Card>
      <Card.Title title={map?.name ? map.name : "INVALID"} />
      <Card.Actions>
        {/* Open the map in view mode. */}
        <Button onPress={() => navigation.navigate("MapViewScreen", { mapId: map._id })}>Open</Button>

        {/* Open the edit page on the map. */}
        {canEdit && map?._id != undefined &&
          <Button onPress={() => navigation.navigate("MapConfigStack", { mapId: map._id })}>Edit</Button>}

        {/* Delete the Map */}
        {canEdit && map?._id != undefined && onDelete != undefined &&
          <Button onPress={() => onDelete(map)}>Delete</Button>}

      </Card.Actions>
    </Card>
  );
}

MapCard.defaultProps = {
  canEdit: false
}

export default MapCard;
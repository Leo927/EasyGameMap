import { Card, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MapCard({ map, canEdit }) {
  const navigation = useNavigation();
  return (
    <Card style={styles.mapCard}>
      <Card.Title title={map?.name?map.name: "INVALID"} />
      <Card.Actions>
        <Button>Open</Button>

        {canEdit && map?._id != undefined &&
          <Button onPress={() => navigation.navigate("MapConfigStack", { mapId: map._id })}>Edit</Button>}

        {canEdit && map?._id != undefined &&
          <Button onPress={() => {
            setDelVisible(true);
            setDelTarget(map._id);
          }}>Delete</Button>
        }

      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  mapCard:{
    
  }
})

MapCard.defaultProps ={
  canEdit : false
}
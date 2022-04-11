import UserMaps from '../usermaps/usermaps';
import { View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import React from 'react';

import EGMContext from '../../context';



export default function ProfileScreen({ navigation }) {
  const context = React.useContext(EGMContext);
  return (
    <View>
        {/**If not logged in, show a login button*/}
        {context.user?.uid == undefined &&
            <Title>Please Login to See Your Profile</Title>
        }
        {context.user?.uid != undefined &&
            <UserMaps uid={context.user.uid} />
        }
  </View>
  );
}
// used for reading images
import * as FileSystem from 'expo-file-system';

import Icon from "../classes/icon";

export default function GetBuiltInIcons(){
  return [
    {_id: 'default', name:'default', image: "⭐"},
    {_id: 'battle', name:'battle', image: '⚔'},
    {_id: 'treasure', name:'treasure', image: '📦'}
  ];
}
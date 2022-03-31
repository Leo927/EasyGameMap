import uuid from 'react-native-uuid';

export default class Icon{
  constructor(){
    this._id = "";
    this.name = "";
    this.image = "";
  }

  static create(name, image){
    var icon = new Icon();
    icon._id = uuid.v4();
    icon.name = name;
    icon.image = image;
    return icon;
  }

  isValid({msg}){
    if(!this._id){
      if(msg!=undefined)
        msg = "Invalid Id";
      return false;
    }

    if(!this.name){
      if(msg!=undefined)
        msg = "Invalid Name";
      return false;
    }

    return true;
  }
}
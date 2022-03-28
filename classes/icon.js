export default class Icon{
  constructor(){
    this._id = "";
    this.name = "";
    this.image = "";
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
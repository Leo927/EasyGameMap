class Map{
    constructor(){
        this._id = "";
        this.name = "";
        this.image = "";
        this.width = "";
        this.height = "";
        this.markerGroups = new Set();
        this.customIcons = {};
        this.markers = {};
    }
}

export {Map};
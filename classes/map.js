class Map{
    constructor(){
        this._id = "";
        this.name = "";
        this.image = "";
        this.width = 0;
        this.height = 0;
        this.markerGroups = new Set();
        this.customIcons = {};
        this.markers = {};
    }
}

export {Map};
import { Map } from "../classes/map";
import { SERVER_URL } from "../secrets"

const endPoint = SERVER_URL + '/maps'

export async function createMap(mapData, user){
    try{
        const response = await fetch(endPoint, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: user.token,
                mapData: mapData
            })
        });
        return response.json();
    } 
    catch(e){
        console.error(e);
    }
}

export async function updateMap(mapId, mapData, user){
    try{
        const response = await fetch(endPoint, {
            method: 'PATCH',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: user.token,
                mapId: mapId,
                mapData: mapData
            })
        });
        return response.json();
    }
    catch(e){
        console.error("Failed to update map. "+e);
    }
}

/**
 * Get all maps owned by a user.
 * 
 * Params:
 * <1> uid: the unique id of the user.
 * 
 * Returns: 
 *  A list of all the maps owned by the user. 
 * 
 * Exceptions:
 * <1> user id not found. 
 * <2> uid not valid. 
 * <3> server not responding. 
 */
export async function getUserMaps(uid){
    try{
        const response = await fetch(endPoint + `/owner/${uid}`,{
            method:"GET",
        });
        const responseJson = await response.json();
        return responseJson;
    }
    catch(e){
        console.error(`Failed to get maps by user id ${uid}`);
        return [];
    }
}

// Returns a map by id. if nothing was found, returns null.
export async function getMap(mapId){
    try{
        const response = await fetch(endPoint + `/${mapId}`);
        const responseJson = await response.json();
        if(responseJson.length <= 0)
            return null;
        return responseJson[0];
    }
    catch(e){
        console.error(`Failed to fetch map. Id ${mapId}`);
        return null;
    }
}

export async function deleteMap(mapId, user){
    try{
        const response = await fetch(endPoint, {
            method: 'DELETE',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: user.token,
                mapId: mapId,
            })
        });
        return response.json();
    }
    catch(e){
        console.error("Failed to delete map. "+e);
    }
}

/**
 * Get all public maps from server. 
 * 
 * Return: 
 * An array of maps. Each contains only the minimum data to identify the map
 */
export async function getMaps(){
  try{
    const response = await fetch(endPoint);
    const responseJson = await response.json();
    if(responseJson.length <= 0)
        return null;
    return responseJson;
  }
  catch(e){
      console.error(`Failed to fetch all public map listings. `);
      return null;
  }
}


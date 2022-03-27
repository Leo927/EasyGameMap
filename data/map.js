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

export async function getMap(mapId){
    try{
        const response = await fetch(endPoint + `/${mapId}`);
        const responseJson = await response.json();
        if(!response){
            return new Map();
        }
        return responseJson;
    }
    catch(e){
        console.error(`Failed to fetch map. Id ${mapId}`);
        return new Map();
    }
}
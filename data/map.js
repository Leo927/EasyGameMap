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
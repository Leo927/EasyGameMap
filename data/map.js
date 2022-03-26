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
        return await response.json();
    } 
    catch(e){
        console.error(e);
    }
}

export function updateMap(id, mapData, user){

}
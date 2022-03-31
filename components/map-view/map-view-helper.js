import { Image } from "react-native";

/**
 * Returns the native dimension of the image.
 * @param {string} image 
 * 
 * @returns {[number, number]} [height, width] 
 */
export function getDimension(image, callback){
  Image.getSize(image, callback);
}

/**
 * Get the map bounds given image size. 
 * @param {*} param0 
 */
export function convertImageSize({width, height}){
  return {width, height}
}
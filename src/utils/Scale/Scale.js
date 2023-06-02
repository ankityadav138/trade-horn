import { Dimensions, Platform } from "react-native";

//Screen Constatnts
const SCREEN_HEIGHT = Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height <= 550 ? 667 : Dimensions.get('window').height;
const SCREEN_WIDTH = 375;

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;


/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */
const scale = function (units = 1) {
    return (DEVICE_WIDTH / SCREEN_WIDTH) * units;
}

export function wp(percentage) {
    const value = (percentage * DEVICE_WIDTH) / 100;
    return Math.round(value);
}

export function hp(percentage) {
    const value = (percentage * DEVICE_HEIGHT) / 100;
    return Math.round(value);
}

const verticalScale = (size) => (DEVICE_HEIGHT / SCREEN_HEIGHT) * size;

const device = { DEVICE_HEIGHT, DEVICE_WIDTH }

export { verticalScale, scale, device };

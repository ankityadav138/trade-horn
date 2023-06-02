import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Dimensions } from "react-native";
import { getDimen } from '../dimensions/dimen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export default function AuthButton({ title, onPress, borderRadius }) {
    return (
        <TouchableOpacity
            style={{
                borderRadius: borderRadius == undefined ? 10 : borderRadius,
                alignItems: 'center',
                justifyContent: 'center',
                height: DEVICE_HEIGHT * 0.08,
                width: DEVICE_WIDTH * 0.85,
                // backgroundColor: '#FF5C5B',
                backgroundColor: '#39b091',
                alignSelf: 'center',
                elevation: 2,
               // marginTop: 20
            }}
            onPress={onPress}
        >
            <Text style={{ fontSize: 16, color: '#fff', fontStyle: 'normal' ,paddingLeft:35,width:getDimen(0.70),alignItems:'center',alignSelf:'center'}}>{title}</Text>
        </TouchableOpacity>
    )
}

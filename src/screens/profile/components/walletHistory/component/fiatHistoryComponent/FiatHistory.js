import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import FiatDropdown1 from './FiatDropDown1'
import FiatDropdown2 from './FiatDropDown2'

export default function Fiathistory() {
    return (
        <View>

            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Date"
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: '5%',
                }}>
                <FiatDropdown2 />
            </View>
        </View>



    )
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 0,
        height: 37,
        backgroundColor: 'white',
        marginHorizontal: '5%',
        marginVertical: 6,
        color: 'black',
        paddingHorizontal: 5,
        paddingLeft: 10,
        // borderRadius: 6,
    },
})
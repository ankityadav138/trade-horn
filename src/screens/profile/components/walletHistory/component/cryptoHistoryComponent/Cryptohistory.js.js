import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import CryptoDropdown2 from './CryptoDropdown2'
import CryptoDropdown3 from './CryptoDropdown3'
import CryptoDropdown1 from './CryptoDropdown1'

export default function Cryptohistory() {
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
                <CryptoDropdown2 />
                <CryptoDropdown3 />
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
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import { getDimen } from '../../dimensions/dimen';
import { AppStyles } from '../../style/AppStyles';
import AppButton from '../../constants/AppButton';
import { useTheme } from '@react-navigation/native';
import textSize from '../../constants/textSize';


export default function Tips() {
    const { colors } = useTheme();
    return (
        <LinearGradient
            style={{
                flex: 1,
                width: '100%',
                borderRadius: 6,
                // marginHorizontal: '5%',

                padding: textSize.componentsDifferenceLow,
                //marginTop: '5%',
            }}
            colors={[
                colors.transparentGradientColor2,
                colors.transparentGradientColor1,
            ]}
        >
            <View style={styles.textContainer}>

                <View >
                    <Text style={styles.textHeader}>Note:</Text>
                    <View style={styles.textContainer1}>
                        <Text style={{ color: colors.text }}>
                            Fees 0.5 USDT</Text>
                        <Text style={{ color: colors.text }}>
                            Minimum withdrawal amount 24 USDT</Text>
                    </View>
                </View>

                <View style={styles.textContainer2}>
                    <Text style={styles.textHeader}>Note:</Text>
                    <View style={styles.textContainer1}>
                        <Text style={{ color: colors.text }}>Recieve amount 0.00000000 USDT</Text>
                    </View>
                </View>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        padding: 15,
        marginTop: getDimen(0.12),
    },
    textHeader: {
        fontSize: textSize.h3,
        color: "white"
    },
    textContainer2: {
        marginTop: getDimen(0.020)
    },
    textContainer1: {
        paddingTop: getDimen(0.020)
    }
})

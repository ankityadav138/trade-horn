import React from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import textSize from '../../../../../constants/textSize';
import { getDimen } from '../../../../../dimensions/dimen'

function Withdraw() {
    // console.log("data in CryptoHistory component", cryptoHistoryData.data)
    const { colors } = useTheme();

    const walletData = [
        {
            id: 1,
            date: "01/01/2022",
            Assets: "assets",
            type: "Withdraw",
            amount: "12345",
            trasactionFee: "1478",
            paymentOption: "UPI",
            trasactionId: "2569",
            notes: "xyz",
            status: "paid"
        }
    ]

    const HeaderData = [
        {
            id: '1',
            title: 'Date',
        },
        {
            id: '2',
            title: 'Assets',
        },
        {
            id: '3',
            title: 'Type'
        },
        {
            id: '4',
            title: 'Deposit Amount',
        },
        {
            id: '5',
            title: 'Status',
        },

    ];

    const ListHeader = () => {
        return (
            <FlatList
                numColumns={HeaderData.length}
                data={HeaderData}
                renderItem={({ item, index }) => (
                    <View style={styles.FlatListHeaderView}>
                        <Text style={{ color: colors.white, fontSize: 14, }}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        );
    };

    return (
        <ScrollView horizontal style={{ marginHorizontal: 10 }}>
            <FlatList
                style={{
                    height: getDimen(1)
                }}
                data={walletData}
                renderItem={({ item, index }) => (
                    <View style={styles.flatListContainer}>
                        {/* <Text style={styles.textStyle}>{item.date.slice(1, 10)}</Text> */}
                        <Text style={styles.textStyle}>WithDraw History</Text>
                        <Text style={[styles.textStyle, { right: 10 }]}>{item.Assets}</Text>
                        <Text style={[styles.textStyle, { left: 15 }]}>{item.type}</Text>
                        <Text style={[styles.textStyle, { left: 30 }]}>{item.amount}</Text>
                        <Text style={[styles.textStyle, { right: 15 }]}>{item.trasactionFee}</Text>
                        <Text style={[styles.textStyle, { right: 20 }]}>{item.paymentOption}</Text>
                        <Text style={[styles.textStyle, { right: 30 }]}>{item.trasactionId}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                ListHeaderComponent={ListHeader}

            />
        </ScrollView>
    )
}

export default Withdraw


const styles = StyleSheet.create({
    FlatListHeaderView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "black",
        height: getDimen(0.11),
        width: 130,
        paddingLeft: 22,
        paddingRight: 22,
        borderTopWidth: 0.5,
    },
    textStyle: {
        textAlign: 'center',
        color: "black",
        fontWeight: '500',
        fontSize: textSize.h5,

        //backgroundColor: "blue"
    },
    flatListContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 15,

    }
})



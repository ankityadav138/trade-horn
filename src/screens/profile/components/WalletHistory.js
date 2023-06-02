import React from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import {getDimen} from '../../../dimensions/dimen';
import textSize from '../../../constants/textSize';
import {moderateScale} from 'react-native-size-matters';

function WalletHistory(fiatHistoryData) {
  //  console.log("==============================", fiatHistoryData && fiatHistoryData.data)
  const colors = useTheme();
  const walletData = [
    {
      id: 1,
      date: '01/01/2022',
      Assets: 'assets',
      type: 'Withdraw',
      amount: '12345',
      trasactionFee: '1478',
      paymentOption: 'UPI',
      trasactionId: '2569',
      notes: 'xyz',
      status: 'paid',
    },
  ];

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
      title: 'Type',
    },
    {
      id: '4',
      title: 'Amount',
    },
    {
      id: '5',
      title: 'Transaction Fees',
    },
    {
      id: '6',
      title: 'Payment Option',
    },
    {
      id: '7',
      title: 'Transaction ID',
    },
    {
      id: '8',
      title: 'Notes',
    },
    {
      id: '9',
      title: 'Status',
    },
  ];

  const ListHeader = () => {
    //View to set in Header
    return (
      <FlatList
        numColumns={HeaderData.length}
        data={HeaderData}
        renderItem={({item, index}) => (
          <View style={styles.TitleView}>
            <Text style={styles.Titletext}>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    );
  };

  return (
    <ScrollView horizontal style={{marginHorizontal: moderateScale(10)}}>
      {fiatHistoryData && fiatHistoryData.data != [] ? (
        <FlatList
          data={fiatHistoryData.data}
          renderItem={({item, index}) => (
            <View style={styles.flatListContainer}>
              <Text style={styles.text}>
                {item.date ? item.date.slice(1, 10) : item.date}
              </Text>
              <Text style={[styles.text, {right: 10}]}>
                {item.currency ? item.currency.toUpperCase() : item.currency}
              </Text>
              <Text style={[styles.text, {left: moderateScale(15)}]}>
                {item.type}
              </Text>
              <Text style={[styles.text, {left: moderateScale(30)}]}>
                {item.amount}
              </Text>
              <Text style={[styles.text, {right: moderateScale(15)}]}>
                {item.fee}
              </Text>
              <Text style={[styles.text, {right: moderateScale(20)}]}>
                {item.comment}
              </Text>
              {item.status == 1 ? (
                <Text style={[styles.text, {right: 80}]}>Completed</Text>
              ) : (
                <Text style={[styles.text, {right: 80}]}>Pending</Text>
              )}
            </View>
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={() => (
            <View style={{margin: moderateScale(25)}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'left',
                  marginLeft: moderateScale(80),
                }}>
                No records Found...
              </Text>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            marginLeft: '15%',
            marginTop: '5%',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 16,
              textAlign: 'left',
            }}>
            No records Found...
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default WalletHistory;

const styles = StyleSheet.create({
  // TitleView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: 'black',
  //   padding: textSize.componentsDifferenceLow,
  // },
  // text: {
  //   color: 'white',
  //   fontSize: textSize.h5,
  //   textAlign: 'center',
  //   width: moderateScale(150),
  // },
  TitleView: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: textSize.componentsDifferenceLow,
  },
  text: {
    color: '#FFF',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(100),
  },

  FlatListHeaderView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    height: getDimen(0.11),
    width: moderateScale(130),
    paddingLeft: moderateScale(22),
    paddingRight: moderateScale(22),
    borderTopWidth: 0.5,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: textSize.h5,
    width: moderateScale(90),
  },
  textStyle1: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: textSize.h5,
    // width: 120,
  },
  flatListContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    justifyContent: 'space-between',
    padding: textSize.componentsDifference,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  Titletext: {
    color: '#fff',
    fontSize: textSize.h5,
    textAlign: 'left',
    width: moderateScale(100),
  },
});

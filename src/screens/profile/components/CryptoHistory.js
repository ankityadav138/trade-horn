import React from 'react';
import {useTheme} from '@react-navigation/native';
import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import {getDimen} from '../../../dimensions/dimen';
import textSize from '../../../constants/textSize';
import {moderateScale} from 'react-native-size-matters';

function CryptoHistory({cryptoHistoryData}) {
  // console.log("data in CryptoHistory component", cryptoHistoryData && cryptoHistoryData.data)
  const {colors} = useTheme();

  const walletData = [];

  const HeaderData = [
    {
      id: '1',
      title: ' Date',
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
      title: 'Notes',
    },
    {
      id: '7',
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
    <ScrollView horizontal style={{marginHorizontal: 10}}>
      {cryptoHistoryData && cryptoHistoryData.data != [] ? (
        <FlatList
          // style={{
          //    flex:1
          // }}
          data={cryptoHistoryData.data}
          renderItem={({item, index}) => (
            <View ew style={styles.flatListContainer}>
              <Text style={[styles.text]}>
                {item.date.slice(0, 10)} {item.date.slice(11)}
              </Text>
              <Text style={[styles.text]}>{item.currency.toUpperCase()}</Text>
              <Text style={[styles.text]}>{item.type}</Text>
              <Text style={styles.text}>
                {parseFloat(item.amount).toFixed(2).toString()}
              </Text>
              <Text style={styles.text}>
                {parseFloat(item.fee).toFixed(2).toString()}
              </Text>
              <Text style={[styles.text]}>{item.comment}</Text>
              {item.status == 1 ? (
                <Text style={[styles.text]}>Completed</Text>
              ) : (
                <Text style={[styles.text]}>Pending</Text>
              )}
            </View>
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={() => (
            <View style={{margin: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'left',
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
            marginLeft: '10%',
            marginTop: '5%',
          }}>
          <Text style={styles.textStyle1}>No records Found...</Text>
        </View>
      )}
    </ScrollView>
  );
}

export default CryptoHistory;

const styles = StyleSheet.create({
  //new

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

  // old
  // TitleView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: 'black',
  //   padding: textSize.componentsDifferenceLow,
  // },
  // text: {
  //   color: '#fff',
  //   fontSize: textSize.h6,
  //   textAlign: 'center',
  //   width: moderateScale(120),
  // },
  // FlatListHeaderView: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   backgroundColor: 'black',
  //   height: getDimen(0.11),
  //   width: moderateScale(130),
  //   paddingLeft: moderateScale(22),
  //   paddingRight: moderateScale(22),
  //   borderTopWidth: 0.5,
  // },
  // textStyle: {
  //   textAlign: 'center',
  //   color: 'white',
  //   fontWeight: '500',
  //   fontSize: textSize.h5,
  //   width: moderateScale(90),
  //   height: getDimen(0.11),
  // },
  // textStyle1: {
  //   color: 'white',
  //   fontWeight: '500',
  //   fontSize: textSize.h5,
  //   // width: 120,
  //   textAlign: 'left',
  // },
  // flatListContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
});

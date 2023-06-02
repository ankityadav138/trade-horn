import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import textSize from '../../../constants/textSize';
import {MARKET_TRADE} from '../../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';

const MarketTrade = ({data}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [openOrderData, setOpenOrderData] = useState('');
  const marketTradeData = useSelector(state => state.order.marketTradeData);
  const accessToken = useSelector(state => state.login.accessToken);

  useEffect(() => {
    dispatch({
      type: MARKET_TRADE,
      payload: {token: accessToken},
    });
  }, []);

  useEffect(() => {
    if (marketTradeData && marketTradeData.data) {
      if (Object.keys(marketTradeData).length > 0) {
        setOpenOrderData(marketTradeData.data.trade_history);
        // console.log(
        //   'MARKET DATA ===>',
        //   marketTradeData.data.trade_history.length,
        // );
      }
    }
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.tableView}>
        <Text style={[styles.text, {color: 'green'}]}>
          {item.type.toUpperCase()}
        </Text>
        <Text style={[styles.text, {color: 'green'}]}>
          {item.price.slice(0, 10)}
        </Text>
        <Text style={[styles.text, {left: moderateScale(20)}]}>
          {item.amount}
        </Text>
        <Text style={[styles.text, {left: moderateScale(20)}]}>
          {item.date.slice(11, 19)}
        </Text>
      </View>
    );
  };

  const HeaderData = [
    {
      id: '1',
      title: 'Type',
    },
    {
      id: '2',
      title: 'Price',
    },
    {
      id: '3',
      title: '     Amount',
    },
    {
      id: '5',
      title: '     Time',
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
    <View style={styles.HeaderView}>
      <LinearGradient
        style={{
          width: '90%',
          borderRadius: 6,
          marginHorizontal: '5%',
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{}}>
          <ScrollView horizontal>
            <FlatList
              data={openOrderData}
              renderItem={item => renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={ListHeader}
            />
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    width: '100%',
  },
  TitleView: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: textSize.componentsDifferenceLow,
  },
  text: {
    color: '#FFF',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(70),
  },
  tableView: {
    justifyContent: 'space-between',
    //: textSize.componentsDifference,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
  },
  Titletext: {
    color: '#FFF',
    fontSize: textSize.h5,
    textAlign: 'left',
    width: moderateScale(70),
  },
});

export default MarketTrade;

import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import textSize from '../../../constants/textSize';
import {MARKET_TRADE} from '../../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {useIsFocused} from '@react-navigation/native';

const OrderBook = ({data}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [buyOrderData, setBuyOrderData] = useState('');
  const [sellOrderData, setSellOrderData] = useState('');

  const marketTradeData = useSelector(state => state.order.marketTradeData);
  const accessToken = useSelector(state => state.login.accessToken);

  useEffect(() => {
    dispatch({
      type: MARKET_TRADE,
      payload: {token: accessToken},
    });
  }, [isFocused]);

  useEffect(() => {
    //console.log(marketTradeData.length)
    if (Object.keys(marketTradeData).length > 0) {
      setBuyOrderData(marketTradeData.data.buy_history);
      //console.log(
      // 'BUY ORDER DATA ===>',
      // marketTradeData.data.buy_history.length,
      //);
    }
  }, [buyOrderData]);

  useEffect(() => {
    if (Object.keys(marketTradeData).length > 0) {
      setSellOrderData(marketTradeData.data.sell_history);
      //console.log('SELL ORDER DATA ===>', sellOrderData);
    }
  }, [sellOrderData]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.tableView}>
        <Text style={[styles.text, {color: 'green'}]}>
          {item.price.slice(0, 10)}
        </Text>
        <Text style={[styles.text]}>{item.amount}</Text>
        <Text style={[styles.text, {left: moderateScale(2)}]}>
          {item.total}
        </Text>
      </View>
    );
  };

  const renderItem2 = ({item}) => {
    return (
      <View style={styles.tableView}>
        <Text style={[styles.text, {color: 'red'}]}>
          {item.price.slice(0, 10)}
        </Text>
        <Text style={styles.text}>{item.amount}</Text>
        <Text style={styles.text}>{item.total}</Text>
      </View>
    );
  };

  const HeaderData = [
    {
      id: '1',
      title: ' Price (USDT)',
    },
    {
      id: '3',
      title: 'Amount (BTC)',
    },
    {
      id: '5',
      title: 'Total (USDT)',
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
        <ScrollView>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <ScrollView horizontal>
              <FlatList
                data={buyOrderData}
                scrollEnabled={false}
                renderItem={item => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ListHeader}
              />

              <FlatList
                data={sellOrderData}
                scrollEnabled={false}
                renderItem={item => renderItem2(item)}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={ListHeader}
              />
            </ScrollView>
          </View>
        </ScrollView>
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
    width: moderateScale(100),
  },
  tableView: {
    justifyContent: 'space-between',
    padding: textSize.componentsDifference,
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
    width: moderateScale(100),
  },
});

export default OrderBook;

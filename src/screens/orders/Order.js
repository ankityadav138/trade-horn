import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';
import {AppColors} from '../../constants/appColors';
import textSize from '../../constants/textSize';
import Toolbar from '../../constants/toolbar';
import GraphChart from '../graph/GraphChart';
import Assets from './components/Assets';
import ClosedOrder from './components/ClosedOrder';
import MarketGraph from './components/MarketGraph';
import MarketTrade from './components/MarketTrade';
import OpenOrder from './components/OpenOrder';
import OrderBook from './components/OrderBook';
import {useIsFocused} from '@react-navigation/native';
import {GET_OPEN_ORDER, GET_PAIRDETAIL} from './../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale, scale} from 'react-native-size-matters';

const Order = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState('Order Book');
  const accessToken = useSelector(state => state.login.accessToken);
  const pageName = useSelector(state => state.common.pageName);

  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch({
      type: GET_OPEN_ORDER,
      payload: {token: accessToken},
    });
    dispatch({
      type: GET_PAIRDETAIL,
      payload: {token: accessToken},
    });
  }, [isFocused]);

  const DATA = [
    'Order Book',
    'Open Order',
    'Closed Order',
    'Market trades',
    'Assets',
  ];

  const renderTab = tab => {
    dispatch({
      type: GET_OPEN_ORDER,
      payload: {token: accessToken},
    });
    switch (tab) {
      case 'Order Book':
        return <OrderBook />;
      case 'Open Order':
        return <OpenOrder />;
      case 'Closed Order':
        return <ClosedOrder />;
      case 'Market trades':
        return <MarketTrade />;
      case 'Assets':
        return <Assets />;
    }
  };

  const renderItem = ({item}) => {
    const isSelectedUser = selectedIndex === item;

    return (
      <TouchableOpacity style={{}} onPress={() => setSelectedIndex(item)}>
        <View
          style={{
            paddingHorizontal: textSize.componentsDifferenceMediam,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: textSize.h4,
              textAlign: 'center',
              // textDecorationLine: isSelectedUser ? 'underline' : null,
              // textDecorationColor: isSelectedUser ? 'black' : null,
              // textDecorationStyle: {color: isSelectedUser ? 'black' : null},
              // textShadowOffset: 1,
              fontFamily: '',
              borderBottomColor: 'black',
              borderBottomWidth: isSelectedUser ? 2 : 0,
            }}>
            {item}
          </Text>

          {/* {isSelectedUser ? (
            <View
              style={
                {
                  // backgroundColor: 'red',
                  // height: 2,
                  //width: '60%',
                  //marginVertical: 4,
                }
              }
            />
          ) : null} */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Toolbar navigation={navigation} title={'Dashboard'} />
      <LinearGradient
        style={{flex: 1}}
        colors={[AppColors().gradientColor1, AppColors().gradientColor3]}>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: textSize.componentsDifferenceLow,
          }}>
          <View
            style={{
              paddingHorizontal: textSize.componentsDifferenceMediam,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: textSize.h3,
                fontWeight: 'bold',
                width: scale(80),
                textAlign: 'center',
              }}>
              MARKET
            </Text>
            {pageName == 'MARKET' ? (
              <View
                style={{
                  backgroundColor: 'black',
                  height: 2,
                  width: scale(80),
                  marginVertical: 4,
                }}
              />
            ) : null}
          </View>
          <View
            style={{
              paddingHorizontal: textSize.componentsDifferenceMediam,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: textSize.h3,
                fontWeight: 'bold',
                width: scale(100),
                textAlign: 'center',
              }}>
              EXCHANGE
            </Text>
            {pageName == 'EXCHANGE' ? (
              <View
                style={{
                  backgroundColor: 'black',
                  height: 2,
                  width: scale(100),
                  marginVertical: 4,
                }}
              />
            ) : null}
          </View>
        </View> */}
        <View style={{alignItems: 'center'}}>
          {/* <Text
            style={{
              color: 'white',
              fontSize: textSize.h1,
              width: '100%',
              textAlign: 'center',
            }}>
            ORDER
          </Text> */}
          {/* <View
            style={{
              backgroundColor: 'black',
              height: 2,
              width: '30%',
              marginVertical: 4,
            }}
          /> */}

          <View style={{height: 300}}>
            {/* <MarketGraph /> */}
            <GraphChart />
          </View>

          <FlatList
            data={DATA}
            renderItem={item => renderItem(item)}
            horizontal={true}
            keyExtractor={index => index.toString()}
            style={{marginVertical: textSize.componentsDifferenceLow}}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{marginBottom: 50}}>{renderTab(selectedIndex)}</View>
      </LinearGradient>
    </View>
  );
};

export default Order;
const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1,
    padding: textSize.componentsDifferenceMediam,
    justifyContent: 'space-between',
  },
  iconImageStyle: {
    height: 250,
    width: 250,
  },
  componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
});

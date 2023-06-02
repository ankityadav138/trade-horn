import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import textSize from '../constants/textSize';
import {getDimen} from '../dimensions/dimen';
import BuyView1 from './buy/components/BuyView1';
import BuyView2 from './buy/components/BuyView2';
import GraphChart from './graph/GraphChart';
import Buy from './Buy';
import {AppColors} from '../constants/appColors';
import {useSelector} from 'react-redux';

const BuyBtcScreen = ({navigation, route}) => {
  // const item = route.param.item;
  const text = route.params.text;
  const price = route.params.text.change;
  const pair = route.params.text.pair;

  const [currentCoin, setCurrentCoin] = useState('');
  const [firstCoin, setFirstCoin] = useState('');

  const themeColorData = useSelector(state => state.login.themeValue);
  const pairdetailData = useSelector(state => state.order.pairdetailData);

  useEffect(() => {
    //console.log('pairdetailData ====', pairdetailData)
    setCurrentCoin(
      pairdetailData &&
        pairdetailData.data &&
        pairdetailData.data.secondcurrency,
    );
    setFirstCoin(
      pairdetailData &&
        pairdetailData.data &&
        pairdetailData.data.firstcurrency,
    );
  }, [pairdetailData]);

  return (
    <View style={styles(themeColorData).container}>
      {/* toolbar */}
      <View style={styles(themeColorData).toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            name="arrow-back"
            size={20}
            color={AppColors(themeColorData).title}
          />
        </TouchableOpacity>
        <Text style={styles(themeColorData).screenName}>
          {' '}
          {/* {firstCoin && firstCoin.toUpperCase()}/{' '}
          {currentCoin && currentCoin.toUpperCase()} */}
          {pair.toUpperCase()}
          {/* BTC/USDT */}
        </Text>
        <Text style={styles(themeColorData).screenBalance}> {price}% </Text>
      </View>
      <GraphChart />
      <View style={{marginVertical: 10}}></View>
      {/* */}
      <BuyView1 />

      {/* <ScrollView>
        <Buy />
      </ScrollView> */}

      <View></View>
    </View>
  );
};
// console.log('hello');
export default BuyBtcScreen;

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors(themeColorData).background,
    },
    subcontainer1: {
      backgroundColor: AppColors(themeColorData).backgroundLight,
      padding: 10,
    },
    toolbar: {
      flexDirection: 'row',
      margin: 10,
      marginTop: 20,
    },

    screenName: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h2,
      width: getDimen(0.29),
    },
    screenBalance: {
      color: AppColors(themeColorData).red,
      fontSize: textSize.h3,
      width: getDimen(0.5),
    },
  });

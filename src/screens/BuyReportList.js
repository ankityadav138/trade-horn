import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import AppButton from '../constants/AppButton';
const BuyReportList = ({navigation}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'ETH/USDT',
      amount: '3,942.45',
      rate: '+11.28',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'ETH/USDT',
      amount: '751.45',
      rate: '+11.28',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'ETH/USDT',
      amount: '802.45',
      rate: '+11.28',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      title: 'ETH/USDT',
      amount: '3,942.45',
      rate: '+9.00',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d74',
        title: 'ETH/USDT',
        amount: '3,942.45',
        rate: '+12.27',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d75',
        title: 'ETH/USDT',
        amount: '3,942.45',
        rate: '+11.28',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d76',
        title: 'ETH/USDT',
        amount: '942.45',
        rate: '+15.0',
      },
  ];
  const Item = ({title, amount, rate}) => (
    <View style={styles.item}>
      <Icons name="star-outline" size={20} color="#FFFFFF" style={{width: '10%'}} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{amount}</Text>
      <Text style={styles.title}>{rate}</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <Item title={item.title} amount={item.amount} rate={item.rate} />
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Backgrond.png')}
        style={{
          flex: 1,
          padding: 16,
        }}>
        {/* Header view*/}
        <View style={styles.headerWrapper}>
          <Icons name="person" size={30} color="#FFFFFF" />
          <Image
            style={{height: 30, width: 100, marginTop: 16}}
            source={require('../assets/Logo.png')}
            resizeMode={'contain'}
          />
          <Icons name="search" size={30} color="#FFFFFF" />
        </View>
        {/* end */}
        <View style={styles.boxWrapperView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={{color: '#FFF', fontSize: 16}}>BTC/USDT</Text>
            <Text style={{color: '#FFF', fontSize: 16}}>Change</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={{color: '#FFF', fontSize: 14}}>24H Higth</Text>
            <Text style={{color: '#FFF', fontSize: 14}}>24H Low</Text>
            <Text style={{color: '#FFF', fontSize: 14}}>24H Volumn</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            padding: 10,
          }}>
          <Text style={{color: '#000', fontSize: 14}}>BTC/USDT</Text>
          <Text style={{color: '#000', fontSize: 14}}>15m</Text>
          <Icons name="add-circle-outline" size={25} color="#000" />
          <Icons name="cellular-outline" size={25} color="#000" />
          <Icons name="arrow-undo-outline" size={25} color="#000" />
          <Icons name="arrow-redo-outline" size={25} color="#000" />
          <Icons name="settings-outline" size={25} color="#000" />
          <Icons name="expand-outline" size={25} color="#000" />
          <Icons name="camera-outline" size={25} color="#000" />
        </View>
        <View style={{height: '60%'}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderTopColor: '#FFF',
            borderTopWidth: 2,
          }}>
          <View
            style={{
              width: '70%',
              borderRightWidth: 1,
              borderRightColor: '#FFF',
            }}>
            <TouchableOpacity onPress={()=>navigation.navigate('BuyReport')}>   
            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>
              DATA RANGE
            </Text> 
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              justifyContent: 'space-between',
              paddingLeft: 5,
            }}>
            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>
              %
            </Text>
            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>
              LOG
            </Text>
            <Text style={{color: '#FFF', fontSize: 16, fontWeight: 'bold'}}>
              AUTO
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  boxWrapperView: {
    backgroundColor: '#3F535D',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 0,
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    color: '#FFF',
    width: '33%',
    textAlign: 'center'
  },
});
export default BuyReportList;

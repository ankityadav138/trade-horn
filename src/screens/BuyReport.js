import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

const BuyReport = ({navigation}) => {
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
        <View style={{height: '60%'}}></View>
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
            <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>
              DATA RANGE
            </Text>
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
});
export default BuyReport;

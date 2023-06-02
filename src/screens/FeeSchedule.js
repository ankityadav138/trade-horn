import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Toolbar from '../constants/toolbar';

const FeeSchedule = ({navigation}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullname: 'bitcoin',
      asset: 'BTC',
      fee: '0 BTC',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullname: 'tether',
      asset: 'USDT',
      fee: '0.5 USDT',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullname: 'binancecoin',
      asset: 'BNB',
      fee: '0.001 BNB',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      fullname: 'bitcoin',
      asset: 'BTC',
      fee: '0 BTC',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      fullname: 'LINK',
      asset: 'LINK',
      fee: '0 LINK',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',
      fullname: 'bitcoin',
      asset: 'BTC',
      fee: '0 BTC',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d76',
      fullname: 'stkv',
      asset: 'STKV',
      fee: '0 STKV',
    },
  ];
  const ListHeaderComponent = () => (
    <View style={styles.listHeaderWrapper}>
      <Text style={styles.title}>Asset</Text>
      <Text style={styles.title}>Full Name</Text>
      <Text style={styles.title}>Withdrawal Fee</Text>
    </View>
  );
  const Item = ({asset, fullname, fee}) => (
    <View style={styles.item}>
      <Icons
        name="star-outline"
        size={20}
        color="#FFFFFF"
        style={{width: '8%'}}
      />
      <Text style={styles.bodyText}>{asset}</Text>
      <Text style={styles.bodyText}>{fullname}</Text>
      <Text style={styles.bodyText}>{fee}</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <Item asset={item.asset} fullname={item.fullname} fee={item.fee} />
  );
  return (
    <View style={[styles.HeaderView]}>
         <Toolbar navigation={navigation}  />
      {/* Header view*/}
      {/* <View style={styles.headerWrapper}>
        <Icons name="person" size={30} color="#FFFFFF" />
        <Image
          style={{height: 30, width: 100, marginTop: 16}}
          source={require('../assets/Logo.png')}
          resizeMode={'contain'}
        />
        <Icons name="search" size={30} color="#FFFFFF" />
      </View> */}
      <View style={{flexDirection:'row',marginTop:'2%'}}>
      <TouchableOpacity  onPress={()=>navigation.goBack()}>
      <Icons
            style={{
              //color: colors.heading,
              textAlign: 'left',
              marginLeft:22
            }}
            name="arrow-back"
            size={20}
            color={'white'}
          />
          </TouchableOpacity>
          <Text style={styles.backTitleNavText}>Fee Schedule</Text>    
        </View>
      {/* end */}
      {/* <View style={styles.backNavView}>
        <TouchableOpacity style={{width: '12%'}} onPress={()=>navigation.goBack()}>
          <Icons name="arrow-back-outline" size={35} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.backTitleNavText}>Fee Schedule</Text>
        </View>
      </View> */}
      
      <View style={styles.listWrapperView}>
        <View>
          <Text style={styles.listTitleText}>Fee Schedule</Text>
        </View>
        <View>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={ListHeaderComponent}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  HeaderView: {
    flex:1,
    backgroundColor:'#0466C0'
  },
  container: {
    flex: 1,
    padding: 12,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerSectionView: {
    width: '32%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerSectionTitle: {
    color: '#FFF',
    fontSize: 18,
  },
  backNavView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  backTitleNavText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft:10
  },
  listWrapperView: {
    backgroundColor: '#061E39',
    borderRadius: 15,
    marginTop: 25,
    margin:10,
    flex:0.95
  },
  listTitleText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
    margin: 15,
  },
  listHeaderWrapper: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#091326',
    padding: 10,
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
    fontWeight: '600',
    color: '#FFF',
    width: '33%',
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 14,
    color: '#FFF',
    width: '33%',
    textAlign: 'center',
  },
});
export default FeeSchedule;

import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import textSize from '../../../constants/textSize';
import {GET_ASSETS} from '../../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';

const Assets = ({data}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [openOrderData, setOpenOrderData] = useState('');
  const assetsData = useSelector(state => state.order.assetsData);
  // console.log('=========ASSETS DATA ===========>', assetsData);
  const accessToken = useSelector(state => state.login.accessToken);

  useEffect(() => {
    dispatch({
      type: GET_ASSETS,
      payload: {token: accessToken},
    });
  }, []);

  useEffect(() => {
    // if (Object.keys(assetsData).length > 0) {
    setOpenOrderData(assetsData.data);
    //console.log('ASSETS DATA ===========>', openOrderData);
    // }
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.tableView}>
        <Text style={styles.text1}>{item.currency.toUpperCase()}</Text>
        <Text style={[styles.text, {left: moderateScale(6)}]}>
          {parseFloat(item.amount).toFixed(8).toString()}
        </Text>
        <Text style={[styles.text, {left: moderateScale(25)}]}>
          {parseFloat(item.inorder).toFixed(8).toString()}
        </Text>
        <Text style={[styles.text, {right: moderateScale(3)}]}>
          {parseFloat(item.amount_btc).toFixed(8).toString()}
        </Text>
      </View>
    );
  };

  const HeaderData = [
    {
      id: '1',
      title: '             Coin',
    },
    {
      id: '2',
      title: 'Available Balance',
    },
    {
      id: '3',
      title: '      In Order',
    },
    {
      id: '5',
      title: 'BTC Value',
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
    padding: textSize.componentsDifference,
    alignItems: 'flex-end',
  },
  text: {
    color: '#FFF',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(120),
  },
  text1: {
    color: '#FFF',
    fontSize: textSize.h6,
    textAlign: 'left',
    width: moderateScale(50),
  },
  tableView: {
    justifyContent: 'space-evenly',
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
    width: moderateScale(140),
    right: moderateScale(20),
  },
});

export default Assets;

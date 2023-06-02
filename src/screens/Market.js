import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import textSize from '../constants/textSize';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getDimen} from '../dimensions/dimen';
import {GET_PAIRLIST} from '../store/action';
import {AppColors} from '../constants/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MarketFooterTable from '../components/MarketFooterTable';

const Market = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState('Market');
  const DATA = ['Market'];
  const [searchPair, setSearchPair] = useState(false);
  const [searchBox, setSearchBox] = useState('');
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.login.accessToken);
  const pairlistData = useSelector(state => state.order.pairlistData);
  const themeColorData = useSelector(state => state.login.themeValue);

  useEffect(() => {
    dispatch({
      type: GET_PAIRLIST,
      payload: {token: accessToken},
    });
  }, []);

  const renderItem = ({item}) => {
    const isSelectedUser = selectedIndex === item;
    return (
      <TouchableOpacity onPress={() => setSelectedIndex(item)}>
        <View
          style={{
            backgroundColor: AppColors(themeColorData).background,
            paddingHorizontal: textSize.componentsDifferenceLow,
          }}>
          <Text
            style={{
              color: AppColors(themeColorData).title,
              fontSize: textSize.h1,
              fontFamily: '',
              // right: moderateScale(16),
              textAlign: 'left',
              fontWeight: '800',
              marginHorizontal: 7,
              // borderBottomWidth: isSelectedUser ? 2 : 0,
            }}>
            {item}
          </Text>

          {/* {isSelectedUser ? (
            <View
              style={{
                backgroundColor: 'black',
                height: 2,
                width: '100%',
                marginVertical: 4,
              }}
            />
          ) : null} */}
        </View>
      </TouchableOpacity>
    );
  };

  const renderTab = tab => {
    switch (tab) {
      case 'Market':
        return <MarketFooterTable searchBox={searchBox} filter={filter} />;
    }
  };
  const searchpairdata = e => {
    setSearchBox(e);
    // const text = e.charAt(0).toUpperCase() + e.slice(1);
    const text = e?.toLowerCase();
    const filterData = pairlistData?.data?.filter(item =>
      item.pair.includes(text),
    );
    // console.log('FILTERDATA',filterData)
    setFilter(filterData);
  };

  return (
    <View
      style={{flex: 1, backgroundColor: AppColors(themeColorData).background}}>
      <View style={styles(themeColorData).HeaderView}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {accessToken ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditPortfolio')}>
              <FontAwesome
                name="user"
                size={25}
                color={AppColors(themeColorData).title}
                style={{marginVertical: 5}}
              />
            </TouchableOpacity>
          ) : (
            <FontAwesome
              name="user"
              size={25}
              color={AppColors(themeColorData).title}
              style={{marginVertical: 5}}
            />
          )}
          {/* <Image
            style={Appstyles(themeColorData).appLogoToolbar}
            source={require('../assets/Logo.png')}
          /> */}
          <TouchableOpacity
            onPress={() => {
              setSearchPair(true);
            }}>
            <Icon
              name="search"
              size={24}
              color={AppColors(themeColorData).title}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: AppColors(themeColorData).background}}>
        {searchPair == true ? (
          <View style={styles(themeColorData).section}>
            <TextInput
              onChangeText={searchBox => searchpairdata(searchBox)}
              style={styles(themeColorData).textinput}
              placeholderTextColor={AppColors(themeColorData).title}
              underlineColorAndroid="transparent"
              placeholder="Search Pair"
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={() => {
                setSearchPair(false);
              }}>
              <Icon
                name="close"
                size={25}
                color={AppColors(themeColorData).title}
                style={{marginRight: '2%'}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <LinearGradient
        style={{flex: 1}}
        colors={[
          AppColors(themeColorData).background,
          AppColors(themeColorData).background,
        ]}>
        <View>
          <FlatList
            data={DATA}
            renderItem={item => renderItem(item)}
            horizontal={true}
            keyExtractor={index => index.toString()}
            style={{
              width: '100%',
              marginVertical: textSize.componentsDifferenceLow,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>{renderTab(selectedIndex)}</View>
      </LinearGradient>
    </View>
  );
};

export default Market;

const styles = themeColorData =>
  StyleSheet.create({
    imageBackgroundStyle: {
      flex: 1,
      //padding: textSize.componentsDifferenceLow,
      justifyContent: 'space-between',
    },
    iconImageStyle: {
      height: 250,
      width: 250,
    },
    componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
    HeaderView: {
      backgroundColor: AppColors(themeColorData).background,
      justifyContent: 'flex-start',
      alignItems: 'center',
      // height: moderateScale(60),
      paddingHorizontal: 16,
      flexDirection: 'row',
      marginTop: '5%',
    },
    textinput: {
      padding: 8,
      alignSelf: 'center',
      flex: 1,
      paddingLeft: 10,
      color: AppColors(themeColorData).title,
    },
    section: {
      // margin: 10,
      // backgroundColor:AppColors(themeColorData).title
      // color:'black',
      flexDirection: 'row',
      // justifyContent: "center",
      alignItems: 'center',
      backgroundColor: AppColors(themeColorData).backgroundLight,
      borderWidth: 0.5,
      borderColor: AppColors(themeColorData).subText,
      // height: 40,
      width: '100%',
      // borderRadius: 5,
      //margin: 10,
      paddingLeft: 10,
    },
  });

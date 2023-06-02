import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import textSize from '../../constants/textSize';

import {useIsFocused} from '@react-navigation/native';
import {GET_OPEN_ORDER, GET_PAIRDETAIL} from './../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale, scale} from 'react-native-size-matters';
import TradeOrder from './components/TradeOrder';
import ClosedOrder from './components/ClosedOrder';
import OpenOrder from './components/OpenOrder';
import {AppColors} from '../../constants/appColors';

const OrderScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState('Open Order');
  const accessToken = useSelector(state => state.login.accessToken);
  const pageName = useSelector(state => state.common.pageName);
  const themeColorData = useSelector(state => state.login.themeValue);

  const isFocused = useIsFocused();

  const DATA = ['Open Order', 'Close Order', 'Trade Order'];

  const renderItem = ({item}) => {
    const isSelectedUser = selectedIndex === item;
    console.log('hello');
    return (
      <View>
        <TouchableOpacity onPress={() => setSelectedIndex(item)}>
          <View
            style={{
              backgroundColor: isSelectedUser
                ? AppColors(themeColorData).lightPurple
                : null,
              borderRadius: 10,
              paddingHorizontal: textSize.componentsDifferenceMediam,
              justifyContent: 'space-around',
            }}>
            <Text
              style={{
                color: AppColors(themeColorData).subText,
                // fontSize: textSize.h4,
                fontSize: 15,
                textAlign: 'center',
                fontFamily: '',
                borderBottomColor: AppColors(themeColorData).background,
                height: 40,
                borderRadius: 10,
                top: 7,
                fontWeight: isSelectedUser ? '900' : null,
                color: isSelectedUser
                  ? AppColors(themeColorData).title
                  : AppColors(themeColorData).subText,
              }}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const renderTab = tab => {
  //   // dispatch({
  //   //   type: GET_OPEN_ORDER,
  //   //   payload: {token: accessToken},
  //   // });
  //   switch (tab) {
  //     case 'Open Order':
  //       return <OpenOrder />;
  //     case 'Close Order':
  //       return <ClosedOrder />;
  //     case 'Trade Order':
  //       return <TradeOrder />;
  //   }
  // };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors(themeColorData).background,
        paddingTop: moderateScale(30),
      }}>
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={DATA}
          renderItem={item => renderItem(item)}
          horizontal={true}
          keyExtractor={index => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={{
            width: '87%',
            backgroundColor: AppColors(themeColorData).backgroundLight,
            borderRadius: 10,
            alignSelf: 'center',
            marginBottom: moderateScale(6),
          }}
        />
      </View>

      {/* <View>{renderTab(selectedIndex)}</View> */}
      <View>
        <OpenOrder />
        {selectedIndex == 'Open Order' ? <OpenOrder /> : null}
        {selectedIndex == 'Close Order' ? <ClosedOrder /> : null}
        {selectedIndex == 'Trade Order' ? <TradeOrder /> : null}
      </View>
    </View>
  );
};

export default OrderScreen;
const styles = StyleSheet.create({});

// import React, {useEffect, useState, useContext} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   BackHandler,
//   Alert,
//   SectionList,
//   TouchableOpacity,
// } from 'react-native';
// import textSize from '../../constants/textSize';
// import {useDispatch, useSelector} from 'react-redux';
// import {PROFILE, TOP_PAIR_CURRENCY} from '../../store/action';
// import {getDimen} from '../../dimensions/dimen';
// import MarketFooter from '../../components/MasterFooter';
// import {ScrollView} from 'react-native-gesture-handler';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {moderateScale} from 'react-native-size-matters';
// import {useTheme, Switch, TouchableRipple} from 'react-native-paper';
// import {AuthContext} from '../../components/context';
// import {AppColors} from '../../constants/appColors';
// import {useIsFocused} from '@react-navigation/native';
// import TradeOrder from './components/TradeOrder';
// import ClosedOrder from './components/ClosedOrder';
// import OpenOrder from './components/OpenOrder';

// const OrderScreen = ({searchBox, filter}) => {
//   const navigation = useNavigation();
//   const paperTheme = useTheme();
//   const dispatch = useDispatch();
//   const isFocused = useIsFocused();
//   const route = useRoute();

//   const {toggleTheme} = useContext(AuthContext);
//   const [ischecked, setChecked] = useState(false);
//   const [openOrderData, setOpenOrderData] = useState([]);

//   const [isSelected, setSelection] = useState('OpenOrder');
//   const [email, setEmail] = useState('');

//   const accessToken = useSelector(state => state.login.accessToken);
//   const topPairlistData = useSelector(state => state.order.topPairlistData);
//   const pairlistData = useSelector(state => state.order.marketHome);
//   const themeColorData = useSelector(state => state.login.themeValue);
//   const profileData = useSelector(state => state.user.profileData);

//   // console.log(
//   //   'pair list data =============================',
//   //   topPairlistData.data,
//   // topPairlistData.data[0].change,
//   //);

//   useEffect(() => {
//     setEmail(profileData && profileData.data && profileData.data.email);
//   }, [isFocused, profileData]);

//   useEffect(() => {
//     dispatch({
//       type: TOP_PAIR_CURRENCY,
//       payload: {token: accessToken},
//     });
//     if (route.name === 'HomeTabs') {
//       const backHandler = BackHandler.addEventListener(
//         'hardwareBackPress',
//         backAction,
//       );
//       return () => backHandler.remove();
//     }
//     setEmail(profileData && profileData.data && profileData.data.email);
//   }, [isFocused]);

//   const backAction = () => {
//     if (navigation.isFocused()) {
//       BackHandler.exitApp();
//     } else {
//       navigation.goBack();
//     }
//     return true;
//   };

//   const DATA = [
//     {
//       title: 'Form1',
//       data: [],
//     },
//   ];

//   const SelectClosedOrder = () => {
//     setSelection('ClosedOrder');
//   };

//   const SelectOpenOrder = () => {
//     setSelection('OpenOrder');
//   };

//   const renderSection = ({section}) => {
//     switch (section.title) {
//       default:
//         return sectionFinal();
//     }
//   };

//   const sectionFinal = () => (
//     <View
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{
//           backgroundColor: AppColors(themeColorData).backgroundLight,
//           width: getDimen(0.95),
//           borderRadius: 10,
//         }}>
//         <View style={styles.horizontalScrollView}>
//           <TouchableOpacity
//             onPress={() => SelectOpenOrder()}
//             style={[
//               styles.horizontaScrollSectionWrapper,
//               {
//                 backgroundColor:
//                   isSelected == 'OpenOrder'
//                     ? AppColors(themeColorData).lightPink
//                     : null,
//                 padding: 2,
//                 borderRadius: isSelected == 'OpenOrder' ? 10 : null,
//               },
//             ]}>
//             <Text
//               style={[
//                 styles.headerSectionTitle,
//                 {
//                   color:
//                     isSelected == 'OpenOrder'
//                       ? AppColors(themeColorData).title
//                       : AppColors(themeColorData).title,
//                   fontWeight: isSelected == 'OpenOrder' ? '700' : null,
//                 },
//               ]}>
//               Open Order
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => SelectClosedOrder()}
//             style={[
//               styles.horizontaScrollSectionWrapper,
//               {
//                 // backgroundColor:
//                 //   isSelected == 'ClosedOrder' ? '#736C7F' : '#202020B5',
//                 backgroundColor:
//                   isSelected == 'ClosedOrder'
//                     ? AppColors(themeColorData).lightPink
//                     : null,
//                 padding: 2,
//                 borderRadius: 10,
//               },
//             ]}>
//             <Text
//               style={[
//                 styles.headerSectionTitle,
//                 {
//                   // color: isSelected == 'ClosedOrder' ? '#ffff' : '#E3E3E3B0',
//                   color:
//                     isSelected == 'ClosedOrder'
//                       ? AppColors(themeColorData).title
//                       : AppColors(themeColorData).title,
//                   fontWeight: isSelected == 'ClosedOrder' ? '700' : null,
//                 },
//               ]}>
//               Closed Order{' '}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => setSelection('TradeOrder')}
//             style={[
//               styles.horizontaScrollSectionWrapper,
//               {
//                 // backgroundColor:
//                 //   isSelected == 'TradeOrder' ? '#736C7F' : '#202020B5',
//                 backgroundColor:
//                   isSelected == 'TradeOrder'
//                     ? AppColors(themeColorData).lightPink
//                     : null,
//                 padding: 2,
//                 borderRadius: 10,
//               },
//             ]}>
//             <Text
//               style={[
//                 styles.headerSectionTitle,
//                 {
//                   // color: isSelected == 'TradeOrder' ? '#ffff' : '#E3E3E3B0',
//                   color:
//                     isSelected == 'TradeOrder'
//                       ? AppColors(themeColorData).title
//                       : AppColors(themeColorData).title,
//                   fontWeight: isSelected == 'TradeOrder' ? '700' : null,
//                 },
//               ]}>
//               Trade Order
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       {isSelected == 'OpenOrder' ? <OpenOrder /> : null}
//       {isSelected == 'ClosedOrder' ? <ClosedOrder /> : null}
//       {isSelected == 'TradeOrder' ? <TradeOrder /> : null}
//     </View>
//   );

//   return (
//     <View style={{backgroundColor: AppColors(themeColorData).background}}>
//       <SectionList
//         sections={DATA}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({item}) => null}
//         renderSectionHeader={renderSection}
//         showsVerticalScrollIndicator={false}
//         initialNumToRender={4}
//       />
//     </View>
//   );
// };

// export default OrderScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: {},
//   },
//   flatlistContainer: {
//     // backgroundColor: '#202020B5',
//     marginBottom: '3%',
//     //height: getDimen(0.38),
//     width: getDimen(0.6),
//     alignSelf: 'center',
//     borderRadius: 15,
//     elevation: 5,
//     justifyContent: 'space-between',
//     marginHorizontal: 5,
//     marginTop: moderateScale(20),
//     marginVertical: moderateScale(20),
//   },
//   textStyle: {
//     // color: '#FFFFFF',
//     fontSize: textSize.h2,
//     //width: '50%',
//     fontFamily: '',
//     // left: getDimen(0.09),
//     fontWeight: '700',
//   },
//   subtextStyle: {
//     // color: '#FFFFFF',
//     fontSize: textSize.h3,
//     fontFamily: '',
//     // left: getDime / n(0.03),
//     // width: '50%',
//   },
//   paratextStyle: {
//     // color: '#6B6B6B',
//     fontSize: textSize.h5,
//     fontFamily: '',
//     // width: '50%',
//     // left: getDimen(0.01),
//   },
//   listHeaderWrapper: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 38, // initaly was 35
//     backgroundColor: '#FFFFFF',
//     padding: 0,
//   },
//   // headerSectionView: {
//   //   width: '32%',
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   //   paddingVertical: 0,
//   //   flexDirection: 'row',
//   //   backgroundColor: '#FFFFFF',
//   // },
//   headerSectionTitle: {
//     color: '#8B8B8B',
//     //fontSize: textSize.h5,
//     fontSize: 15,
//     textAlign: 'center',
//     // width: moderateScale(50),
//     fontFamily: '',
//     fontWeight: '500',
//     paddingHorizontal: 25,
//     textAlign: 'center',
//     borderRadius: 5,
//   },
//   // headerSectionTitle1: {
//   //   color: '#202020B5',
//   //   fontSize: textSize.h6,
//   //   // numberOfLines: 1,
//   //   textAlign: 'left',
//   //   width: moderateScale(50),
//   //   fontWeight: '900',
//   // },
//   horizontalScrollView: {
//     width: '100%',
//     // backgroundColor: 'red',
//     height: getDimen(0.12),
//     marginBottom: 0,
//     flexDirection: 'row',
//     // marginHorizontal: getDimen(0.04),
//     //borderRadius: 10,

//     // flex: 1,
//     borderRadius: 10,
//     justifyContent: 'space-between',
//   },
//   horizontaScrollSectionWrapper: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: getDimen(0.0),
//     backgroundColor: '#202020B5',
//     height: getDimen(0.12),
//     width: getDimen(0.32),
//     shadowColor: '#202020B5',
//   },
//   welcome: {
//     // color: '#1E7BF6',
//     fontSize: textSize.h3,
//     fontWeight: '700',
//   },
//   username: {
//     // color: '#fff',
//     fontSize: textSize.h1,
//     fontWeight: 'bold',
//     fontFamily: '',
//   },
// });

import React, {useState} from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeSegmentedControlTab from 'react-native-segmented-control-tab';
import {AppColors} from '../../constants/appColors';
import textSize from '../../constants/textSize';
import Toolbar from '../../constants/toolbar';
import ProfileSecurity from './components/ProfileSecurity';
import ProfileVerification from './components/ProfileVerification';
import ProfileMyAssets from './components/ProfileMyAssets';
import ProfileWalletHistory from './components/ProfileWalletHistory';
import ProfileOpenOrder from './components/ProfileOpenOrder';
import ProfileOrderHistory from './components/ProfileOrderHistory';
import ProfileTicket from './components/ProfileTicket';

const ProfileDetails = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState('Security');
  const DATA = [
    'Security',
    'Verification',
    'My assets',
    'Wallet History',
    'Open orders',
    'Order History',
    'Ticket',
  ];

  const renderItem = ({item}) => {
    const isSelectedUser = selectedIndex === item;
    return (
      <TouchableOpacity onPress={() => setSelectedIndex(item)}>
        <View
          style={{
            paddingHorizontal: textSize.componentsDifferenceMediam,
          }}>
          <Text style={{color: 'white', fontSize: textSize.h4}}>{item}</Text>

          {isSelectedUser ? (
            <View
              style={{
                backgroundColor: 'black',
                height: 2,
                width: '100%',
                marginVertical: 4,
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const renderTab = tab => {
    switch (tab) {
      case 'Security':
        return <ProfileSecurity />;
      case 'Verification':
        return <ProfileVerification />;
      case 'My assets':
        return <ProfileMyAssets />;
      case 'Wallet History':
        return <ProfileWalletHistory />;
      case 'Open orders':
        return <ProfileOpenOrder />;
      case 'Order History':
        return <ProfileOrderHistory />;
      case 'Ticket':
        return <ProfileTicket />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Toolbar navigation={navigation} />
      <LinearGradient
        style={{flex: 1}}
        colors={[AppColors().gradientColor1, AppColors().gradientColor3]}>
        <View>
          <FlatList
            data={DATA}
            renderItem={item => renderItem(item)}
            horizontal={true}
            keyExtractor={index => index.toString()}
            style={{marginVertical: textSize.componentsDifferenceLow}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>{renderTab(selectedIndex)}</View>
      </LinearGradient>
    </View>
  );
};

export default ProfileDetails;
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

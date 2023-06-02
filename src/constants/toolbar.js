import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../constants/appColors';
import {AppStyles} from '../style/AppStyles';

const Toolbar = ({navigation, title, showImage, isSearch}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.login.accessToken);
  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    <View style={styles.HeaderView}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (accessToken) {
              // navigation.openDrawer();
              navigation.navigate('EditPortfolio');
            } else {
              navigation.navigate('Login');
            }
          }}>
          <Icon
            name="person"
            size={24}
            color={AppColors(themeColorData).title}
          />
        </TouchableOpacity>

        {showImage != 'graph' ? (
          <Image
            style={AppStyles.appLogoToolbar}
            source={require('../assets/Logo.png')}
          />
        ) : null}
        {/* <Icon name="search" size={24} color={'#fff'} /> */}
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    backgroundColor: AppColors().gradientColor1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '8.6%',
    padding: 16,
    flexDirection: 'row',
  },
});

export default Toolbar;

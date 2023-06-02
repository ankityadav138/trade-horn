import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OurMission from './components/OurMission';
import OurValues from './components/OurValues';
import Toolbar from '../../constants/toolbar';
import {getDimen} from '../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';
import {mode} from 'native-base/lib/typescript/theme/tools';
import textSize from '../../constants/textSize';
import {useSelector} from 'react-redux';
import {AppColors} from '../../constants/appColors';

const AboutContainer = ({navigation}) => {
  const [isSelected, setSelection] = useState('AboutUs');
  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    // <ImageBackground
    //   source={require('../../assets/Backgrond.png')}
    //   style={{
    //     flex: 1,
    //     padding: 12,
    //   }}>
    <View style={styles(themeColorData).HeaderView}>
      <Toolbar navigation={navigation} />
      {/* Header view*/}
      {/* <View style={styles(themeColorData).headerWrapper}>
          <Icons name="person" size={30} color="#FFFFFF" />
          <Image
            style={{height: 30, width: 100, marginTop: 16}}
            source={require('../../assets/Logo.png')}
            resizeMode={'contain'}
          />
          <Icons name="search" size={30} color="#FFFFFF" />
        </View> */}
      {/* end */}
      <ScrollView
        style={styles(themeColorData).horizontalScrollView}
        horizontal>
        <TouchableOpacity onPress={() => setSelection('AboutUs')}>
          <View
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                width: moderateScale(63),
                marginHorizontal: textSize.componentsDifferenceHight,
                borderBottomColor:
                  isSelected == 'AboutUs'
                    ? AppColors(themeColorData).title
                    : 'transeperent',
                borderBottomWidth: isSelected == 'AboutUs' ? 3 : 0,
              },
            ]}>
            <Text style={styles(themeColorData).headerSectionTitle}>
              About Us
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelection('OurMission')}>
          <View
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                width: moderateScale(80),
                marginHorizontal: textSize.componentsDifferenceHight,

                borderBottomColor:
                  isSelected == 'OurMission'
                    ? AppColors(themeColorData).title
                    : 'transeperent',
                borderBottomWidth: isSelected == 'OurMission' ? 3 : 0,
              },
            ]}>
            <Text style={styles(themeColorData).headerSectionTitle}>
              Our Mission
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelection('OurValues')}>
          <View
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                width: moderateScale(75),
                marginHorizontal: textSize.componentsDifferenceHight,
                borderBottomColor:
                  isSelected == 'OurValues'
                    ? AppColors(themeColorData).title
                    : 'transeperent',
                borderBottomWidth: isSelected == 'OurValues' ? 3 : 0,
              },
            ]}>
            <Text style={styles(themeColorData).headerSectionTitle}>
              Our Values
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelection('ContactUs')}>
          <View
            style={[
              styles(themeColorData).horizontaScrollSectionWrapper,
              {
                width: moderateScale(80),

                marginHorizontal: textSize.componentsDifferenceHight,
                borderBottomColor:
                  isSelected == 'ContactUs'
                    ? AppColors(themeColorData).title
                    : 'transeperent',
                borderBottomWidth: isSelected == 'ContactUs' ? 3 : 0,
              },
            ]}>
            <Text style={styles(themeColorData).headerSectionTitle}>
              Contact Us
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={{height: '88%'}}>
        {isSelected == 'AboutUs' && <AboutUs />}
        {isSelected == 'OurMission' && <OurMission />}
        {isSelected == 'OurValues' && <OurValues />}
        {isSelected == 'ContactUs' && <ContactUs />}
      </View>
    </View>
  );
};

const styles = themeColorData =>
  StyleSheet.create({
    HeaderView: {
      flex: 1,
      backgroundColor: AppColors(themeColorData).background,
      // backgroundColor: 'red',
      // top: 10,
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
      color: AppColors(themeColorData).title,
      // fontSize: 18,
      width: getDimen(0.3),
      fontSize: textSize.h4,
      textAlign: 'center',
    },
    horizontalScrollView: {
      width: '100%',
    },
    horizontaScrollSectionWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
  });
export default AboutContainer;

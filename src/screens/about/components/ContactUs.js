import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import textSize from '../../../constants/textSize';
import {getDimen} from '../../../dimensions/dimen';
import {AppColors} from '../../../constants/appColors';
import {useSelector} from 'react-redux';

const ContactUs = ({navigation}) => {
  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    <ScrollView style={styles(themeColorData).container}>
      <View style={styles(themeColorData).titleView}>
        <Text style={styles(themeColorData).titleText}>CONTACT US</Text>
      </View>
      <View style={styles(themeColorData).wrapperView}>
        <View style={styles(themeColorData).iconWrapper}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../../assets/Business_Development.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles(themeColorData).textWrapper}>
          <Text style={styles(themeColorData).contactTitleText}>
            Business Development
          </Text>
          <Text style={styles(themeColorData).contactSubTitleText}>
            business@TradeHorn.com
          </Text>
        </View>
      </View>
      <View style={styles(themeColorData).wrapperView}>
        <View style={styles(themeColorData).iconWrapper}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../../assets/PR_Marketing.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles(themeColorData).textWrapper}>
          <Text style={styles(themeColorData).contactTitleText}>
            PR {'&'} Marketing
          </Text>
          <Text style={styles(themeColorData).contactSubTitleText}>
            business@TradeHorn.com
          </Text>
        </View>
      </View>
      <View style={styles(themeColorData).wrapperView}>
        <View style={styles(themeColorData).iconWrapper}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../../assets/Support.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles(themeColorData).textWrapper}>
          <Text style={styles(themeColorData).contactTitleText}>Support</Text>
          <Text style={styles(themeColorData).contactSubTitleText}>
            support@TradeHorn.com
          </Text>
        </View>
      </View>
      <View style={styles(themeColorData).wrapperView}>
        <View style={styles(themeColorData).iconWrapper}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../../assets/Security.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles(themeColorData).textWrapper}>
          <Text style={styles(themeColorData).contactTitleText}>Security</Text>
          <Text style={styles(themeColorData).contactSubTitleText}>
            security@TradeHorn.com
          </Text>
        </View>
      </View>
      <View style={styles(themeColorData).wrapperView}>
        <View style={styles(themeColorData).iconWrapper}>
          <Image
            style={{height: 50, width: 50}}
            source={require('../../../assets/Listing.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles(themeColorData).textWrapper}>
          <Text style={styles(themeColorData).contactTitleText}>Listing</Text>
          <Text style={styles(themeColorData).contactSubTitleText}>
            listing@TradeHorn.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = themeColorData =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColors(themeColorData).background,
      marginTop: 20,
    },
    titleView: {
      marginVertical: 10,
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    titleText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      fontWeight: 'bold',
      width: moderateScale(100),
    },
    wrapperView: {
      flexDirection: 'row',
      //  width: '100%',
      margin: 15,
      alignItems: 'center',
    },
    iconWrapper: {
      width: '20%',
      left: moderateScale(60),
    },
    textWrapper: {
      width: '80%',
      alignItems: 'center',
    },
    contactTitleText: {
      fontSize: textSize.h5,
      color: AppColors(themeColorData).title,

      fontWeight: '700',
      textAlign: 'center',
      width: getDimen(5),
    },
    contactSubTitleText: {
      color: AppColors(themeColorData).title,

      fontSize: textSize.h6,
      textAlign: 'center',
    },
  });
export default ContactUs;

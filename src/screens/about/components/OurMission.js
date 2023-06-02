import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import textSize from '../../../constants/textSize';
import {getDimen} from '../../../dimensions/dimen';
import {AppColors} from '../../../constants/appColors';
import {useSelector} from 'react-redux';

const OurMission = ({navigation}) => {
  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    <ScrollView style={styles(themeColorData).container}>
      <View style={styles(themeColorData).titleView}>
        <Text style={styles(themeColorData).titleText}>OUR MISSION</Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Text style={styles(themeColorData).para01Text}>
          At Trade Horn, we believe blockchain technology will be essential for
          providing secure banking and payment services in the future. We
          believe digital currency will greatly improve the convenience of daily
          transactions and help to create a world that is financially
          borderless. We believe that crypto investors deserve the same
          protections as investors in other asset classes, so we’ve built a
          rules-based marketplace with security at its core.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Text style={styles(themeColorData).para01Text}>
          Our aim is to provide trustworthy trading services for all, while
          continuously working to improve our technology. Our mission is to
          connect everyone to the new digital asset economy.
        </Text>
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
      // borderBottomColor: '#2480EF',
      //borderBottomWidth: 5,
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    titleText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      fontWeight: 'bold',
      width: getDimen(0.4),
      textDecorationLine: 'underline',
      textDecorationColor: 'white',
      textAlign: 'center',
    },
    paragraphView: {
      marginVertical: 5,
      marginHorizontal: 20,
      alignItems: 'center',
    },
    para01Text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'center',
      height: getDimen(0.36),
    },
  });
export default OurMission;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {getDimen} from '../../../dimensions/dimen';
import textSize from '../../../constants/textSize';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {AppColors} from '../../../constants/appColors';

const OurValues = ({navigation}) => {
  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    <ScrollView style={styles(themeColorData).container}>
      <View style={styles(themeColorData).titleView}>
        <Text style={styles(themeColorData).titleText}>OUR VALUES</Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Image
          style={styles(themeColorData).imageStyle}
          source={require('../../../assets/Think_Clearly.png')}
          resizeMode={'contain'}
        />
        <Text style={styles(themeColorData).valuesTitleText}>
          Think Clearly
        </Text>
        <Text style={styles(themeColorData).para01Text}>
          Clarity of thought is the single most important trait we look for in
          our colleagues.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Image
          style={styles(themeColorData).imageStyle}
          source={require('../../../assets/Be_Resourceful.png')}
          resizeMode={'contain'}
        />
        <Text style={styles(themeColorData).valuesTitleText}>
          Be Resourceful
        </Text>
        <Text style={styles(themeColorData).para01Text}>
          We believe that great ideas can come from anywhere, regardless of
          seniority and experience.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Image
          style={styles(themeColorData).imageStyle}
          source={require('../../../assets/Stay_Determined.png')}
          resizeMode={'contain'}
        />
        <Text style={styles(themeColorData).valuesTitleText}>
          Stay Determined
        </Text>
        <Text style={styles(themeColorData).para01Text}>
          We celebrate milestones together, we recharge and we get back to it.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Image
          style={styles(themeColorData).imageStyle}
          source={require('../../../assets/Dream_big.png')}
          resizeMode={'contain'}
        />
        <Text style={styles(themeColorData).valuesTitleText}>
          Dream Big {'&'} Be Decisive
        </Text>
        <Text style={styles(themeColorData).para01Text}>
          We aim to surprise and inspire with quality and speed of decision
          making.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Image
          style={styles(themeColorData).imageStyle}
          source={require('../../../assets/Act_As_Owners.png')}
          resizeMode={'contain'}
        />
        <Text style={styles(themeColorData).valuesTitleText}>
          Act As Owners
        </Text>
        <Text style={styles(themeColorData).para01Text}>
          We're trusted to do the right thing.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Image
          style={styles(themeColorData).imageStyle}
          source={require('../../../assets/Remain_Humble.png')}
          resizeMode={'contain'}
        />
        <Text style={styles(themeColorData).valuesTitleText}>
          Remain Humble
        </Text>
        <Text style={styles(themeColorData).para01Text}>
          We understand that we're always stronger as a team - you leave your
          ego at the door.
        </Text>
      </View>
      <View style={{marginVertical: textSize.componentsDifferenceLow}} />
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
      width: moderateScale(86),
      alignItems: 'center',
    },
    titleText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      fontWeight: 'bold',
      width: moderateScale(110),
      textAlign: 'center',
    },
    paragraphView: {
      margin: 10,
      marginBottom: 0,
      marginTop: 15,
      alignItems: 'center',
    },
    valuesTitleText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h5,
      fontWeight: 'bold',
      textAlign: 'center',
      //  marginBottom: 5
    },
    para01Text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'center',
      height: getDimen(0.2),
    },
    imageStyle: {
      height: 50,
      width: 50,
      marginBottom: 10,
    },
  });
export default OurValues;

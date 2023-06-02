import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {getDimen} from '../../../dimensions/dimen';
import textSize from '../../../constants/textSize';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../../../constants/appColors';

const AboutUs = ({navigation}) => {
  const themeColorData = useSelector(state => state.login.themeValue);

  return (
    <ScrollView style={styles(themeColorData).container}>
      <View style={styles(themeColorData).titleView}>
        <Text style={styles(themeColorData).titleText}>ABOUT US</Text>
      </View>
      <View
        style={[
          styles(themeColorData).paragraphView,
          {height: getDimen(0.18)},
        ]}>
        <Text style={styles(themeColorData).para01Text}>
          We build crypto products that are simple, elegant and secure. Whether
          you are an individual or an institution. we want to help you buy, sell
          and store Bitcoin and Cryptocurrency.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Text style={styles(themeColorData).para02TitleText}>
          THE FOUR PILLARS OF
        </Text>
        <Text
          style={[
            styles(themeColorData).para02TitleText1,
            {
              textDecorationLine: 'underline',
              textDecorationColor: AppColors(themeColorData).title,
              // width: moderateScale(110),
              alignSelf: 'center',
              alignItems: 'center',
              //   borderBottomColor: AppColors(themeColorData).title,
              //   borderBottomWidth: 1,
            },
          ]}>
          TRADE HORN
        </Text>
      </View>

      <View style={styles(themeColorData).pillarsWrapperView}>
        <View style={styles(themeColorData).pillarSubView}>
          <Image
            style={{height: 40, width: 40}}
            source={require('../../../assets/Product.png')}
            resizeMode={'contain'}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              width: getDimen(0.2),
              fontSize: textSize.h6,
            }}>
            Product
          </Text>
        </View>
        <View
          style={[styles(themeColorData).pillarSubView, {marginLeft: '22%'}]}>
          <Image
            style={{height: 40, width: 40}}
            source={require('../../../assets/SecurityPillar.png')}
            resizeMode={'contain'}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              width: getDimen(0.2),
              fontSize: textSize.h6,
            }}>
            Security
          </Text>
        </View>
      </View>
      <View style={styles(themeColorData).pillarsWrapperView}>
        <View style={styles(themeColorData).pillarSubView}>
          <Image
            style={{height: 40, width: 40}}
            source={require('../../../assets/Licensing.png')}
            resizeMode={'contain'}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              width: getDimen(0.2),
              fontSize: textSize.h6,
            }}>
            Licensing
          </Text>
        </View>
        <View
          style={[styles(themeColorData).pillarSubView, {marginLeft: '20%'}]}>
          <Image
            style={{height: 40, width: 40}}
            source={require('../../../assets/Compliance.png')}
            resizeMode={'contain'}
          />
          <Text
            style={{
              color: AppColors(themeColorData).title,
              width: getDimen(0.2),
              fontSize: textSize.h6,
            }}>
            Complliance
          </Text>
        </View>
      </View>
      <View
        style={[styles(themeColorData).paragraphView, {height: getDimen(0.2)}]}>
        <Text style={styles(themeColorData).para01Text}>
          We are committed to earning and maintaining your trust. We believe
          that in order to do so, we must invest in our four pillars for the
          long-term. Product, Security, Licensing, and Compliance are the inputs
          that generate a trust output.
        </Text>
      </View>
      <View
        style={[styles(themeColorData).paragraphView, {height: getDimen(0.2)}]}>
        <Text style={styles(themeColorData).para02TitleText}>
          CRYPTO IS NOT JUST A{' '}
        </Text>
        <Text style={styles(themeColorData).para02TitleText}>
          TECHNOLOGY, IT'S A MOVEMENT.
        </Text>
        <Text
          style={[
            styles(themeColorData).para02TitleText,
            ,
            {
              textDecorationLine: 'underline',
              textDecorationColor: AppColors(themeColorData).title,
            },
          ]}>
          MOVEMENT.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Text style={styles(themeColorData).para01Text2}>
          Crypto has the capacity to force a redesign of the Internet, our
          financial system, and money in a way that fosters and protects the
          rights and dignity of the individual. If we are successful, we could
          make as great of a contribution to personal freedom as the invention
          of the printing press, the personal computer, and the early, open
          Internet.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Text style={styles(themeColorData).para01Text}>
          Crypto is not just a technology, it is a movement. But it won’t happen
          unless we build simple, elegant, and secure ways for individuals and
          institutions around the world to discover and interact with this new
          frontier.
        </Text>
      </View>
      <View style={styles(themeColorData).paragraphView}>
        <Text style={styles(themeColorData).para01Text}>
          We founded crypto with a “security-first” mentality and ethos of
          asking for permission, not forgiveness. We have worked hard to provide
          you with a high-integrity choice and we look forward to earning and
          maintaining your trust.
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
      borderBottomColor: AppColors(themeColorData).title,
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      // width: moderateScale(150),
      width: getDimen(0.19),
      alignSelf: 'center',
      alignItems: 'center',
    },

    titleText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      fontWeight: 'bold',
      width: getDimen(0.3),
      textAlign: 'center',
      top: 2,
    },
    paragraphView: {
      marginVertical: 5,
      marginHorizontal: 10,
    },
    para01Text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'center',
      height: getDimen(0.25),
      marginHorizontal: 10,
    },
    para01Text2: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'center',
      height: getDimen(0.3),
      marginHorizontal: 10,
    },
    para02TitleText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      fontWeight: 'bold',
      textAlign: 'center',
      // borderBottomColor: AppColors(themeColorData).title,
      // borderBottomWidth: 1,
      marginHorizontal: 10,
    },
    para02TitleText1: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h4,
      fontWeight: 'bold',
      textAlign: 'center',
      // borderBottomColor: AppColors(themeColorData).title,
      // borderBottomWidth: 1,
      // marginHorizontal: 10
    },

    pillarsWrapperView: {
      flexDirection: 'row',
      marginVertical: 20,
      // justifyContent: 'space-around'
    },
    pillarSubView: {
      borderLeftColor: AppColors(themeColorData).title,
      borderLeftWidth: 1,
      paddingLeft: 20,
      marginLeft: '10%',
    },
  });
export default AboutUs;

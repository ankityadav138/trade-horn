import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icononic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InputArea} from '../components/inputArea';
import AppButton from '../constants/AppButton';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {CheckBox} from 'react-native-elements';
import {PointsLayout} from '../components/pointsLayout';
import {useTheme} from '@react-navigation/native';
import Exchange from './Exchange';
import {getDimen} from '../dimensions/dimen';

const FirstStepHome = ({navigation}) => {
  const {colors} = useTheme();
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Backgrond.png')}
        style={styles(colors).imageBackgroundStyle}>
        <View
          style={{
            flexDirection: 'column',
           // alignItems: 'center',
           // padding: textSize.componentsDifferenceMediam,
               paddingTop:'10%'
          }}>
          <Text style={styles(colors).headingStyle2}>World's Home for</Text>
          <Text style={styles(colors).headingStyle1}>ONE-STOP DIGITAL</Text>
          <Text style={styles(colors).headingStyle1}>ASSET TRADING</Text>
        </View>
        <View style={{padding: textSize.componentsDifferenceHight,paddingTop:0}}>
          <LinearGradient
            style={{
              width: '100%',
              borderRadius: 25,
            }}
            colors={[
              colors.transparentGradientColor1,
              colors.transparentGradientColor2,
            ]}>
            <View style={styles(colors).cardStyle}>
              <Text
                style={[
                  styles(colors).headStyle,
                  {textDecorationLine: 'underline',textDecorationColor:'#FFFFFFDE'},
                ]}>
                Why Choose Trade Horn?
              </Text>

              <View style={styles(colors).componetsMargin} />

              <PointsLayout
                title={'SECURE'}
                imageUrl={require('../assets/secure_shield.png')}
                details={
                  'State-of-the-art safe storage technology for maximum security of your crypto and fiat assets.'
                }
              />

              <View
                style={{marginVertical: textSize.componentsDifference}}
              />

              <PointsLayout
                title={'FAST'}
                imageUrl={require('../assets/fast_delivery.png')}
                details={
                  'Trade Horn offers unwavering performance with a trusted world-class matching engine, supporting up to 1,500,000 orders per second.'
                }
              />

              <View
                style={{marginVertical: textSize.componentsDifference}}
              />

              <PointsLayout
                title={'SIMPLE'}
                imageUrl={require('../assets/easy.png')}
                details={
                  'Get started in minutes once you set up an account with Trade Horn to buy and sell cryptocurrencies.'
                }
              />

              <View
                style={{marginVertical: textSize.componentsDifference}}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFFFFFDE',
                  width: '100%',
                  //paddingHorizontal: textSize.componentsDifferenceMediam,
                  //paddingVertical: textSize.componentsDifferenceLow,
                  paddingLeft:'5%',
                  paddingTop:'1%',
                  borderRadius: 35,
                  alignSelf:'center',
                 // marginBottom: -24,
                    
                }}
                onPress={() => navigation.navigate('SecurityPriority')}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{padding:5,alignSelf:'center'}}>
                    <Text
                      style={{
                        color: colors.title,
                        fontSize: textSize.h4,
                        fontWeight: 'bold',
                      }}>
                      GET STARTED IN
                    </Text>
                    <Text
                      style={{
                        color: colors.title,
                        fontSize: textSize.h4,
                        fontWeight: 'bold',
                      }}>
                      A FEW MINUTES
                    </Text>
                  </View>
                  <Icononic name="chevron-forward" size={40} color={colors.title} style={{marginRight:'3%',alignSelf:'center'}} />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#052546',
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
            justifyContent: 'space-evenly',
            padding:10,
          }}>
          <TouchableOpacity onPress={()=>navigation.navigate('TabNavigator')}>
          <Text style={styles(colors).headingStyle}>Markets</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Icononic name="person" size={40} color={colors.headerColor} style={{alignSelf:'flex-start'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('TabNavigator')}>
          <Text style={styles(colors).headingStyle}>Exchange</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    imageBackgroundStyle: {
      flex: 1,
      justifyContent: 'space-between',
    },
    iconImageStyle: {
      height: 60,
      width: 160,
      marginTop: textSize.componentsDifferenceMediam,
    },
    componetsMargin: {marginVertical: textSize.componentsDifferenceHight},
    cardStyle: {
      flexDirection: 'column',
      paddingHorizontal: textSize.componentsDifferenceHight,
      paddingTop: textSize.componentsDifferenceHight,
     // alignItems: 'center',
    // alignItems:'flex-start',
     marginBottom:'6%'
    },
    headingStyle: {
      color: props.headerColor,
      fontSize: textSize.h3,
      textAlign: 'center',
      fontWeight: 'bold',
      width:getDimen(0.30)
    },
    headStyle: {
      color: props.headerColor,
      fontSize: textSize.h3,
     // textAlign: 'center',
    //  borderBottomColor:'#FFFFFFDE',
    //  borderBottomWidth:1
      //fontWeight: 'bold',
    },
    headingStyle2: {
      color: '#FFFFFFDE',
      fontSize: textSize.h4,
      textAlign: 'center',
      //fontWeight: 'bold',
    },
    headingStyle1: {
      color: props.headerColor,
      fontSize: textSize.h3,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    borderButtonStyle: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderColor: props.headerColor,
      borderWidth: 2,
    },
    borderButtonTextStyle: {
      color: props.headerColor,
      fontWeight: 'bold',
      fontSize: textSize.h5,
    },
    webCardStyle: {
      marginVertical: 4,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderColor: props.headerColor,
      borderWidth: 1,
    },
    weblinkStyle: {
      color: props.headerColor,
      fontSize: textSize.p,
      textDecorationLine: 'underline',
    },
  });
export default FirstStepHome;

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
import {InputArea} from '../components/inputArea';
import AppButton from '../constants/AppButton';
import {AppColors} from '../constants/appColors';
import textSize from '../constants/textSize';
import showMessage from '../components/showMessage';
import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {AppStyles} from '../style/AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDimen} from '../dimensions/dimen';
import Icononic from 'react-native-vector-icons/Ionicons';


const SecurityPriority = ({navigation}) => {
  const {colors} = useTheme();
  const [isSelected, setSelection] = useState(false);

  const PointsLayout1 = ({imageUrl, details}) => {
    return (
      <View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View
            style={{
              height: 80,
              width: '20%',
              alignItems: 'center',
              borderRadius: 16,
              alignSelf:'center'
            }}>
            <Image style={{height: 55, width: 55}} source={imageUrl} />
          </View>
          <View
            style={{
              width: '70%',
              marginStart: 8,
              alignItems: 'center',
            }}>
            <Text style={styles(colors).borderButtonTextStyle}>{details}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Backgrond.png')}
        style={styles(colors).imageBackgroundStyle}>
        <View
          style={{
            flexDirection: 'column',
           // alignItems: 'center',
            padding: textSize.componentsDifferenceMediam,
            marginTop:'5%',
            margin:20,
            marginBottom:0,
          
          }}>
           <Text
                style={[
                  styles(colors).headingStyle2,
                  {textDecorationLine: 'underline'},
                ]}>
            Security is Our Priority
          </Text>
          <Text
            style={{color: '#FFFFFF', fontSize: textSize.h4,padding:10,justifyContent:'center',textAlign:'center', height: getDimen(0.30),}}>
            Trade Horn has operated with a security-first mentality from day
            one.Our security philosophy adheres to three principles.
          </Text>
        </View>
        <View style={{padding: textSize.componentsDifferenceMediam,marginTop:0,paddingTop:0}}>
        
            <View style={styles(colors).cardStyle}>
              <View style={styles(colors).componetsMargin} />

              <PointsLayout1
                imageUrl={require('../assets/threat.png')}
                details={'DEFENDING AGAINST EXTERNAL THREATS '}
              />

              <View
                style={{marginVertical: textSize.componentsDifferenceLow}}
              />

              <PointsLayout1
                imageUrl={require('../assets/Protecting.png')}
                details={'PROTECTING AGAINST HUMAN ERROR'}
              />

              <View
                style={{marginVertical: textSize.componentsDifferenceLow}}
              />

              <PointsLayout1
                imageUrl={require('../assets/web.png')}
                details={'GAURDING AGANIST MISUSE OF INSIDER ACCESS'}
              />

              <View style={styles(colors).componentsDifferenceLow} />
            </View>
        </View>

        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Image
          style={styles(colors).logo}
          source={require('../assets/Trade.png')}
        />
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
          <Icononic name="person" size={40} color={colors.headerColor} />
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
    componetsMargin: {marginVertical: textSize.componentsDifferenceMediam},
    cardStyle: {
      flexDirection: 'column',
      paddingHorizontal: textSize.componentsDifferenceHight,
     // paddingTop: textSize.componentsDifferenceHight,
      alignItems: 'center',
    },
    headingStyle: {
      color: 'white',
      fontSize: textSize.h4,
      textAlign: 'center',
      fontWeight: 'bold',
      width:getDimen(0.30)
    },
    headingStyle2: {
      color: 'white',
      fontSize: textSize.h3,
      textAlign: 'center',
     // borderBottomColor:'#FFFFFF',
      //borderBottomWidth:1
      //fontWeight: 'bold',
    },
    headingStyle1: {
      color: props.headerColor,
      fontSize: textSize.h1,
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
      fontSize: textSize.h3,
      height: getDimen(0.26)
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
    logo:{
     // height: 60, 
     // width: 160,
    // marginTop: 16
    width:195,
    height:30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',


    }
  });
export default SecurityPriority;

import React, {useState} from 'react';
import {TextInput, View, Image, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../constants/appColors';
// placeholder, icon, setValue,value
import textSize from '../constants/textSize';

export const AppInput = ({
  icon,
  placeholder,
  setValue,
  value,
  isPassword,
  keyboardType,
  maxLength,
}) => {
  const [hidePass, setHidePass] = useState(true);
  return (
    <View>
      <View
        style={{
          width: '110%',
          height: 55,
          paddingLeft: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // borderBottomWidth: 1,
          borderWidth:1,
          borderColor:'#E8E8E8',
          // borderBottomColor: AppColors().iconColor,
          top:'4%',
          backgroundColor:'#E8E8E8',
          borderRadius:10,
          marginBottom:'2%'
          
        }}>
        <Icon
          name={icon}
          size={20}
          style={{marginRight: 7, top:'0%',padding:5 ,color:'#3C3C4399'}}
          color={AppColors().iconColor}
        />
        {isPassword === true ? (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={hidePass ? true : false}
            placeholderTextColor="#3C3C43"
            onChangeText={text => setValue(text)}
            value={value}
            underlineColorAndroid="transparent"
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPassword}
            placeholderTextColor="#3C3C43"
            onChangeText={text => setValue(text)}
            value={value}
            keyboardType={keyboardType}
            maxLength={maxLength}
            underlineColorAndroid="transparent"
          />
        )}

        {isPassword === true ? (
          <Icon
            name={hidePass ? 'eye-off' : 'eye'}
            size={20}
            style={{marginRight: 10, top: '0%', color:'#3C3C43'}}
            color="#ffff"
            onPress={() => setHidePass(!hidePass)}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 20,
    color: '#000000',
    //backgroundColor: 'red',
    top: moderateScale(2),
    right: moderateScale(23),
    fontSize: textSize.h5,
    
  },
});

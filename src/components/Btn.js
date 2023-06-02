import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Btn = props => {
  return (
    <View>
      <TouchableOpacity
        style={{
          paddingHorizontal: 40,
          paddingVertical: 5,
          backgroundColor: props.buttonColor,
          borderRadius: 30,
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Btn;
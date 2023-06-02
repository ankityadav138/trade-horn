import {useTheme} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import textSize from '../../../constants/textSize';
import {TICKETS} from '../../../store/action';
import Toolbar from '../../../constants/toolbar';
import Icons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {getDimen} from '../../../dimensions/dimen';
import {moderateScale} from 'react-native-size-matters';

const ProfileTicket = ({data, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {label: 'Fiat', value: 'All'},
    {label: 'Fiat', value: 'All'},
  ]);
  const accessToken = useSelector(state => state.login.accessToken);
  //console.log('checkingaccesstoken', accessToken)
  const ticketsData = useSelector(state => state.user.tickets);
  console.log('ticketsData', ticketsData);

  useEffect(() => {
    dispatch({
      type: TICKETS,
      payload: {token: accessToken},
    });
  }, []);

  const DATA = [
    {
      date: '08-02-2022 \n@ 12:35 PM',
      type: 'BTC/USDT',
      ip: 'Buy/Limit',
    },
    {
      date: '08-02-2022 \n@ 12:35 PM',
      type: 'BTC/USDT',
      ip: 'Buy/Limit',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: textSize.componentsDifferenceLow,
        }}>
        <Text style={{color: 'white', fontSize: textSize.h5}}>
          {item.date.slice(1, 10)}
        </Text>
        <Text style={{color: 'white', fontSize: textSize.h5}}>
          {item.ticket_id}
        </Text>
        <Text style={{color: 'white', fontSize: textSize.h5}}>
          {item.issue_type}
        </Text>
        <Text style={{color: 'white', fontSize: textSize.h5}}>
          {item.description}
        </Text>
        <Text style={{color: 'white', fontSize: textSize.h5}}>
          {item.status}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.HeaderView}>
      <Toolbar navigation={navigation} />
      <View style={{flexDirection: 'row', marginTop: '5%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons
            style={{
              color: colors.heading,
              textAlign: 'left',
              marginLeft: 22,
            }}
            name="arrow-back"
            size={20}
            color={'white'}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colors.heading,
            fontSize: textSize.h3,
            marginLeft: 5,
            width: getDimen(1),
          }}>
          Ticket
        </Text>
      </View>

      <LinearGradient
        style={{
          width: '90%',
          borderRadius: moderateScale(10),
          marginHorizontal: '5%',
          marginTop: '5%',
          flex: 0.95,
        }}
        colors={[
          colors.transparentGradientColor1,
          colors.transparentGradientColor2,
        ]}>
        <View style={{}}>
          <View
            style={{
              margin: textSize.componentsDifferenceLow,
            }}>
            <Text
              style={{
                color: colors.heading,
                fontSize: textSize.h3,
                marginLeft: moderateScale(10),
                paddingVertical: moderateScale(10),
              }}>
              Support Ticket
            </Text>
          </View>

          <View
            style={{
              marginVertical: textSize.componentsDifferenceLow,
            }}
          />
          <View>
            <ScrollView horizontal>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  backgroundColor: '#091326',
                  paddingVertical: moderateScale(10),
                  // padding: textSize.componentsDifferenceLow,
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize.h5,
                    marginHorizontal: moderateScale(10),
                    width: getDimen(0.3),
                    textAlign: 'center',
                  }}>
                  Date
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize.h5,
                    marginHorizontal: moderateScale(10),
                    width: getDimen(0.3),
                  }}>
                  Ticket Number
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize.h5,
                    marginHorizontal: moderateScale(10),
                    width: getDimen(0.3),
                  }}>
                  Issue Category
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize.h5,
                    marginHorizontal: moderateScale(10),
                    width: getDimen(0.3),
                    textAlign: 'center',
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize.h5,
                    marginHorizontal: moderateScale(3),
                    textAlign: 'center',
                    width: getDimen(0.3),
                  }}>
                  Status
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: textSize.h5,
                    width: getDimen(0.3),
                    textAlign: 'center',
                  }}>
                  Action
                </Text>
              </View>
            </ScrollView>
          </View>

          <FlatList
            data={ticketsData.data}
            renderItem={item => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderView: {
    flex: 1,
    backgroundColor: '#0466C0',
  },
});

export default ProfileTicket;

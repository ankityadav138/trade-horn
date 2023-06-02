import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {getDimen} from '../../dimensions/dimen';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {List} from 'react-native-paper';
import textSize from '../../constants/textSize';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Fontisto';
import AppButton from '../../constants/AppButton';
import {LOGOUT} from '../../store/action';

const DrawerMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [confirm, setConfirm] = useState(false);

  const handleLogOut = () => {
    //setConfirm(true);
    Alert.alert(
      'Alert!',
      'Are you sure want to logout',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch({
              type: LOGOUT,
            });
            navigation.push('TabNavigator');
          },
        },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.transparentGradientColor1}}>
      <ScrollView>
        <View
          style={{
            height: getDimen(0.3),
            //flexDirection: 'row',
            backgroundColor: colors.transparentGradientColor1,
            //paddingLeft: '12%',
            //alignItems: 'center',
            paddingTop: 20,
            alignItems: 'flex-start',
            paddingLeft: '12%',
          }}>
          <TouchableOpacity>
            {/* </View> onPress={() => navigation.navigate('ProfileDetails')}> */}
            <Icon
              name="person"
              size={50}
              color={colors.title}
              style={{borderRadius: 37, padding: 11, backgroundColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 16,
            //paddingVertical: 16,
          }}>
          <List.AccordionGroup>
            <List.Item
              title="Home"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('HomeTabs')}
            />
            <List.Item
              title="Security"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileSecurity')}
            />
            <List.Item
              title="Verification"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileVerification')}
            />
            <List.Item
              title="My assets"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileMyAssets')}
            />
            <List.Item
              title="Wallet History"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileWalletHistory')}
            />
            <List.Item
              title="Open orders"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileOpenOrder')}
            />
            <List.Item
              title="Order History"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileOrderHistory')}
            />
            <List.Item
              title="Ticket"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('ProfileTicket')}
            />
            <List.Item title="Company" titleStyle={styles(colors).menuTitle} />
            <List.Item
              title="About Us"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('AboutContainer')}
            />
            {/* <List.Item
              title="Fees"
              titleStyle={styles(colors).menuText}
              // onPress={() => navigation.navigate('ProfileDetails')}
              onPress={() => navigation.navigate('FeeSchedule')}
            /> */}
            <List.Item
              title="Terms & Conditions"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('TermsCondition')}
            />
            <List.Item
              title="Privacy Policy"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />
            {/* <List.Item
              title="Submit a Ticket"
              titleStyle={styles(colors).menuText}
              onPress={() => navigation.navigate('HomeTab1')}
            /> */}

            <List.Item
              title="LOGOUT"
              titleStyle={styles(colors).menuLogout}
              onPress={() => handleLogOut(navigation)}
            />
          </List.AccordionGroup>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirm}
          onRequestClose={() => {
            setConfirm(!confirm);
          }}>
          <View style={styles(colors).modalconatiner}>
            <View style={styles(colors).confirmmodal}>
              <Text style={styles(colors).confirmtext}> Are you sure ?</Text>
              <Text style={styles(colors).subtext}>You want to logout</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <AppButton
                  text="Yes"
                  style={{width: '40%'}}
                  onPress={() => logoutYes()}
                />
                <AppButton
                  text="Cancel"
                  style={{width: '40%'}}
                  onPress={() => setConfirm(!confirm)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default DrawerMenu;

const styles = props =>
  StyleSheet.create({
    menuText: {
      fontSize: 14,
      color: props.heading,
      paddingLeft: '3%',
    },
    menuTitle: {
      fontSize: 20,
      color: props.heading,
      paddingLeft: '5%',
    },
    menuLogout: {
      fontSize: 14,
      color: 'red',
      paddingLeft: '3%',
    },
    itemText: {
      fontSize: 12,
      color: props.heading,
    },
    rightIcon: {
      height: getDimen(0.036),
      width: getDimen(0.036),
      marginLeft: 0,
    },
    leftIcon: {
      height: 20,
      width: 20,
      marginLeft: 0,
    },
    subMenuStyle: {
      marginLeft: '10%',
      width: 20,
      height: 16,
      marginTop: '4%',
    },
    modalconatiner: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    confirmmodal: {
      //height: 250,
      backgroundColor: '#fff',
      width: 300,
      alignSelf: 'center',
      borderRadius: 20,
      padding: 30,
      top: '30%',
    },
    confirmtext: {
      fontWeight: '500',
      fontSize: textSize.h3,
      color: 'black',
      marginVertical: 10,
    },
    subtext: {
      color: 'black',
      fontSize: textSize.h1,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

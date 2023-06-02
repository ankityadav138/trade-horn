import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../constants/appColors';
import Toolbar from '../constants/toolbar';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import textSize from '../constants/textSize';
import {getDimen} from '../dimensions/dimen';
import {withDecay} from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {theme} from 'native-base';

export default function PrivacyPolicy({navigation}) {
  const {colors} = useTheme();
  const themeColorData = useSelector(state => state.login.themeValue);

  //  const navigation = useNavigation()
  return (
    <View style={{flex: 1}}>
      <Toolbar navigation={navigation} isback={true} />
      <LinearGradient
        style={{flex: 1}}
        colors={[
          AppColors(themeColorData).background,
          AppColors(themeColorData).background,
        ]}>
        <View style={styles(themeColorData).header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons
              name="arrow-back"
              size={25}
              color={AppColors(themeColorData).title}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles(themeColorData).headerText,
              {top: moderateScale(3)},
            ]}>
            Privacy Policy{' '}
          </Text>
        </View>

        <ScrollView style={styles(themeColorData).contents}>
          <Text
            style={[
              styles(themeColorData).contentText,
              {height: getDimen(0.7)},
            ]}>
            Trade Horn Pvt Ltd is a company incorporated in India, and operates
            the website www.Trade Horn.com and related mobile applications, an
            overall platform (hereinafter referred to as the 'Platform')
            dedicated to digital assets-only transaction and the provision of
            related services. {'\n'}Trade Horn will protect all personal
            information you submit to us when using our products and services.
            We may use or disclose your personal information in compliance with
            this Privacy Policy to provide better services to you. By using our
            products and services, you consent to the practices contained in
            this Privacy Policy. We may amend this Privacy Policy from time to
            time. We strongly encourage you to review the Privacy Policy
            whenever you access or use Trade Horn services to stay informed
            about our information practices and your privacy rights and choices.
            If you ever have any questions about changes made to the Privacy
            Policy, just reach out to support@Trade Horn.com.
          </Text>

          <View style={{marginTop: getDimen(0.01)}}>
            <Text
              style={[
                styles(themeColorData).headerText,
                {width: getDimen(1), paddingBottom: '5%'},
              ]}>
              1. Scope of Application
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.08)}]}>
              A) Your personal information when you open an account on our
              Platform;
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.18)}]}>
              B) Your browsing history or information about your device,
              including and not limited to the type of device (Computer vs.
              iPhone vs. Android), operating system, mobile phone number,
              browser type and language, and device identifiers (such as IMEI
              and MAC address);
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.16)}]}>
              C) Your personal information we get from business partners. You
              understand and agree that the following information is not
              applicable with this Privacy Policy:
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.07)}]}>
              A) Your search keywords when using our Platform;Policy：
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.12)}]}>
              B) Public information you create on our Platform, including but
              not limited to forum posts;
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.14)}]}>
              C) Your violation of laws, regulations or our Platform rules and
              publishing measures you are subject to.
            </Text>

            <Text
              style={[
                styles(themeColorData).headerText,
                {width: getDimen(1), marginTop: '5%'},
              ]}>
              2. Use of Information
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.2)}]}>
              A) We may use your personal information to provide you with
              information about products and promotions that may be of interest
              to you, from ourselves and third parties, although only if you
              have specifically agreed to receive such information;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.2)}]}>
              B) We will gather and take good care of your personal information.
              If we need to share with third-party business partners to provide
              better service experience for you, we will require partners to
              protect your information as stated in this Privacy
              Policy.descsdcsdcsdcvfvfvfdvjdfvcsdjsdudhwedudfheuwfhfuwef
            </Text>

            <Text
              style={[
                styles(themeColorData).headerText,
                {width: getDimen(1), marginTop: '5%'},
              ]}>
              3. Disclosure of Information
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.1)}]}>
              A) to non-affiliated third parties at your consent;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.13)}]}>
              B) to third party service/product providers so that you can use
              their service/product;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.13)}]}>
              C) when disclosure is necessary to report suspected illegal
              activity;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.18)}]}>
              D) when disclosure is necessary to investigate violations of laws,
              regulations or this Privacy Policy;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.18)}]}>
              E) when compelled by subpoena, court order, or other legal
              procedure;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.3)}]}>
              F) to other sites when deemed necessary by law, regulations or
              Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = themeColorData =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      padding: getDimen(0.03),
    },
    headerText: {
      fontSize: textSize.h4,
      color: AppColors(themeColorData).title,
      marginHorizontal: getDimen(0.03),
      width: getDimen(0.4),
    },
    contents: {
      padding: 15,
    },
    contentText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'left',
      marginTop: getDimen(0.01),
    },
    text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'left',
      marginTop: getDimen(0.04),
      //height: getDimen(0.1),
    },
  });

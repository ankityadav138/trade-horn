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
//import style from 'react-native-datepicker/style';
import Icons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

export default function TermsCondition() {
  const themeColorData = useSelector(state => state.login.themeValue);

  const navigation = useNavigation();
  // console.log(navigation);
  return (
    <View style={{flex: 1}}>
      <Toolbar navigation={navigation} />
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
          <Text style={styles(themeColorData).headerText}>
            Terms & Condition{' '}
          </Text>
        </View>

        <ScrollView style={styles(themeColorData).contents}>
          <Text
            style={[
              styles(themeColorData).contentText,
              {height: getDimen(0.4)},
            ]}>
            Trade Horn PVT LTD (hereinafter referred to as the “Company”) is a
            company incorporated in India and operates the website www.Trade
            Horn.com (hereinafter referred to as “Site”) and related mobile
            applications (hereinafter referred to as the “Platforms”) to provide
            you digital assets-only transaction and related services. By
            accepting these Terms of Use, you agree with and accept these Terms
            and all policies published on this website. IF YOU DO NOT ACCEPT
            THESE TERMS OF USE, DO NOT ACCESS THIS SITE AND DO NOT USE ANY OF
            Trade Horn’S SERVICES, PRODUCTS AND CONTENT.
          </Text>

          <View style={{marginTop: getDimen(0.025)}}>
            <Text
              style={[styles(themeColorData).headerText, {width: getDimen(1)}]}>
              1. Acceptance of Terms
            </Text>
            <Text
              style={[
                styles(themeColorData).contentText,
                {height: getDimen(0.26)},
              ]}>
              1.1 You are at least 18 years of age and have the full capacity to
              accept these Terms and enter into a transaction involving digital
              assets. You are not deprived the right to use our service and has
              the full capacity for legal action. If you do not meet the above
              condition, please do not register our Site, otherwise Trade Horn
              may suspend or terminate your account at any time.
            </Text>

            <Text
              style={[
                styles(themeColorData).contentText,
                {height: getDimen(0.37)},
              ]}>
              1.2 Your entering into and performing these Terms are not excluded
              from the laws and regulations of the country or region to which
              you belong, reside or carry out business activities or other
              business, if you do not meet the above conditions, you should
              immediately terminate the registration or stop using our Platforms
              services . At the same time, when using our Platforms services,
              you should judge whether the counterparty has full civil capacity
              and decide whether to use our Platforms service to conduct
              transactions with the other party, and you should bear all risks
              associated with it.
            </Text>
            <Text
              style={[
                styles(themeColorData).contentText,
                {height: getDimen(0.3)},
              ]}>
              1.3 By completing the full registration process or using our
              Platform’s related services as prompted by the Site page, you
              fully understand and accept all the terms of these Terms. The
              contents of these Terms include all the terms of these Terms and
              the various rules that have been released by our Platforms or may
              be released in the future. All rules are an integral part of these
              Terms and have the same legal effect as the body of the agreement.
            </Text>

            <Text
              style={[
                styles(themeColorData).contentText,
                {height: getDimen(0.49)},
              ]}>
              1.4 Our Platforms have the right to modify these Terms from time
              to time or to formulate and modify various specific rules
              according to these Terms and publish it in the relevant system
              sections of Platforms without separately notifying you. You should
              pay attention to the changes in these Terms and the specific rules
              from time to time. If you continue to use the service after the
              changes in the contents of these Terms and the specific rules, you
              have fully read, understood and accepted the revised agreement and
              the specific rules. You will use the services of our Platforms in
              accordance with the revised agreement and specific rules. If you
              do not agree to the revised agreement, you should stop using the
              services of our Platforms.
            </Text>

            <Text
              style={[
                styles(themeColorData).contentText,
                {height: getDimen(0.26)},
              ]}>
              1.5 By confirming these Terms by yourself or by authorizing the
              parties in accordance with these Terms and the relevant rules and
              instructions of our Platforms, these Terms shall have legal effect
              between you and our Platforms. These Terms does not cover legal
              relationships or legal disputes between you and other users of our
              Platforms as a result of network services or transactions.
            </Text>

            <Text
              style={[
                styles(themeColorData).contentText,
                {height: getDimen(0.44)},
              ]}>
              1.6 You also agree that Trade Horn may, by giving notice, in its
              sole discretion terminate your access to our Platforms and to your
              account, including without limitation, our right to: limit,
              suspend or terminate the service and user accounts, prohibit
              access to our Platforms and its content, services and tools, delay
              or remove hosted content, and take technical and legal steps to
              keep user off our Platforms if we think that they are infringing
              the rights of third parties, or in violation of these Terms or
              Platform’s policies.
            </Text>

            <Text
              style={[
                styles(themeColorData).headerText,
                {marginBottom: getDimen(0.05)},
              ]}>
              2. Scope of Services
            </Text>
            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.3)}]}>
              2.1 Trade Horn provides you with a simple and convenient way to
              trade one type of digital asset for another type of digital asset.
              We do not provide users services to purchase and sell digital
              assets directly from and to us. Our services do not provide users
              with the ability to trade one form of fiat currency for another
              form of fiat currency.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.25)}]}>
              2.1.1 The Users has the right to browse the digital currency
              real-time market and transaction information on our Platforms, and
              has the right to submit digital currency trading instructions and
              complete digital currency trading through our Platforms.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.2)}]}>
              2.1.2 The Users has the right to view the information under our
              Platforms account on our Platforms, and has the right to operate
              the functions provided by our Platforms.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.25)}]}>
              2.1.3 The Users has the right to participate in the website
              activities organized by our Platforms in accordance with the
              activity rules published by our Platforms and other services
              undertaken by our Platforms
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.27)}]}>
              2.2 The user understands and agrees that our Platforms can adjust
              the service content, service type and service form on the network
              Platforms at any time according to the actual situation. Our
              Platforms are not responsible for any negative impact or loss
              caused to you or any third party due to Platforms adjustments.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.27)}]}>
              2.2 The user understands and agrees that our Platforms can adjust
              the service content, service type and service form on the network
              Platforms at any time according to the actual situation. Our
              Platforms are not responsible for any negative impact or loss
              caused to you or any third party due to Platforms adjustments.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.23)}]}>
              2.3 Depending on your country of residence, you may not be able to
              use all the functions of the Site. It is your responsibility to
              follow those rules and laws in your country of residence and/or
              country from which you access this Site and services.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.18)}]}>
              2.4 In order to access and use our services, you must create an
              account with Trade Horn. You agree to:
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.18)}]}>
              {''}(1）provide accurate, current and complete information when
              creating the account;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.18)}]}>
              （2）maintain and promptly update your account information to keep
              it accurate, complete, and current;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.2)}]}>
              （3）maintain the security and confidentiality of your login
              credentials a nd restrict access to your account and your
              computer;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.2)}]}>
              (4）promptly notify Trade Horn if you discover or otherwise
              suspect any security breaches related to our Platforms;
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.2)}]}>
              (5）take responsibility for all activities that occur under your
              account and accept all risks of unauthorized access.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.4)}]}>
              2.5 In order to provide services to users, our Platforms may use
              user personal information, non-user personal information, and
              third-party Platforms record information (hereinafter collectively
              referred to as "user information"). Once the user registers, logs
              in, and uses our Platforms services, the user will be deemed to
              fully understand, agree and accept the reasonable use of the user
              information by the company including but not limited to
              collection, statistics, analysis, and use.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.36)}]}>
              2.6 You acknowledge that the status of the transaction confirmed
              by you on our Platforms in accordance with our Platforms’ service
              processes would be an explicit directive for our Platforms to
              conduct related transactions or operations for you. You agree that
              our Platforms have the right to deal with related matters in
              accordance with these Terms and/or relevant documents and rules in
              accordance with the relevant Directives.
            </Text>

            <Text
              style={[styles(themeColorData).text, {height: getDimen(0.4)}]}>
              2.7 You are responsible for any disputes or losses caused by your
              failure to promptly modify or confirm the status of the
              transaction or fail to submit the relevant application. Our
              Platforms do not assume any responsibility.
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
      width: getDimen(0.6),
      //marginVertical: getDimen(0.03),
    },
    contents: {
      padding: 15,
    },
    contentText: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'left',
      marginTop: getDimen(0.06),
      //height: getDimen(0.7),
    },
    text: {
      color: AppColors(themeColorData).title,
      fontSize: textSize.h6,
      textAlign: 'left',
      //marginTop: getDimen(0.060),
      //height: getDimen(0.3),
    },
  });

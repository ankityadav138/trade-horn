import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import Card from './src/components/Card';
// import GraphImage from './src/components/GraphImage';
// import Contains from './src/components/Contains';
import Btn from '../../components/Btn';
import Toolbar from '../../constants/toolbar';
import {useDispatch, useSelector} from 'react-redux';
import HighchartsWebView from 'highcharts-react-native';
import {LOADING} from '../../store/action';
import { getDimen } from '../../dimensions/dimen';

const Graphical = ({navigation}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState([{value: 250, label: 'M'}]);
    const accessToken = useSelector(state => state.login.accessToken);
    const details = useSelector(state => state.common.details);
    const graphUrl = `https://api.tradehorn.com/trade/chart/history?`;
    const [configuration, setConfiguration] = useState({
      xAxis: {
        categories: ['Jan'],
      },
      series: [
        {
          data: [29.9],
        },
      ],
    });
  
    useEffect(() => {
      tradeHistoryApi();
    }, []);
  
    const tradeHistoryApi = () => {
      dispatch({
        type: LOADING,
        payload: true,
      });
      axios
        .get(graphUrl, {
          params: {
            symbol: details.toUpperCase(),
            resolution: 15,
            from: Date.now(),
            to: Date.now(),
          },
        })
        .then(function (response) {
          dispatch({
            type: LOADING,
            payload: false,
          });
          //showMessage(response.data.message);
          //console.log('Password ResponseData: ', response.data);
          const dateData = [];
          for (var i = 0; i < 10; i++) {
            dateData.push(response.data.t[i], response.data.o[i]);
          }
          console.log(dateData);
          setConfiguration({
            chart: {
              type: 'area',
            },
            title: {
              text: details.toUpperCase(),
            },
            chart: {
              zoomType: 'x',
            },
            xAxis: {
              categories: [],
            },
            xAxis: {
              type: 'datetime',
            },
            legend: {
              enabled: false,
            },
  
            series: [
              {
                data: response.data.o,
                lineWidth: 2,
              },
            ],
          });
          setData(dateData);
        })
        .catch(function (error) {
          dispatch({
            type: LOADING,
            payload: false,
          });
          //console.log('Error', error);
          showMessage(error.response.data.message);
        });
    };
  
    const theme = {
      colors: [
        '#058DC7',
        '#50B432',
        '#ED561B',
        '#DDDF00',
        '#24CBE5',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4',
      ],
      chart: {
        backgroundColor: {
          linearGradient: [30, 53, 133, 500],
          stops: [
            [0, 'rgb(8,17,67)'],
            [1, 'rgb(8,17,67)'],
          ],
        },
      },
      title: {
        style: {
          color: 'white',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
        },
      },
      subtitle: {
        style: {
          color: '#263585',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
        },
      },
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'black',
        },
        itemHoverStyle: {
          color: 'black',
        },
      },
    };
  
  
  return (
    <View style={{flex: 1, backgroundColor: '#000000F0'}}>
      <StatusBar backgroundColor="#000000F0" />
      <View style={{paddingHorizontal: 20}}>
        <View style={{paddingVertical: 18}}>
          <Image
                source={require('../../assets/arrow.png')}
                style={{width: 20, height: 20}}
          /> 
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Image
                source={require('../../assets/bitcoin.png')}
                style={{width: 33, height: 33}}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: 'bold',
                paddingLeft: 10,
                width:getDimen(0.50)
              }}>
            {details.toUpperCase()}
            </Text>
          </View>
          <View>
            <Image
                source={require('../../assets/star.png')}
                style={{width: 25, height: 25}}
            />
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 10,marginTop:'1%'}}>
      <View
      style={{
        backgroundColor: '#202020B3',
        borderRadius: 8,
        paddingLeft: 11,
        paddingVertical: 17,
        paddingRight: 17,
      }}>
      <View
        style={{
          paddingLeft: 17,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25,width:getDimen(0.50)}}>
              3790.23
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#fff', fontSize: 15,}}>H</Text>
            <Text
              style={{
                paddingLeft: 33,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              3923.23
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#979797', fontSize: 15, fontWeight: '400',width:getDimen(0.30)}}>
              26315.34CNY
            </Text>
            <Text
              style={{
                color: '#0090FF',
                fontSize: 15,
                fontWeight: '600',
                paddingLeft: 15,
                width:getDimen(0.20)
              }}>
              +12.32%
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#fff', fontSize: 15}}>L</Text>
            <Text
              style={{
                paddingLeft: 33,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              3803.65
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row',marginTop:'1%'}}>
            <Text style={{color: '#fff', fontSize: 15,width:getDimen(0.09)}}>24H</Text>
            <Text
              style={{
                paddingLeft: 33,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
              }}>
              23430
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 21,
        }}>
        <TouchableOpacity>
          <Text style={{color: '#A1A1A1', fontSize: 15,width:getDimen(0.15)}}>Line</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              color: '#0090FF',
              fontSize: 15,
              fontWeight: '600',
             // borderBottomColor: '#0090FF',
             // borderBottomWidth: 1,
              width:getDimen(0.15),
              textDecorationLine:'underline',
              textDecorationColor:'0090FF'
            }}>
            15min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#A1A1A1', fontSize: 15,width:getDimen(0.15)}}>1hour</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#A1A1A1', fontSize: 15,width:getDimen(0.20)}}>4hour</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#A1A1A1', fontSize: 15,width:getDimen(0.15)}}>1day</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#A1A1A1', fontSize: 15,width:getDimen(0.15)}}>More</Text>
        </TouchableOpacity>
      </View>
    </View>
        <View>
        <View style={{paddingTop: 8}}>
      {/* <Image
                source={require('../../assets/profile.png')}
                style={{width: 372, height: 380}}
      /> */}
            <HighchartsWebView
        style={{height: 350}}
        config={configuration}
        options={theme}
      />

    </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: 25,
          }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          width: 15,
          height: 15,
          backgroundColor: '#08D870',
          borderRadius: 7,
        }}></View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#fff',
          paddingLeft: 9,
          width:getDimen(0.10)
        }}>
        buy
      </Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          width: 15,
          height: 15,
          backgroundColor: '#FF0458',
          borderRadius: 7,
        }}></View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#fff',
          paddingLeft: 9, 
          width:getDimen(0.10)      
        }}>
            sell
      </Text>
    </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 20,
          }}>
          <Btn buttonColor="#08D870" text="BUY" onPress={() => {accessToken ? navigation.navigate('BuyBtcScreen') : null}}/>
          <Btn buttonColor="#FF0458" text="SELL" onPress={() => {accessToken ? navigation.navigate('BuyBtcScreen') : null}}/>
        </View>
      </View>
    </View>
  );
};

export default Graphical;
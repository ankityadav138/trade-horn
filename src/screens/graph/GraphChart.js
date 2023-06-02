import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import showMessage from '../../components/showMessage';
import {LOADING} from '../../store/action';
import MarketGraph from '../orders/components/MarketGraph';
import HighchartsWebView from 'highcharts-react-native';
import Toolbar from '../../constants/toolbar';
import LinearGradient from 'react-native-linear-gradient';
import {AppColors} from '../../constants/appColors';
import textSize from '../../constants/textSize';

const GraphChart = ({navigation}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([{value: 250, label: 'M'}]);
  const details = useSelector(state => state.common.details);
  // console.log('details pair', details.toUpperCase());
  const themeColorData = useSelector(state => state.login.themeValue);

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
      '#FF1010',
      '#08D870',
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
          [0, AppColors(themeColorData).background],
          [1, AppColors(themeColorData).background],
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
        color: AppColors(themeColorData).title,
      },
      itemHoverStyle: {
        color: 'black',
      },
    },
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Toolbar showImage="graph" />
      <HighchartsWebView
        style={{height: 300}}
        config={configuration}
        options={theme}
      />
    </View>
  );
};

export default GraphChart;

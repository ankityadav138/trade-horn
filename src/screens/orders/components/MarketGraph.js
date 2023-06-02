import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HighchartsWebView from 'highcharts-react-native';
import showMessage from '../../../components/showMessage';
import {LOADING} from '../../../store/action';

const MarketGraph = () => {
  const dispatch = useDispatch();
  const details = useSelector(state => state.common.details);
  // console.log('details pair', details);

  const [configuration, setConfiguration] = useState({
    xAxis: {
      categories: ['Jan'],
    },
    series: [
      {
        data: [29.9, 29.9, 32, 44, 33, 2, 1],
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
      .get(
        `https://api.tradehorn.com/trade/chart/history?symbol=ETH%2FUSDT&resolution=15&from=1646383952495&to=1646383952495`,
      )
      .then(function (response) {
        dispatch({
          type: LOADING,
          payload: false,
        });
        //showMessage(response.data.message);
        // console.log('Password ResponseData: ', response.data);

        setConfiguration({
          chart: {
            type: 'area',
          },
          title: {
            text: 'ETH/USDT',
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
    <View>
      <HighchartsWebView
        style={{height: 200}}
        config={configuration}
        options={theme}
      />
    </View>
  );
};

export default MarketGraph;

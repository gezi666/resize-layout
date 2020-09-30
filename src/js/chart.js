//创建图表
const createChart = (dom, option) => {
  const myChart = echarts.init(dom);
  myChart.setOption(option);
  //适应页面大小变化自适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  return myChart;
}

//隐患整改率图表
const createYHZGLChart = (id,chartData) => {
    //   const dom = document.getElementById(id);
    //   let color = ['#4cdd27', '#ffc400', '#f13838'];
    //   let arrName = [];
    //   let arrValue = [];
    //   let sum = 0;
    //   let pieSeries = [],
    //       lineYAxis = [];
    //   // 数据处理
    //   chartData.forEach((v, i) => {
    //       arrName.push(v.name);
    //       arrValue.push(v.value);
    //       sum = sum + parseInt(v.value);
    //   })

    //   // 图表option整理
    //   chartData.forEach((v, i) => {
    //       pieSeries.push({
    //           name: '隐患整改',
    //           type: 'pie',
    //           clockWise: false,
    //           hoverAnimation: false,
    //           radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
    //           center: ["30%", "50%"],
    //           label: {
    //               show: false
    //           },
    //           data: [{
    //               value: parseInt(v.value),
    //               name: v.name
    //           }, {
    //               value: sum - parseInt(v.value),
    //               name: '',
    //               itemStyle: {
    //                   color: "rgba(0,0,0,0)"
    //               }
    //           }]
    //       });
    //       pieSeries.push({
    //           name: '',
    //           type: 'pie',
    //           silent: true,
    //           z: 1,
    //           clockWise: false, //顺时加载
    //           hoverAnimation: false,//鼠标移入变大
    //           radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
    //           center: ["30%", "50%"],
    //           label: {
    //               show: false,
    //           },
    //           data: [{
    //               value: 7.5,
    //               itemStyle: {
    //                   color: "#ffffff65" 
    //               }
    //           }, {
    //               value: 2.5,
    //               name: '',
    //               itemStyle: {
    //                   color: "rgba(0,0,0,0)"
    //               }
    //           }]
    //       });
    //       v.percent = (parseInt(v.value) / sum * 100).toFixed(0) + "%";
    //       lineYAxis.push({
    //           value: i,
    //           textStyle: {
    //               rich: {
    //                   circle: {
    //                       color: color[i],
    //                       padding: [0, 5]
    //                   }
    //               }
    //           }
    //       });
    //   })

    //  const option = {
    //       backgroundColor: '#ffffff00',
    //       color: color,
    //       grid: {
    //           top: '15%',
    //           bottom: '54%',
    //           left: "30%",
    //           containLabel: false
    //       },
    //       yAxis: [{
    //           type: 'category',
    //           inverse: true,
    //           axisLine: {
    //               show: false
    //           },
    //           axisTick: {
    //               show: false
    //           },
    //           axisLabel: {
    //               formatter: function(params) {
    //                   let item = chartData[params];
    //                   return '{line|}{circle|●}{name|' + item.name + '}{bd||}{percent|' + item.percent + '}'
    //               },
    //               interval: 0,
    //               inside: true,
    //               textStyle: {
    //                   color: "#333",
    //                   fontSize: 10,
    //                   rich: {
    //                       line: {
    //                           width: 2,
    //                           height: 2,
    //                           // backgroundColor: { image: dashedPic }
    //                       },
    //                       name: {
    //                           color: '#fff',
    //                           fontSize: 10,
    //                       },
    //                       bd: {
    //                           color: '#ccc',
    //                           padding: [0, 5],
    //                           fontSize: 10,
    //                       },
    //                       percent: {
    //                           color: '#fff',
    //                           fontSize: 10,
    //                       },
    //                       value: {
    //                           color: '#fff',
    //                           fontSize: 10,
    //                           fontWeight: 500,
    //                           padding: [0, 0, 0, 20]
    //                       }
    //                   }
    //               },
    //               show: true
    //           },
    //           data: lineYAxis
    //       }],
    //       xAxis: [{
    //           show: false
    //       }],
    //       series: pieSeries
    //   };
    //   return createChart(dom, option);
    const dom = document.getElementById(id)
  let total=parseInt(chartData[0]['value'])+parseInt(chartData[1]['value'])
  console.log(total)
  const option = {
      tooltip: {
          show: true,
          trigger: 'item',
          //formatter: "{b}: <br>{c} ({d}%)"
          formatter: function (info) { 
            //自定义的
            return info.data.name+ " : " + info.data.value + " ("+((parseInt(info.data.value)/total)*100).toFixed(0)+"%)"
        }
      },
      series: [{
          type: 'pie',
          selectedMode: 'single',
          radius: ['45%', '55%'],
          startAngle: 0,
          //'#48ff00', '#ffe600' color: ['#73d13d', '#ffec3d','#ff4d4f'],
          color: ['#48ff00', '#ffe600','#ff4d4f'],

          label: {
              normal: {
                  formatter: function (info) { 
                    //自定义的
                    return info.data.name+ "\n " + info.data.value + " ("+((parseInt(info.data.value)/total)*100).toFixed(0)+"%)"
                },
                  textStyle: {
                      fontWeight: 'bold',
                      fontSize: 9,
                      rich: {
                          text: {
                              fontSize: 9,
                              fontWeight: 500,
                              padding: [5, -49, 5, -49]
                          },
                          num: {
                              fontSize: 9,
                              padding: [5, -49, 5, -49]
                          }
                      }
                  },
              }
          },
          labelLine: {
              normal: {
                  length: 2,
                  length2: 2
              }
          },
          data: chartData
      }, ]
  };
 
  return createChart(dom, option);
  }
  //巡检完成率图表
  const createXJWCLChart = (id,complete,sum) => {
      const dom = document.getElementById(id);
      let data = [{
                  value: complete,
                  name: '已完成',
                  itemStyle: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1, [{
                                  offset: 0,
                                  // color: '#0C95FF'
                                  color: '#6e5dff'
                              },
                              {
                                  offset: 1,
                                  // color: '#1362eb'
                                  color: '#1b57e2'
                              }
                          ]
                      )
                  }
              },
              {
                  value: sum - complete,
                  name: '进行中',
                  tooltip: {
                      show: false,
                  },
                  itemStyle: {
                      normal: {
                          color: '#e0e0e0'
                      },
                      emphasis: {
                          show: false
                      }
                  },
              }
          ]
     // 已完成百分比
     let Filldata = complete / sum
     console.log(Filldata)
    
     const option = {
          tooltip: {
              trigger: 'item',
              formatter: function(res) {

                  if (res.componentSubType == 'liquidFill') {
                      return ''
                  } else {
                      return '' + res.name + '：' + (Filldata * 100).toFixed(0) + '%';
                  }
              }
          },
          title: {
              text: (Filldata * 100).toFixed(0) + '%',
              left: 'center',
              top: '48%',
              textStyle: {
                  fontSize: 20,
                  fontWeight: 'normal',
                  color: '#a2c7f3'
              }
          },
          series: [{
                  type: 'liquidFill',
                  data: [{
                      value: Filldata,
                  }, {
                      value: Filldata,
                  }],
                  backgroundStyle: {
                      color: "transparent"
                  },
                  color: ['rgba(68,165,255, 0.3)', 'rgba(68,165,255, 0.5)'],
                  radius: '88%',
                  center: ['50%', '50%'],
                  label: {
                      normal: {
                          formatter: '',
                      }
                  },
                  outline: {
                      show: false
                  }
              },
              {
                  type: 'pie',
                  startAngle: 90, //起始角度
                  radius: ['88%', '92%'],
                  label: {
                      show: false
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  hoverAnimation: false,
                  data: data,
              }
          ]
      }
      return createChart(dom, option);
  }
  //SDSW图表
// const createSDSWChart = (id,SD,SW,SDSWratio) => {
//       const dom = document.getElementById(id);
//       //获取系统当前时间
//       let now = new Date(); 
//       let nowTime = now.getTime() ; 
//       let oneDayTime = 24*60*60*1000 ;
//       let dates = [];
//       for(let i = 0 ; i < 6 ; i++){ 
//           //显示周一
//           let ShowTime = nowTime - i*oneDayTime ; 
//           //初始化日期时间
//           let myDate = new Date(ShowTime); 
//           let month=myDate.getMonth()+1;  
//           let date=myDate.getDate(); 
//           dates.push(month+"/"+date)
//       }     
//       const option = {
//           /*  grid: {
//               top: "20%",
//               bottom: "12%"
//             },*/
//             backgroundColor:"#ffffff00",
//             tooltip: {
//               trigger: "axis",
//               axisPointer: {
//                 type: "shadow",
//                 label: {
//                   show: true
//                 }
//               }
//             },
//             legend: {
//               data: ["比率", "SD", "SW"],
//               top: "2%",
//               right:'10',
//               textStyle: {
//                 color: "rgba(250,250,250,0.6)",
//                 fontSize: 16
//               }
//             },
//             xAxis: {
//               data: [
//                   dates[5],
//                   dates[4],
//                   dates[3],
//                   dates[2],
//                   dates[1],
//                   dates[0]
//               ],
//               axisLine: {
//                 show: true, //隐藏X轴轴线
//                 lineStyle: {
//                   color: '#26D9FF',
//                   width:2
//                 }
//               },
//               axisTick: {
//                 show: true //隐藏X轴刻度
//               },
//               axisLabel: {
//                 show: true,
//                 textStyle: {
//                   color: "rgba(250,250,250,0.6)", //X轴文字颜色
//                   fontSize: 16
//                 }
//               },
//               splitArea: {
//                 show: true,
//                 areaStyle: {
//                   color: ["rgba(250,250,250,0.1)", "rgba(250,250,250,0)"]
//                 }
//               }
//             },
//             yAxis: [{
//               type: "value",
//               nameTextStyle: {
//                 color: "#ebf8ac",
//                 fontSize: 16
//               },
//               splitLine: {
//                 show: false
//               },
//               axisTick: {
//                 show: true
//               },
//               axisLine: {
//                 show: true,
//                 lineStyle: {
//                   color: '#26D9FF',
//                   width:2
//                 }
//               },
//               axisLabel: {
//                 show: true,
//                 textStyle: {
//                   color: "rgba(250,250,250,0.6)",
//                   fontSize: 16
//                 }
//               },
          
//             },
//               {
//                 type: "value",
//                 nameTextStyle: {
//                   color: "#ebf8ac",
//                   fontSize: 16
//                 },
//                 position: "right",
//                 splitLine: {
//                   show: false
//                 },
//                 axisTick: {
//                   show: false
//                 },
//                 axisLine: {
//                   show: false
//                 },
//                 axisLabel: {
//                   show: true,
//                   formatter: "{value} %", //右侧Y轴文字显示
//                   textStyle: {
//                     color: "rgba(250,250,250,0.6)",
//                     fontSize: 16
//                   }
//                 }
//               }
//             ],
//             series: [{
//               name: "比率",
//               type: "line",
//               yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
//               smooth: true, //平滑曲线显示
//               showAllSymbol: true, //显示所有图形。
//               symbol: "circle", //标记的图形为实心圆
//               symbolSize: 8, //标记的大小
//               itemStyle: {
//                 //折线拐点标志的样式
//                 color: "#1045A0",
//                 borderColor: "#3D7EEB",
//                 width: 2,
//                 shadowColor: "#3D7EEB",
//                 shadowBlur: 4
//               },
//               lineStyle: {
//                 color: "#3D7EEB",
//                 width:2,
//                 shadowColor: "#3D7EEB",
//                 shadowBlur: 4
//               },
//               areaStyle: {
//                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                   offset: 0,
//                   color: "rgba(61,126,235, 0.5)"
//                 },
//                   {
//                     offset: 1,
//                     color: "rgba(61,126,235, 0)"
//                   }
//                 ])
//               },
//               //SD:SW
//               data: SDSWratio
//             },
//               {
//                 name: "SD",
//                 type: "bar",
//                 barWidth: 15,
//                 itemStyle: {
//                   normal: {
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                       offset: 0,
//                       color: "rgba(61,126,235, 1)"
//                     },
//                       {
//                         offset: 1,
//                         color: "rgba(61,126,235, 0)"
//                       }
//                     ]),
//                     borderColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//                       offset: 0,
//                       color: "rgba(160,196,225, 1)"
//                     },
//                       {
//                         offset: 1,
//                         color: "rgba(61,126,235, 1)"
//                       }
//                     ]),
//                     borderWidth: 2
//                   }
//                 },
//                 //SD
//                 data: SD
//               },
//               {
//                 name: "SW",
//                 type: "bar",
//                 barWidth: 15,
//                 itemStyle: {
//                   normal: {
//                     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(15,197,243,1)'}, {offset: 1, color: 'rgba(15,197,243,0)'}]),
//                     borderColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'rgba(180,240,255,1)'}, {offset: 1, color: 'rgba(15,197,243,1)'}]),
//                     borderWidth: 2
//                   }
//                 },
//                 //SW
//                 data: SW
//               }
//             ]
//           };
//       return createChart(dom, option);
//   }
  //SDSW图表
  const createSDSWChart = (id,sdswData) => {
    const dom = document.getElementById(id);
    let total=parseInt(sdswData[0]['value'])+parseInt(sdswData[1]['value'])
    const option = {
        color: ['#A0CE3A', '#31C5C0'],
        backgroundColor: '#ffffff00',
        title: {
            text: '总数',
            subtext: total,
            textStyle: {
                color: '#ffffff',
                //字体加粗
                fontWeight: 'bolder',
                fontSize: 14,
            },
            subtextStyle: {
                fontSize: 12,
                color: ['#ffffff'],
                fontWeight: 'bolder',
            },
            x: 'center',
            y: 'center',
        },
        grid: {
            bottom: 50,
            left: 30,
            right: '10%'
        },
        legend: {
            orient: 'horizontal',
            top: "top",
            left: "32%",
            textStyle: {
                color: '#f2f2f2',
                fontSize: 8,

            },
            icon: 'roundRect',
            data: sdswData,
        },
        series: [
            // 主要展示层的
            {
                radius: ['30%', '61%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: true,
                        formatter: function (info) { 
                            console.log(info)
                            //自定义的
                            return info.data.value + "\n("+((parseInt(info.data.value)/total)*100).toFixed(0)+"%)"
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff',
                            //字体加粗
                            fontWeight: 'bolder'
                        },
                        //position: 'outside'
                        position: 'inner'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 8,
                        length2: 15
                    },
                    emphasis: {
                        show: true
                    }
                },
                name: "SDSW总量",
                data: sdswData,

            },
            // 边框的设置
            {
                radius: ['30%', '34%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                animation: false,
                tooltip: {
                    show: false
                },
                data: [{
                    value: 1,
                    itemStyle: {
                        color: "rgba(250,250,250,0.3)",
                    },
                }],
            }, {
                name: '外边框',
                type: 'pie',
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                center: ['50%', '50%'],
                radius: ['65%', '65%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 9,
                    name: '',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: '#0b5263'
                        }
                    }
                }]
            },
        ]
    };
    return createChart(dom, option);
}
  //GCTJ图表
  const createGCTJChart = (id,gctjData) => {
    const dom = document.getElementById(id);
    let total=parseInt(gctjData[0]['value'])+parseInt(gctjData[1]['value'])
    const option = {
        color: ['#48ff00', '#ffae00'],
        backgroundColor: '#ffffff00',
        title: {
            text: '总数',
            subtext: total,
            textStyle: {
                color: '#f2f2f2',
                fontSize: 14,
            },
            subtextStyle: {
                fontSize: 12,
                color: ['#ffffff'],
                fontWeight: 'bolder',
            },
            x: 'center',
            y: 'center',
        },
        grid: {
            bottom: 50,
            left: 30,
            right: '10%'
        },
        legend: {
            orient: 'horizontal',
            top: "top",
            left: "28%",
            textStyle: {
                color: '#f2f2f2',
                fontSize: 8,

            },
            icon: 'roundRect',
            data: gctjData,
        },
        series: [
            // 主要展示层的
            {
                radius: ['30%', '61%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: true,
                        formatter: function (info) { 
                            console.log(info)
                            //自定义的
                            return info.data.value + "\n("+((parseInt(info.data.value)/total)*100).toFixed(0)+"%)"
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff',
                            fontWeight: 'bolder'
                        },
                        position: 'inner'
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 8,
                        length2: 15
                    },
                    emphasis: {
                        show: true
                    }
                },
                name: "GC总量",
                data: gctjData,

            },
            // 边框的设置
            {
                radius: ['30%', '34%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                animation: false,
                tooltip: {
                    show: false
                },
                data: [{
                    value: 1,
                    itemStyle: {
                        color: "rgba(250,250,250,0.3)",
                    },
                }],
            }, {
                name: '外边框',
                type: 'pie',
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                center: ['50%', '50%'],
                radius: ['65%', '65%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 9,
                    name: '',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: '#0b5263'
                        }
                    }
                }]
            },
        ]
    };
    return createChart(dom, option);
}
  //证书类型图表
const createZGZSChart = (id,cardData) => {
      const dom = document.getElementById(id);
      const option = {
          color: ['#A0CE3A', '#31C5C0'],
          backgroundColor: '#ffffff00',
          title: {
              text: '总数',
              subtext: parseInt(cardData[0].value)+parseInt(cardData[1].value),
              textStyle: {
                  color: '#f2f2f2',
                  fontSize: 14,
              },
              subtextStyle: {
                  fontSize: 10,
                  color: ['#ff9d19'],
              },
              x: 'center',
              y: 'center',
          },
          grid: {
              bottom: 50,
              left: 30,
              right: '10%'
          },
          legend: {
              orient: 'horizontal',
              top: "top",
              left: "20%",
              textStyle: {
                  color: '#f2f2f2',
                  fontSize: 8,

              },
              icon: 'roundRect',
              data: cardData,
          },
          series: [
              // 主要展示层的
              {
                  radius: ['30%', '61%'],
                  center: ['50%', '50%'],
                  type: 'pie',
                  label: {
                      normal: {
                          show: true,
                          formatter: "{c}个",
                          textStyle: {
                              fontSize: 12,

                          },
                          position: 'outside'
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  labelLine: {
                      normal: {
                          show: true,
                          length: 8,
                          length2: 15
                      },
                      emphasis: {
                          show: true
                      }
                  },
                  name: "资格证书总量",
                  data: cardData,

              },
              // 边框的设置
              {
                  radius: ['30%', '34%'],
                  center: ['50%', '50%'],
                  type: 'pie',
                  label: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: false
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      },
                      emphasis: {
                          show: false
                      }
                  },
                  animation: false,
                  tooltip: {
                      show: false
                  },
                  data: [{
                      value: 1,
                      itemStyle: {
                          color: "rgba(250,250,250,0.3)",
                      },
                  }],
              }, {
                  name: '外边框',
                  type: 'pie',
                  clockWise: false, //顺时加载
                  hoverAnimation: false, //鼠标移入变大
                  center: ['50%', '50%'],
                  radius: ['65%', '65%'],
                  label: {
                      normal: {
                          show: false
                      }
                  },
                  data: [{
                      value: 9,
                      name: '',
                      itemStyle: {
                          normal: {
                              borderWidth: 2,
                              borderColor: '#0b5263'
                          }
                      }
                  }]
              },
          ]
      };
      return createChart(dom, option);
  }
  //当日作业证
const createZYZChart = (id,ZYZtype,ZYZcount) => {
      const dom = document.getElementById(id);
      const option = {
          grid: {
              left: '5%',
              right: '5%',
              bottom: '5%',
              top: '10%',
              containLabel: true
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'none'
              },
              formatter: function(params) {
                  console.log(params)
                  return params[0].name + '<br/>' +
                      "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                      params[0].seriesName + ' : ' + Number(params[0].value).toLocaleString() + ' 个<br/>'
              }
          },
          backgroundColor: '#ffffff00',
          xAxis: {
              show: false,
              type: 'value'
          },
          yAxis: [{
              type: 'category',
              inverse: true,
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#ffffff'
                  },
              },
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              data: ZYZtype
          }, {
              type: 'category',
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                  textStyle: {
                      color: '#ffffff',
                      fontSize: '12'
                  },
                  formatter: function(value) {
                      return value.toLocaleString();
                  },
              },
              data: ZYZcount
          }],
          series: [{
                  name: '个数',
                  type: 'bar',
                  zlevel: 1,
                  itemStyle: {
                      normal: {
                          barBorderRadius: 5,
                          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                              offset: 0,
                              color: 'rgb(57,89,255,1)'
                          }, {
                              offset: 1,
                              color: 'rgb(46,200,207,1)'
                          }]),
                      },
                  },
                  barWidth: 20,
                  data: ZYZcount
              },
              {
                  name: '背景',
                  type: 'bar',
                  barWidth: 20,
                  barGap: '-100%',
                  data: [20, 20, 20, 20],
                  itemStyle: {
                      normal: {
                          color: '#8488a07e',
                          barBorderRadius: 5,
                      }
                  },
              },
          ]
      };
      return createChart(dom, option);
  }
  //任务跟踪
const createRWGZChart = (id,taskData) => {
  const dom = document.getElementById(id)
  let total=parseInt(taskData[0]['value'])+parseInt(taskData[1]['value'])
  console.log(total)
  const option = {
      tooltip: {
          show: true,
          trigger: 'item',
          //formatter: "{b}: <br>{c} ({d}%)"
          formatter: function (info) { 
            //自定义的
            return info.data.name+ " : " + info.data.value + " ("+((parseInt(info.data.value)/total)*100).toFixed(0)+"%)"
        }
      },
      series: [{
          type: 'pie',
          selectedMode: 'single',
          radius: ['45%', '55%'],
          startAngle: 0,
          color: ['#48ff00', '#ff4d4f'],

          label: {
              normal: {
                  formatter: function (info) { 
                    //自定义的
                    return info.data.name+ "\n " + info.data.value + " ("+((parseInt(info.data.value)/total)*100).toFixed(0)+"%)"
                },
                  textStyle: {
                      fontWeight: 'bold',
                      fontSize: 9,
                      rich: {
                          text: {
                              fontSize: 9,
                              fontWeight: 500,
                              padding: [5, -49, 5, -49]
                          },
                          num: {
                              fontSize: 9,
                              padding: [5, -49, 5, -49]
                          }
                      }
                  },
              }
          },
          labelLine: {
              normal: {
                  length: 2,
                  length2: 2
              }
          },
          data: taskData
      }, ]
  };
 
  return createChart(dom, option);
}  
//危废统计
const createWFTJChart = (id,category) => {
  const dom = document.getElementById(id);
  let total = 200; // 数据总数
  let  datas = [];
  category.forEach(value => {
  datas.push(value.value);
  });
  const option = {
  backgroundColor:'#ffffff00',
//   dataZoom: [//滑动条
//           {
//               yAxisIndex: 0,//这里是从X轴的0刻度开始
//               show: false,//是否显示滑动条，不影响使用
//               type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
//               startValue: 0, // 从头开始。
//               endValue: 5  // 一次性展示6个。
//           }
//       ],
      tooltip : {
          trigger: 'axis',
          formatter(category){

              for(x in category){
                  return category[x].name +":"+category[x].data.value+"吨";
              }
               
          }
      },
  xAxis: {
      max: total,
      splitLine: {
          show: false
      },
      axisLine: {
          show: false
      },
      axisLabel: {
          show: false
      },
      axisTick: {
          show: false
      }
  },
  grid: {
      left: 80,
      top: 20, // 设置条形图的边距
      right: 80,
      bottom: 20
  },
  yAxis: [{
      type: "category",
      inverse: false,
      data: category,
      axisLine: {
          show: false
      },
      axisTick: {
          show: false
      },
      axisLabel: {
          show: false
      }
  }],
  series: [{
          type: "bar",
          barWidth: 18,
          legendHoverLink: false,
          silent: true,
          itemStyle: {
              normal: {
                  color: function(params) {
                      let color;
                      if(params.dataIndex==19){
                          color = {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 1,
                              y2: 0,
                              colorStops: [{
                                      offset: 0,
                                      color: "#EB5118" // 0% 处的颜色
                                  },
                                  {
                                      offset: 1,
                                      color: "#F21F02" // 100% 处的颜色
                                  }
                              ]
                          }
                          }else if(params.dataIndex==18){
                          color = {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 1,
                              y2: 0,
                              colorStops: [{
                                      offset: 0,
                                      color: "#FFA048" // 0% 处的颜色
                                  },
                                  {
                                      offset: 1,
                                      color: "#B25E14" // 100% 处的颜色
                                  }
                              ]
                          }
                          }else if(params.dataIndex==17){
                          color = {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 1,
                              y2: 0,
                              colorStops: [{
                                      offset: 0,
                                      color: "#F8E972" // 0% 处的颜色
                                  },
                                  {
                                      offset: 1,
                                      color: "#E5C206" // 100% 处的颜色
                                  }
                              ]
                          }
                          }else{
                          color = {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 1,
                              y2: 0,
                              colorStops: [{
                                      offset: 0,
                                      color: "#1588D1" // 0% 处的颜色
                                  },
                                  {
                                      offset: 1,
                                      color: "#0F4071" // 100% 处的颜色
                                  }
                              ]
                          }
                          }
                          return color;
                  },
              }
          },
          label: {
              normal: {
                  show: true,
                  position: "left",
                  formatter: function (params) {
                      let name = params.data.name
                      // 超出省略
                      name = name.toString();
                      let maxlength= 7;
                      if (name.length>maxlength) {
                          return name.substring(0, maxlength-1)+'...';
                      } else{
                          return name;
                      }
                  },
                  textStyle: {
                      color: "#fff",
                      fontSize: 12
                  }
              }
          },
          data: category,
          z: 1,
          animationEasing: "elasticOut"
      },
      {
          // 分隔
          type: "pictorialBar",
          itemStyle: {
              normal:{
                  color:"#061348"
              }
          },
          symbolRepeat: "fixed",
          symbolMargin: 4,
          symbol: "rect",
          symbolClip: true,
          symbolSize: [1, 21],
          symbolPosition: "start",
          symbolOffset: [1, -1],
          symbolBoundingData: this.total,
          data: category,
          z: 2,
          animationEasing: "elasticOut"
      },
      {
          // 外边框
          type: "pictorialBar",
          symbol: "rect",
          symbolBoundingData: total,
          itemStyle: {
              normal: {
                  color: "none"
              }
          },
          label: {
              normal: {
                  formatter: (params) => { 
                     let text;
                     text = '{d|  '+params.data.value+'}';
                      return text;
                  },
                  rich:{
                      a: {
                          color: '#4dcef8'
                      },
                      b: {
                          color: '#4dcef8'
                      },
                      c:{
                          color: '#4dcef8'
                      },
                      d: {
                          color: '#4dcef8'
                      }
                  },
                  position: 'right',
                  distance: 0, // 向右偏移位置
                  show: true
              }
          },
          data: category,
          z: 0,
          animationEasing: "elasticOut"
      },
      {
          name: "外框",
          type: "bar",
          barGap: "-120%", // 设置外框粗细
          data: [total, total, total,total],
          barWidth: 25,
          itemStyle: {
              normal: {
                  color: "transparent", // 填充色
                  barBorderColor: "#1C4B8E", // 边框色
                  barBorderWidth: 1, // 边框宽度
                  // barBorderRadius: 0, //圆角半径
                  label: {
                      // 标签显示位置
                      show: false,
                      position: "top" // insideTop 或者横向的 insideLeft
                  }
              }
          },
          z: 0
      }
  ]
  
  };
  //通过定时器的方式刷新，改变statrValue，endValue
//   setInterval(function () {
//       // 每次向后滚动一个，最后一个从头开始。
//       if (option.dataZoom[0].endValue == category.length ) {
//           option.dataZoom[0].endValue = 6; 
//           option.dataZoom[0].startValue = 0;
//       }
//       else {
//           option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
//           option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
//       }
//       return createChart(dom, option);
//   }, 2000); 
return createChart(dom, option);
}
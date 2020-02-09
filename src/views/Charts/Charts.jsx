import React from 'react'
import PropTypes from 'prop-types'

//redux manenos
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { getFundsData } from '../../actions/fundsAction'

// react plugin for creating charts
import ChartistGraph from 'react-chartist'

//clip loader
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// @material-ui/icons
import Timeline from '@material-ui/icons/Timeline'

// core components
import Heading from 'components/Heading/Heading.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'

import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'

import chartsStyle from 'assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx'
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx'

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  }
}

var Chartist = require('chartist')

var delays = 80,
  durations = 500
var delays2 = 80,
  durations2 = 500

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
`

class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      members: []
    }
  }

  async componentDidMount() {
    await this.props.getFundsData(this.props.history).then(() => {
      this.setState({ loaded: true })
    })
  }

  render() {
    const { classes } = this.props
    if (this.state.loaded) {
      const { weeklyIn } = this.props.funds.funds
      const { yearlyIn } = this.props.funds.funds
      const { weeklyOut } = this.props.funds.funds
      const { yearlyOut } = this.props.funds.funds
      const { pieData } = this.props.funds.funds
      let weeklyInChartData
      let yearlyInChartData
      let weeklyOutChartData
      let yearlyOutChartData
      let totalWeeklyIn
      let totalYearlyIn
      let totalWeeklyOut
      let totalYearlyOut
      let multipleYearlyChart
      let pieChart

      //weekly in chart

      if (weeklyIn.length > 0) {
        const weeklyInData = weeklyIn[0]
        totalWeeklyIn =
          weeklyInData.sun +
          weeklyInData.mon +
          weeklyInData.tue +
          weeklyInData.wed +
          weeklyInData.thur +
          weeklyInData.fri +
          weeklyInData.sat

        weeklyInChartData = {
          data: {
            labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'],
            series: [
              [
                weeklyInData.sun,
                weeklyInData.mon,
                weeklyInData.tue,
                weeklyInData.wed,
                weeklyInData.thur,
                weeklyInData.fri,
                weeklyInData.sat
              ]
            ]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 5000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      } else {
        totalWeeklyIn = 0
        weeklyInChartData = {
          data: {
            labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'],
            series: [[0, 0, 0, 0, 0, 0, 0]]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      }

      //weekly out chart data

      if (weeklyOut.length > 0) {
        const weeklyOutData = weeklyOut[0]
        weeklyOutChartData = {
          data: {
            labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'],
            series: [
              [
                weeklyOutData.sun,
                weeklyOutData.mon,
                weeklyOutData.tue,
                weeklyOutData.wed,
                weeklyOutData.thur,
                weeklyOutData.fri,
                weeklyOutData.sat
              ]
            ]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 5000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      } else {
        weeklyOutChartData = {
          data: {
            labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'],
            series: [[0, 0, 0, 0, 0, 0, 0]]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      }

      //Yearly in chart
      if (yearlyIn.length > 0) {
        const yearlyInData = yearlyIn[0]
        totalYearlyIn =
          yearlyInData.jan +
          yearlyInData.feb +
          yearlyInData.mar +
          yearlyInData.apr +
          yearlyInData.may +
          yearlyInData.jun +
          yearlyInData.jul +
          yearlyInData.aug +
          yearlyInData.sep +
          yearlyInData.oct +
          yearlyInData.nov +
          yearlyInData.dec

        yearlyInChartData = {
          data: {
            labels: [
              'jan',
              'feb',
              'mar',
              'apr',
              'may',
              'jun',
              'jul',
              'aug',
              'sep',
              'oct',
              'nov',
              'dec'
            ],
            series: [
              [
                yearlyInData.jan,
                yearlyInData.feb,
                yearlyInData.mar,
                yearlyInData.apr,
                yearlyInData.may,
                yearlyInData.jun,
                yearlyInData.jul,
                yearlyInData.aug,
                yearlyInData.sep,
                yearlyInData.oct,
                yearlyInData.nov,
                yearlyInData.dec
              ]
            ]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 500000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      } else {
        totalYearlyIn = 0
        yearlyInChartData = {
          data: {
            labels: [
              'jan',
              'feb',
              'mar',
              'apr',
              'may',
              'jun',
              'jul',
              'aug',
              'sep',
              'oct',
              'nov',
              'dec'
            ],
            series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 500000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      }

      //yearly out chart

      if (yearlyOut.length > 0) {
        const yearlyOutData = yearlyOut[0]
        yearlyOutChartData = {
          data: {
            labels: [
              'jan',
              'feb',
              'mar',
              'apr',
              'may',
              'jun',
              'jul',
              'aug',
              'sep',
              'oct',
              'nov',
              'dec'
            ],
            series: [
              [
                yearlyOutData.jan,
                yearlyOutData.feb,
                yearlyOutData.mar,
                yearlyOutData.apr,
                yearlyOutData.may,
                yearlyOutData.jun,
                yearlyOutData.jul,
                yearlyOutData.aug,
                yearlyOutData.sep,
                yearlyOutData.oct,
                yearlyOutData.nov,
                yearlyOutData.dec
              ]
            ]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 500000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      } else {
        yearlyOutChartData = {
          data: {
            labels: [
              'jan',
              'feb',
              'mar',
              'apr',
              'may',
              'jun',
              'jul',
              'aug',
              'sep',
              'oct',
              'nov',
              'dec'
            ],
            series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
          },
          options: {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 10
            }),
            axisY: {
              showGrid: true,
              offset: 40
            },
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 500000,
            showPoint: true,
            height: '300px'
          },
          animation: {
            draw: function(data) {
              if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                })
              } else if (data.type === 'point') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      }

      //mutliple chart

      if (yearlyIn.length > 0 && yearlyOut.length > 0) {
        const yearlyInData = yearlyIn[0]
        const yearlyOutData = yearlyOut[0]
        multipleYearlyChart = {
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            series: [
              [
                yearlyInData.jan,
                yearlyInData.feb,
                yearlyInData.mar,
                yearlyInData.apr,
                yearlyInData.may,
                yearlyInData.jun,
                yearlyInData.jul,
                yearlyInData.aug,
                yearlyInData.sep,
                yearlyInData.oct,
                yearlyInData.nov,
                yearlyInData.dec
              ],
              [
                yearlyOutData.jan,
                yearlyOutData.feb,
                yearlyOutData.mar,
                yearlyOutData.apr,
                yearlyOutData.may,
                yearlyOutData.jun,
                yearlyOutData.jul,
                yearlyOutData.aug,
                yearlyOutData.sep,
                yearlyOutData.oct,
                yearlyOutData.nov,
                yearlyOutData.dec
              ]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '300px'
          },
          responsiveOptions: [
            [
              'screen and (max-width: 640px)',
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0]
                  }
                }
              }
            ]
          ],
          animation: {
            draw: function(data) {
              if (data.type === 'bar') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays2,
                    dur: durations2,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      } else {
        multipleYearlyChart = {
          data: {
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            series: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '300px'
          },
          responsiveOptions: [
            [
              'screen and (max-width: 640px)',
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0]
                  }
                }
              }
            ]
          ],
          animation: {
            draw: function(data) {
              if (data.type === 'bar') {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays2,
                    dur: durations2,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                })
              }
            }
          }
        }
      }

      //pie chart
      if (pieData && Object.keys(pieData).length > 0) {
        const totalFunds = Number(pieData.totalIn) + Number(pieData.totalOut)
        const totalIn = Number(pieData.totalIn)
        const totalOut = Number(pieData.totalOut)

        pieChart = {
          data: {
            labels: [`In (KES ${totalIn})`, `Out (KES ${totalOut})`],
            series: [
              (totalIn / totalFunds) * 100,
              (totalOut / totalFunds) * 100
            ]
          },
          options: {
            height: '230px'
          }
        }
      } else {
        pieChart = {
          data: {
            labels: [`Funds In (KES 0)`, `Funds Out (KES 0)`],
            series: [0, 0]
          },
          options: {
            height: '230px'
          }
        }
      }

      return (
        <div>
          <Heading
            textAlign="center"
            title="Finance Charts"
            category={
              <span>A visual representation of funds flowing in and out.</span>
            }
          />
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="info">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    This Week's Funds In Breakdown - KES {totalWeeklyIn}
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={weeklyInChartData.data}
                    type="Line"
                    options={weeklyInChartData.options}
                    listener={weeklyInChartData.animation}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="info">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    This Year's Funds In Breakdown - KES {totalYearlyIn}
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={yearlyInChartData.data}
                    type="Line"
                    options={yearlyInChartData.options}
                    listener={yearlyInChartData.animation}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="danger" icon>
                  <CardIcon color="danger">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    This Weekl's Funds Out Breakdown
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={weeklyOutChartData.data}
                    type="Line"
                    options={weeklyOutChartData.options}
                    listener={weeklyOutChartData.animation}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="danger" icon>
                  <CardIcon color="danger">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    This Year's Funds Out Breakdown
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={yearlyOutChartData.data}
                    type="Line"
                    options={yearlyOutChartData.options}
                    listener={yearlyOutChartData.animation}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Funds In vs Funds Out This Year
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={multipleYearlyChart.data}
                    type="Bar"
                    options={multipleYearlyChart.options}
                    listener={multipleYearlyChart.animation}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="danger" icon>
                  <CardIcon color="danger">
                    <Timeline />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Total Funds In/Out Pie Chart
                  </h4>
                </CardHeader>
                <CardBody>
                  <ChartistGraph
                    data={pieChart.data}
                    type="Pie"
                    options={pieChart.options}
                  />
                </CardBody>
                <CardFooter stats className={classes.cardFooter}>
                  <h6 className={classes.legendTitle}>Legend</h6>
                  <i className={'fas fa-circle ' + classes.info} /> Total Funds
                  In{` `}
                  <i className={'fas fa-circle ' + classes.danger} /> Total
                  Funds Out
                  {` `}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )
    } else {
      return (
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            sizeUnit={'px'}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div>
      )
    }
  }
}

Charts.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.object,
  getFundsData: PropTypes.func.isRequired,
  funds: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  funds: state.funds
})

const enhance = compose(
  withStyles(chartsStyle),
  connect(
    mapStateToProps,
    { getFundsData }
  )
)

export default enhance(withRouter(Charts))

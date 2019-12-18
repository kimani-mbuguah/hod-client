import React from "react"
import PropTypes from "prop-types"
// react plugin for creating charts
import ChartistGraph from "react-chartist"
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap"
import moment from "moment"
import BigCalendar from "react-big-calendar"

//redux manenos
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import compose from "recompose/compose"
import { getMembersCount } from "../../actions/memberActions"
import { getFundsData } from "../../actions/fundsAction"

import SweetAlert from "react-bootstrap-sweetalert"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import Tooltip from "@material-ui/core/Tooltip"
import Icon from "@material-ui/core/Icon"

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store"
import Timeline from "@material-ui/icons/Timeline"
import AccountBalanceIcon from "@material-ui/icons/AccountBalance"

// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning"
import DateRange from "@material-ui/icons/DateRange"
import LocalOffer from "@material-ui/icons/LocalOffer"
import Update from "@material-ui/icons/Update"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import AccessTime from "@material-ui/icons/AccessTime"
import Refresh from "@material-ui/icons/Refresh"
import Edit from "@material-ui/icons/Edit"
import Place from "@material-ui/icons/Place"
import ArtTrack from "@material-ui/icons/ArtTrack"
import Language from "@material-ui/icons/Language"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Table from "components/Table/Table.jsx"
import Button from "components/CustomButtons/Button.jsx"
import Danger from "components/Typography/Danger.jsx"
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardIcon from "components/Card/CardIcon.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardFooter from "components/Card/CardFooter.jsx"

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle"
const events = []

var Chartist = require("chartist")
var delays = 80,
  durations = 500
var delays2 = 80,
  durations2 = 500

const localizer = BigCalendar.momentLocalizer(moment)

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      count: "",
      events: events
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }
  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/auth/login")
    }

    this.props.getMembersCount().then(res => {
      this.setState({ loaded: true, count: res.data.count })
    })

    this.props.getFundsData(this.props.history).then(() => {
      this.setState({ loaded: true })
    })
  }

  render() {
    const { classes } = this.props
    let weeklyInChartData, weeklyOutChartData, totalIn, totalOut

    if (this.state.loaded && this.props.funds.funds != null) {
      const { weeklyIn } = this.props.funds.funds
      const { weeklyOut } = this.props.funds.funds
      const { pieData } = this.props.funds.funds
      if (Object.keys(pieData).length > 0) {
        totalIn = Number(pieData.totalIn)
        totalOut = Number(pieData.totalOut)
      }
      if (weeklyIn.length > 0) {
        const weeklyInData = weeklyIn[0]

        weeklyInChartData = {
          data: {
            labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
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
            height: "300px"
          },
          animation: {
            draw: function(data) {
              if (data.type === "line" || data.type === "area") {
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
              } else if (data.type === "point") {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "ease"
                  }
                })
              }
            }
          }
        }
      } else {
        weeklyInChartData = {
          data: {
            labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
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
            height: "300px"
          },
          animation: {
            draw: function(data) {
              if (data.type === "line" || data.type === "area") {
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
              } else if (data.type === "point") {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "ease"
                  }
                })
              }
            }
          }
        }
      }

      if (weeklyOut.length > 0) {
        const weeklyOutData = weeklyOut[0]
        weeklyOutChartData = {
          data: {
            labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
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
            height: "300px"
          },
          animation: {
            draw: function(data) {
              if (data.type === "line" || data.type === "area") {
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
              } else if (data.type === "point") {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "ease"
                  }
                })
              }
            }
          }
        }
      } else {
        weeklyOutChartData = {
          data: {
            labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
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
            height: "300px"
          },
          animation: {
            draw: function(data) {
              if (data.type === "line" || data.type === "area") {
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
              } else if (data.type === "point") {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "ease"
                  }
                })
              }
            }
          }
        }
      }
    } else {
      weeklyOutChartData = {
        data: {
          labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
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
          height: "300px"
        },
        animation: {
          draw: function(data) {
            if (data.type === "line" || data.type === "area") {
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
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              })
            }
          }
        }
      }

      weeklyInChartData = {
        data: {
          labels: ["sun", "mon", "tue", "wed", "thur", "fri", "sat"],
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
          height: "300px"
        },
        animation: {
          draw: function(data) {
            if (data.type === "line" || data.type === "area") {
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
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease"
                }
              })
            }
          }
        }
      }
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>DB Space</p>
                <h3 className={classes.cardTitle}>
                  512 <small>MB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <div className={classes.stats}>
                    <DateRange />A few minutes ago
                  </div>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Members</p>
                <h3 className={classes.cardTitle}>
                  {this.props.member.count}{" "}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <AccountBalanceIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Funds In</p>
                <h3 className={classes.cardTitle}>{totalIn}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <AccountBalanceIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Funds Out</p>
                <h3 className={classes.cardTitle}>{totalOut}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info" icon>
                <CardIcon color="info">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>This Week's Funds In</h4>
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
              <CardHeader color="danger" icon>
                <CardIcon color="danger">
                  <Timeline />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  This Weekl's Funds Out
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
        </GridContainer>
        <h3>Calendar</h3>
        <br />
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody calendar>
                <BigCalendar
                  selectable
                  localizer={localizer}
                  events={this.state.events}
                  defaultView="month"
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getMembersCount: PropTypes.func.isRequired,
  getFundsData: PropTypes.func.isRequired,
  funds: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  funds: state.funds,
  member: state.member
})

const enhance = compose(
  withStyles(dashboardStyle),
  connect(
    mapStateToProps,
    { getMembersCount, getFundsData }
  )
)

export default enhance(withRouter(Dashboard))

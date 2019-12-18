import React from "react"
import PropTypes from "prop-types"
// react component for creating dynamic tables
import ReactTable from "react-table"

import Moment from "react-moment"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { css } from "@emotion/core"
import ClipLoader from "react-spinners/ClipLoader"
import { withRouter } from "react-router-dom"

import { getFundsList } from "../../actions/fundsAction"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment"
import Dvr from "@material-ui/icons/Dvr"
import Favorite from "@material-ui/icons/Favorite"
import Visibility from "@material-ui/icons/Visibility"
import Close from "@material-ui/icons/Close"
// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardIcon from "components/Card/CardIcon.jsx"
import CardHeader from "components/Card/CardHeader.jsx"

import { dataTable } from "variables/general.jsx"

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx"

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
}

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

class FundsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loading: true,
      members: [],
      fundsList: []
    }
  }

  async componentDidMount() {
    await this.props.getFundsList(this.props.history).then(() => {
      this.setState({ loaded: true })
    })
  }

  render() {
    const { classes } = this.props
    let fundsListData
    if (this.state.loaded) {
      const { fundsList } = this.props.fundsList
      if (fundsList != null && fundsList.length > 0) {
        fundsListData = fundsList.map((fund, key) => ({
          id: key,
          amount: `KSH ${fund.amount}`,
          type: fund.type,
          from: fund.from,
          purpose: fund.purpose,
          date: <Moment format="DD/MM/YYYY hh:mm">{fund.createdAt}</Moment>
        }))
      }

      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  House of Destiny Church Funds List View
                </h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={fundsListData}
                  filterable
                  columns={[
                    {
                      Header: "Amount",
                      accessor: "amount"
                    },
                    {
                      Header: "Type",
                      accessor: "type"
                    },
                    {
                      Header: "Money From",
                      accessor: "from"
                    },
                    {
                      Header: "Money For",
                      accessor: "purpose"
                    },
                    {
                      Header: "Date",
                      accessor: "date"
                    }
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )
    } else {
      return (
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      )
    }
  }
}

FundsList.propTypes = {
  classes: PropTypes.object,
  fundsList: PropTypes.object.isRequired,
  getFundsList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  fundsList: state.fundsList
})

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getFundsList }
  )
)

export default enhance(withRouter(FundsList))

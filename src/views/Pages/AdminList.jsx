import React from "react"
import PropTypes from "prop-types"
// react component for creating dynamic tables
import ReactTable from "react-table"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter } from "react-router-dom"
import { listAdmins } from "../../actions/adminAction"
import { listAdmin } from "../../actions/adminAction"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment"
import Dvr from "@material-ui/icons/Dvr"
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

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx"
import Admin from "layouts/Admin"

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
}

class AdminList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    await this.props.listAdmins()
    this.setState({ loaded: true })
  }

  render() {
    const { classes } = this.props
    const { admins } = this.props.admin
    if (admins != null && admins.length > 0) {
      let adminData = admins.map((admin, key) => ({
        id: key,
        name: admin.firstName + " " + admin.lastName,
        email: admin.email,
        active: admin.active.toString(),
        role: admin.role,
        actions: (
          <div className="actions-right">
            <Button
              justIcon
              round
              simple
              onClick={() => {
                this.props.listAdmin(admin.email, this.props.history)
              }}
              color="info"
              className="like"
            >
              <Visibility />
            </Button>{" "}
          </div>
        )
      }))

      return (
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  House of Destiny Church Members
                </h4>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={adminData}
                  filterable
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name"
                    },
                    {
                      Header: "Email",
                      accessor: "email"
                    },
                    {
                      Header: "Role",
                      accessor: "role"
                    },
                    {
                      Header: "Active",
                      accessor: "active"
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false
                    }
                  ]}
                  defaultPageSize={5}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )
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
                House of Destiny Church Members
              </h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: "Name",
                    accessor: "name"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Phone Number",
                    accessor: "phoneNumber"
                  },
                  {
                    Header: "Ministry",
                    accessor: "ministry"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={5}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

AdminList.propTypes = {
  classes: PropTypes.object,
  listAdmins: PropTypes.func.isRequired,
  listAdmin: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  admin: state.admin
})

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { listAdmins, listAdmin }
  )
)

export default enhance(withRouter(AdminList))

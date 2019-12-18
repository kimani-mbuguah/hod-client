import React from "react"
import PropTypes from "prop-types"
// react component for creating dynamic tables
import ReactTable from "react-table"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { css } from "@emotion/core"
import ClipLoader from "react-spinners/ClipLoader"
import { withRouter } from "react-router-dom"
import { listMembers } from "../../actions/memberActions"
import { listMember } from "../../actions/memberActions"

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

class MemberList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loading: true,
      members: []
    }
  }

  componentDidMount() {
    this.props.listMembers(this.props.history).then(() => {
      this.setState({ loaded: true })
      this.setState({ loading: false })
    })
  }

  render() {
    const { classes } = this.props
    const { members } = this.props.member
    if (members != null && members.length > 0) {
      let memberData = members.map((member, key) => ({
        id: key,
        name: member.fullName,
        email: member.email,
        phoneNumber: member.phoneNumber,
        ministry: member.ministry,
        actions: (
          <div className="actions-right">
            <Button
              justIcon
              round
              simple
              onClick={() => {
                this.props.listMember(member.email, this.props.history)
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
                  data={memberData}
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

MemberList.propTypes = {
  classes: PropTypes.object,
  listMembers: PropTypes.func.isRequired,
  listMember: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  member: state.member
})

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { listMembers, listMember }
  )
)

export default enhance(withRouter(MemberList))

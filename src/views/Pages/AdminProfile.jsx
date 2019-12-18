import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter, Redirect } from "react-router-dom"

import { postUpdateAuth } from "../../actions/adminAction"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputLabel from "@material-ui/core/InputLabel"
import AddAlert from "@material-ui/icons/AddAlert"

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Clearfix from "components/Clearfix/Clearfix.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardIcon from "components/Card/CardIcon.jsx"
import CardAvatar from "components/Card/CardAvatar.jsx"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Snackbar from "components/Snackbar/Snackbar.jsx"

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx"

import avatar from "assets/img/faces/marc.jpg"

class AdminProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      role: "",
      active: "",
      id: ""
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    if (this.props.admin.admin != null) {
      this.setState({ id: this.props.admin.admin.id })
    }
  }

  showNotification(place) {
    if (!this.state[place]) {
      var x = []
      x[place] = true
      this.setState(x)
      setTimeout(
        function() {
          x[place] = false
          this.setState(x)
        }.bind(this),
        6000
      )
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const adminAuthBody = {
      role: this.state.role,
      active: this.state.active,
      id: this.state.id
    }

    if (!this.state.role || !this.state.active || !this.state.id) {
      this.showNotification("bc")
    } else {
      this.props
        .postUpdateAuth(adminAuthBody, this.props.history)
        .then(response => {
          if (response.status === 200) {
            this.showNotification("tc")
          } else {
            this.showNotification("bc")
          }
        })
        .catch(() => {
          this.showNotification("bc")
        })
    }
  }

  render() {
    const { classes } = this.props
    const { admin } = this.props.admin
    if (admin != null) {
      return (
        <div>
          <GridContainer>
            <Snackbar
              place="tc"
              color="success"
              icon={AddAlert}
              message="Authorization edited successfully"
              open={this.state.tc}
              closeNotification={() => this.setState({ tc: false })}
              close
            />

            <Snackbar
              place="bc"
              color="danger"
              icon={AddAlert}
              message="Check the form for errors"
              open={this.state.bc}
              closeNotification={() => this.setState({ bc: false })}
              close
            />
            <GridItem xs={12} sm={12} md={12}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#" onClick={e => e.preventDefault()}>
                    <img src={admin.profilePic || avatar} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>
                    {admin.firstName} {admin.lastName}
                  </h6>
                  <h6 className={classes.cardCategory}>{admin.phoneNumber}</h6>
                  <h4 className={classes.cardTitle}>{admin.email}</h4>
                  <h4 className={classes.cardTitle}>{admin.role}</h4>
                  <p className={classes.description}>{admin.about}</p>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardBody profile>
                  <h4 className={classes.cardTitleWhite}>Ministry</h4>
                  <h4 className={classes.cardCategory}>{admin.ministry}</h4>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardBody profile>
                  <h4 className={classes.cardTitleWhite}>Occupation</h4>
                  <h4 className={classes.cardCategory}>{admin.occupation}</h4>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardBody profile>
                  <h4 className={classes.cardTitleWhite}>Location</h4>
                  <h4 className={classes.cardCategory}>
                    {admin.county}
                    {"/"}
                    {admin.city}
                  </h4>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Edit Admin Authorization
                  </h4>
                </CardHeader>
                <form onSubmit={this.onSubmit}>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={5} lg={5}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                          >
                            Role
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.role}
                            onChange={this.handleSimple}
                            inputProps={{
                              name: "role",
                              id: "simple-select"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Role
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Admin"
                            >
                              Admin
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="SuperAdmin"
                            >
                              SuperAdmin
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={5} lg={5}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                          >
                            Status
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.active}
                            onChange={this.handleSimple}
                            inputProps={{
                              name: "active",
                              id: "simple-select"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="true"
                            >
                              Active
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="false"
                            >
                              Inactive
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <br />
                    <Button
                      color="rose"
                      type="submit"
                      className={classes.updateProfileButton}
                      round
                    >
                      Update
                    </Button>
                    <Clearfix />
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )
    } else {
      return <Redirect to="/admin/admin-list" />
    }
  }
}

AdminProfile.propTypes = {
  classes: PropTypes.object,
  admin: PropTypes.object,
  postUpdateAuth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  admin: state.admin
})

const enhance = compose(
  withStyles(userProfileStyles),
  connect(
    mapStateToProps,
    { postUpdateAuth }
  )
)

export default enhance(withRouter(AdminProfile))

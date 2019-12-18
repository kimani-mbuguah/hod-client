import React from "react"
import PropTypes from "prop-types"
// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter } from "react-router-dom"
import { registerMember } from "../../actions/memberActions"

import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity"
import AddAlert from "@material-ui/icons/AddAlert"

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
import Snackbar from "components/Snackbar/Snackbar.jsx"

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx"

import avatar from "assets/img/faces/marc.jpg"
import { classExpression } from "@babel/types"

const styles = {
  width: "100%",
  height: "39px"
}

class RegisterMember extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      occupation: "",
      ministry: "",
      city: "",
      county: "",
      postalCode: "",
      about: "",
      errors: {},
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    }
    this.preStyle = {
      display: "block"
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSimple = this.handleSimple.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleOnChange = value => {
    this.setState({ phoneNumber: value })
  }

  async onSubmit(e) {
    e.preventDefault()
    const newMember = {
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber.replace(/\s/g, ""),
      email: this.state.email,
      occupation: this.state.occupation,
      city: this.state.city,
      county: this.state.county,
      about: this.state.about,
      ministry: this.state.ministry
    }

    await this.props
      .registerMember(newMember, this.props.history)
      .then(response => {
        if (response.status == 200) {
          this.setState({
            fullName: "",
            phoneNumber: "",
            email: "",
            occupation: "",
            ministry: "",
            city: "",
            county: "",
            postalCode: "",
            about: ""
          })
          this.showNotification("tc")
        } else if (response.status == 400) {
          this.showNotification("bc")
        }
      })
      .catch(error => {
        this.showNotification("bc")
      })
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

  render() {
    const { classes } = this.props
    const { errors } = this.props

    let errorOutput = ""
    for (let property in errors) {
      errorOutput += property + ": " + errors[property] + "; "
    }

    return (
      <div>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <Snackbar
                place="tc"
                color="success"
                icon={AddAlert}
                message="Registration successfull"
                open={this.state.tc}
                closeNotification={() => this.setState({ tc: false })}
                close
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <Snackbar
                place="bc"
                color="danger"
                icon={AddAlert}
                message={errorOutput}
                open={this.state.bc}
                closeNotification={() => this.setState({ bc: false })}
                close
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>
                    Member Registration -{" "}
                    <small>
                      Fill in member details to create their profile
                    </small>
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Full Name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "fullName",
                          value: this.state.fullName,
                          onChange: this.onChange,
                          required: true,
                          error: errors.isFullNameError
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <br></br>
                      <PhoneInput
                        country={"ke"}
                        value={this.state.phoneNumber}
                        onChange={this.handleOnChange}
                        inputStyle={styles}
                        containerStyle={{ marginBottom: "3%" }}
                        inputExtraProps={{
                          required: true
                        }}
                      />

                      {/* <CustomInput
                        labelText="Phone Number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "phoneNumber",
                          value: this.state.phoneNumber,
                          onChange: this.onChange,
                          error: errors.isPhoneNumberError
                        }}
                      /> */}
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "email",
                          value: this.state.email,
                          onChange: this.onChange,
                          error: errors.isEmailError
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Occupation"
                        id="occupation"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "occupation",
                          value: this.state.occupation,
                          onChange: this.onChange,
                          error: errors.isOccupationError,
                          disabled: false
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <InputLabel
                          htmlFor="simple-select"
                          className={classes.selectLabel}
                        >
                          Choose Ministry
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={this.state.ministry}
                          onChange={this.handleSimple}
                          inputProps={{
                            name: "ministry",
                            id: "ministry",
                            error: errors.isMinistryError
                          }}
                        >
                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Choose Ministry
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="men"
                          >
                            Men
                          </MenuItem>

                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="women"
                          >
                            Women
                          </MenuItem>

                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="youth"
                          >
                            Youth
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "city",
                          value: this.state.city,
                          onChange: this.onChange,
                          error: errors.isCityError
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="County"
                        id="county"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "county",
                          value: this.state.county,
                          onChange: this.onChange,
                          error: errors.isCountyError
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>
                        About Member
                      </InputLabel>
                      <CustomInput
                        labelText="Please give a brief description of this member"
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "about",
                          value: this.state.about,
                          onChange: this.onChange,
                          error: errors.isAboutError,
                          multiline: true,
                          rows: 5
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <Button
                    color="rose"
                    className={classes.updateProfileButton}
                    type="submit"
                  >
                    Register Member
                  </Button>
                  <Clearfix />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    )
  }
}

RegisterMember.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.object,
  registerMember: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

const enhance = compose(
  withStyles(userProfileStyles),
  connect(
    mapStateToProps,
    { registerMember }
  )
)

export default enhance(withRouter(RegisterMember))

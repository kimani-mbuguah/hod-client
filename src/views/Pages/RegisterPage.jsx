import React from "react"
import PropTypes from "prop-types"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { registerUser } from "../../actions/authActions"
import { withRouter } from "react-router-dom"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Icon from "@material-ui/core/Icon"

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline"
import Code from "@material-ui/icons/Code"
import Group from "@material-ui/icons/Group"
import Face from "@material-ui/icons/Face"
import Email from "@material-ui/icons/Email"
import Call from "@material-ui/icons/Call"
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check"
import AddAlert from "@material-ui/icons/AddAlert"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Button from "components/CustomButtons/Button.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import InfoArea from "components/InfoArea/InfoArea.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import Snackbar from "components/Snackbar/Snackbar.jsx"

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle"

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
      checked: [],
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleToggle(value) {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmit(e) {
    e.preventDefault()
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    await this.props
      .registerUser(newUser, this.props.history)
      .then(response => {
        if (response.status != 200) {
          this.showNotification("bc")
        }
      })
      .catch(error => {
        this.showNotification("bc")
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("admin/dashboard")
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

  render() {
    const { classes } = this.props
    const { errors } = this.props
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
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
              message="Check your form for errors and make sure you have an active internet connection"
              open={this.state.bc}
              closeNotification={() => this.setState({ bc: false })}
              close
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} md={8}>
                    <div className={classes.center}>
                      <Button justIcon round color="twitter">
                        <i className="fab fa-twitter" />
                      </Button>
                      {` `}
                      <Button justIcon round color="dribbble">
                        <i className="fab fa-dribbble" />
                      </Button>
                      {` `}
                      <Button justIcon round color="facebook">
                        <i className="fab fa-facebook-f" />
                      </Button>
                      {` `}
                      <h4 className={classes.socialTitle}>or be classical</h4>
                    </div>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "First Name...",
                          name: "firstName",
                          value: this.state.firstName,
                          onChange: this.onChange,
                          error: errors.isFirstNameError
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          placeholder: "Last Name...",
                          name: "lastName",
                          value: this.state.lastName,
                          onChange: this.onChange,
                          error: errors.isLastNameError
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          type: "email",
                          placeholder: "Email...",
                          name: "email",
                          value: this.state.email,
                          onChange: this.onChange,
                          error: errors.isEmailError
                        }}
                      />
                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          type: "password",
                          placeholder: "Password...",
                          name: "password",
                          value: this.state.password,
                          onChange: this.onChange,
                          error: errors.isPasswordError
                        }}
                      />

                      <CustomInput
                        formControlProps={{
                          fullWidth: true,
                          className: classes.customFormControlClasses
                        }}
                        inputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.inputAdornmentIcon}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          type: "password",
                          placeholder: "Confirm Password...",
                          name: "confirmPassword",
                          value: this.state.confirmPassword,
                          onChange: this.onChange,
                          error: errors.isConfirmPasswordError
                        }}
                      />
                      <FormControlLabel
                        classes={{
                          root: classes.checkboxLabelControl,
                          label: classes.checkboxLabel
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        label={
                          <span>
                            I agree to the <a href="#">terms and conditions</a>.
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        <Button round color="primary" type="submit">
                          Get started
                        </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const enhance = compose(
  withStyles(registerPageStyle),
  connect(
    mapStateToProps,
    { registerUser }
  )
)

export default enhance(withRouter(RegisterPage))

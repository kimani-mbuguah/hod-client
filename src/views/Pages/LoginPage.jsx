import React from "react"
import PropTypes from "prop-types"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { loginUser } from "../../actions/authActions"
import { withRouter } from "react-router-dom"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Icon from "@material-ui/core/Icon"

// @material-ui/icons
import Email from "@material-ui/icons/Email"
import AddAlert from "@material-ui/icons/AddAlert"
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Button from "components/CustomButtons/Button.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import Snackbar from "components/Snackbar/Snackbar.jsx"

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx"

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      password: "",
      errors: {},
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction)
    this.timeOutFunction = null
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard")
    }
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" })
      }.bind(this),
      700
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard")
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props
      .loginUser(userData)
      .then(response => {
        if (response.status == 400) {
          this.showNotification("bc")
        }
      })
      .catch(error => {
        this.showNotification("br")
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

  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRex.test(value)) {
      return true
    }
    return false
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true
    }
    return false
  }

  render() {
    const { classes } = this.props
    const { errors } = this.state
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.onSubmit}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                  <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus"
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      )
                    })}
                  </div>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      type: "email",
                      name: "email",
                      value: this.state.email,
                      onChange: this.onChange,
                      error: errors.isEmailError
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      type: "password",
                      autoComplete: "off",
                      name: "password",
                      value: this.state.password,
                      onChange: this.onChange,
                      error: errors.isPasswordError
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button color="rose" simple size="lg" block type="submit">
                    Let{"'"}s Go
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
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
            color="warning"
            icon={AddAlert}
            message={"Check the form for errors"}
            open={this.state.bc}
            closeNotification={() => this.setState({ bc: false })}
            close
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={3}>
          <Snackbar
            place="br"
            color="danger"
            icon={AddAlert}
            message={"Please check your internet connection and try again"}
            open={this.state.br}
            closeNotification={() => this.setState({ bc: false })}
            close
          />
        </GridItem>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const enhance = compose(
  withStyles(loginPageStyle),
  connect(
    mapStateToProps,
    { loginUser }
  )
)

export default enhance(withRouter(LoginPage))

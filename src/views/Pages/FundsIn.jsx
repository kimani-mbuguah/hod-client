import React from "react"
import PropTypes from "prop-types"

//redux manenos
import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter } from "react-router-dom"
import { postFundsIn } from "../../actions/fundsAction"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import FormLabel from "@material-ui/core/FormLabel"

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline"
import Contacts from "@material-ui/icons/Contacts"
import Check from "@material-ui/icons/Check"
import Close from "@material-ui/icons/Close"
import AddAlert from "@material-ui/icons/AddAlert"

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Button from "components/CustomButtons/Button.jsx"
import Card from "components/Card/Card.jsx"
import CardHeader from "components/Card/CardHeader.jsx"
import CardText from "components/Card/CardText.jsx"
import CardIcon from "components/Card/CardIcon.jsx"
import CardBody from "components/Card/CardBody.jsx"
import CardFooter from "components/Card/CardFooter.jsx"
import Snackbar from "components/Snackbar/Snackbar.jsx"

// style for this view
import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx"

class FundsIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: "",
      from: "",
      purpose: "",
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmit(e) {
    e.preventDefault()
    const fundsInData = {
      amount: this.state.amount,
      from: this.state.from,
      purpose: this.state.purpose,
      type: "in"
    }

    await this.props
      .postFundsIn(fundsInData, this.props.history)
      .then(response => {
        if (response.status == 200) {
          this.setState({
            amount: "",
            from: "",
            purpose: "",
            type: ""
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
    return (
      <GridContainer>
        <Snackbar
          place="tc"
          color="success"
          icon={AddAlert}
          message="Funds recorded successfully"
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
          <form onSubmit={this.onSubmit}>
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>Funds In</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Amount
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      labelText="Amount"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "amount",
                        value: this.state.amount,
                        onChange: this.onChange,
                        error: errors.isAmountError
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelLeftHorizontal}>
                      <code>Amout</code>
                    </FormLabel>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      From
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      labelText="Funds from"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "from",
                        value: this.state.from,
                        onChange: this.onChange,
                        error: errors.isFromError
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelLeftHorizontal}>
                      <code>required</code>
                    </FormLabel>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel className={classes.labelHorizontal}>
                      Purpose
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={7}>
                    <CustomInput
                      labelText="Funds Purpose"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "purpose",
                        value: this.state.purpose,
                        onChange: this.onChange,
                        error: errors.isPurposeError
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelLeftHorizontal}>
                      <code>required</code>
                    </FormLabel>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" type="submit">
                  Submit Funds
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    )
  }
}

FundsIn.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.object,
  postFundsIn: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

const enhance = compose(
  withStyles(validationFormsStyle),
  connect(
    mapStateToProps,
    { postFundsIn }
  )
)

export default enhance(withRouter(FundsIn))

import React from 'react'
import PropTypes from 'prop-types'

import { sendCustomGroupSms } from '../../actions/memberActions'
import { getCustomGroups } from '../../actions/memberActions'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert'
import AvTimer from '@material-ui/icons/AvTimer'

// core components
import Button from 'components/CustomButtons/Button.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Snackbar from 'components/Snackbar/Snackbar.jsx'

import extendedFormsStyle from 'assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx'

class CustomGroupSms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      simpleSelect: '',
      sms: '',
      smsGroups: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSimple = this.handleSimple.bind(this)
  }

  componentDidMount() {
    this.props.getCustomGroups(this.props.history).then(response => {
      if (response.status == 200) {
        this.setState({ smsGroups: response.data })
      }
    })
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async onSubmit(e) {
    e.preventDefault()
    const sms = {
      group: this.state.simpleSelect,
      message: this.state.sms
    }

    if (!this.state.simpleSelect || !this.state.sms) {
      this.showNotification('tl')
    } else {
      console.log(sms)
      this.props.sendCustomGroupSms(sms, this.props.history).then(response => {
        if (response.status == 200) {
          this.showNotification('tr')
        }
      })
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
    const smsGroups = this.state.smsGroups
    let groupsSelect

    if (smsGroups && smsGroups.length > 0) {
      groupsSelect = smsGroups.map((group, index) => (
        <MenuItem
          key={index}
          classes={{
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected
          }}
          value={group.name}
        >
          {group.name}
        </MenuItem>
      ))
    }

    return (
      <div>
        <GridContainer>
          <Snackbar
            place="tr"
            color="success"
            icon={AddAlert}
            message="Sending Messages to the selected members..."
            open={this.state.tr}
            closeNotification={() => this.setState({ tr: false })}
            close
          />
          <Snackbar
            place="tl"
            color="danger"
            icon={AddAlert}
            message="Check the form for errors"
            open={this.state.tl}
            closeNotification={() => this.setState({ tl: false })}
            close
          />
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <br />
                <br />
                <form onSubmit={this.onSubmit}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <legend>Group SMS</legend>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12} lg={12}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Choose Group To Send To
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              value={this.state.simpleSelect}
                              onChange={this.handleSimple}
                              inputProps={{
                                name: 'simpleSelect',
                                id: 'simple-select'
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem
                                }}
                              >
                                Choose Group
                              </MenuItem>

                              {groupsSelect}
                            </Select>
                          </FormControl>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <InputLabel style={{ color: '#AAAAAA' }}>
                            Message
                          </InputLabel>
                          <CustomInput
                            id="sms"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              name: 'sms',
                              multiline: true,
                              rows: 5,
                              value: this.state.sms,
                              onChange: this.onChange
                            }}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <div className={classes.center}>
                            <Button color="rose" type="submit">
                              SEND
                            </Button>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

CustomGroupSms.propTypes = {
  classes: PropTypes.object,
  sendCustomGroupSms: PropTypes.func.isRequired,
  getCustomGroups: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ...state
})

const enhance = compose(
  withStyles(extendedFormsStyle),

  connect(
    mapStateToProps,
    { sendCustomGroupSms, getCustomGroups }
  )
)

export default enhance(withRouter(CustomGroupSms))

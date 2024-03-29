import React from 'react'
import PropTypes from 'prop-types'

import SelectSearch from 'react-select-search'
import TagsInput from 'react-tagsinput'

//redux manenos
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { withRouter } from 'react-router-dom'
import { listSmsMembers } from '../../actions/memberActions'
import { createCustomGroup } from '../../actions/memberActions'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert'
import Chat from '@material-ui/icons/Chat'
import InputLabel from '@material-ui/core/InputLabel'

// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Snackbar from 'components/Snackbar/Snackbar.jsx'
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx'

import './style.css'

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
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

class CreateSmsGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loading: true,
      smsList: [],
      selectedMembers: [],
      contact: '',
      name: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSelectChange(e) {
    this.setState({
      selectedMembers: [...this.state.selectedMembers, e.value]
    })
  }

  async onSubmit(e) {
    e.preventDefault()

    const groupDetails = {
      members: this.state.selectedMembers,
      name: this.state.name
    }

    if (!this.state.selectedMembers || !this.state.name) {
      this.showNotification('tl')
    } else {
      await this.props
        .createCustomGroup(groupDetails, this.props.history)
        .then(response => {
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

  async componentDidMount() {
    await this.props.listSmsMembers(this.props.history).then(() => {
      this.setState({ loaded: true })
      this.setState({ loading: false })
    })
  }

  render() {
    const { classes } = this.props

    const { smslist } = this.props.member

    if (smslist != null && smslist.length > 0) {
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Snackbar
              place="tr"
              color="success"
              icon={AddAlert}
              message="Creating group..."
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

            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Chat />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Create SMS Group</h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: '#AAAAAA' }}>
                        Group Name
                      </InputLabel>
                      <CustomInput
                        id="sms"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: 'name',
                          value: this.state.sms,
                          isRequired: true,
                          onChange: this.onChange
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <legend>Select Members</legend>
                      <SelectSearch
                        name="contact"
                        mode="input"
                        value={this.state.contact}
                        options={smslist}
                        placeholder="Select Members"
                        onChange={this.onSelectChange}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                      <legend>Selected Members</legend>
                      <TagsInput
                        value={this.state.selectedMembers}
                        tagProps={{ className: 'react-tagsinput-tag info' }}
                      />
                    </GridItem>
                  </GridContainer>

                  <div className={classes.center}>
                    <Button color="rose" type="submit">
                      Create
                    </Button>
                  </div>
                </form>
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
          sizeUnit={'px'}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

CreateSmsGroup.propTypes = {
  classes: PropTypes.object,
  createCustomGroup: PropTypes.func.isRequired,
  listSmsMembers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  member: state.member
})

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { listSmsMembers, createCustomGroup }
  )
)

export default enhance(withRouter(CreateSmsGroup))

import React from 'react'
import PropTypes from 'prop-types'
// react component for creating dynamic tables
import ReactTable from 'react-table'

import SelectSearch from 'react-select-search'

//redux manenos
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { withRouter } from 'react-router-dom'
import { listRelationshipMembers } from '../../actions/memberActions'
import { postRelationship } from '../../actions/memberActions'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// @material-ui/icons
import AddAlert from '@material-ui/icons/AddAlert'
import FormControl from '@material-ui/core/FormControl'

import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

// core components
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
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

class MemberList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      relationshipList: [],
      member: '',
      relatedTo: '',
      relationship: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onSelectRelatedToChange = this.onSelectRelatedToChange.bind(this)
    this.handleSimple = this.handleSimple.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSelectChange(e) {
    this.setState({ ['member']: e.value })
  }

  onSelectRelatedToChange(e) {
    this.setState({ ['relatedTo']: e.value })
  }

  async onSubmit(e) {
    e.preventDefault()

    const relationshipBody = {
      member: this.state.member,
      relatedTo: this.state.relatedTo,
      relationship: this.state.relationship
    }

    if (
      !this.state.member ||
      !this.state.relatedTo ||
      !this.state.relationship
    ) {
      this.showNotification('tl')
    } else {
      await this.props
        .postRelationship(relationshipBody, this.props.history)
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
    await this.props.listRelationshipMembers(this.props.history).then(() => {
      this.setState({ loaded: true })
    })
  }

  render() {
    const { classes } = this.props

    const { relationshipList } = this.props.member

    if (relationshipList != null && relationshipList.length > 0) {
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Snackbar
              place="tr"
              color="success"
              icon={AddAlert}
              message="Relationship added successfully"
              open={this.state.tr}
              closeNotification={() => this.setState({ tl: false })}
              close
            />

            <Snackbar
              place="tl"
              color="danger"
              icon={PersonAddIcon}
              message="Please Check The Form For Errors"
              open={this.state.tl}
              closeNotification={() => this.setState({ tl: false })}
              close
            />

            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PersonAddIcon />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Add Relationship</h4>
              </CardHeader>
              <CardBody>
                <form onSubmit={this.onSubmit}>
                  <GridItem xs={12} sm={12} md={12}>
                    <SelectSearch
                      name="member"
                      mode="input"
                      value={this.state.member}
                      options={relationshipList}
                      placeholder="Select Member"
                      onChange={this.onSelectChange}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <SelectSearch
                      name="relatedTo"
                      mode="input"
                      value={this.state.relatedTo}
                      options={relationshipList}
                      placeholder="Related To"
                      onChange={this.onSelectRelatedToChange}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="simple-select"
                        className={classes.selectLabel}
                      >
                        Choose Relationship
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={this.state.relationship}
                        onChange={this.handleSimple}
                        inputProps={{
                          name: 'relationship',
                          id: 'simple-relationship'
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Relationship
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="husband"
                        >
                          Husband
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="wife"
                        >
                          Wife
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="daughter"
                        >
                          Daughter
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="son"
                        >
                          Son
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="other"
                        >
                          Other
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <br></br>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.center}>
                      <Button color="rose" type="submit">
                        ADD
                      </Button>
                    </div>
                  </GridItem>
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

MemberList.propTypes = {
  classes: PropTypes.object,
  postRelationship: PropTypes.func.isRequired,
  listRelationshipMembers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  member: state.member
})

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { listRelationshipMembers, postRelationship }
  )
)

export default enhance(withRouter(MemberList))

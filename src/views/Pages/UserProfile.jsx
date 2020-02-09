import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withRouter } from 'react-router-dom'
import { css } from '@emotion/core'

import { getActiveUser } from '../../actions/adminAction'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// core components
import Button from 'components/CustomButtons/Button.jsx'
import ClipLoader from 'react-spinners/BounceLoader'
import GridContainer from 'components/Grid/GridContainer.jsx'
import GridItem from 'components/Grid/GridItem.jsx'
import Card from 'components/Card/Card.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardAvatar from 'components/Card/CardAvatar.jsx'

import userProfileStyles from 'assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx'

import avatar from 'assets/img/faces/marc.jpg'
import { cardTitle } from 'assets/jss/material-dashboard-pro-react.jsx'

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

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      activeUser: {},
      image: null
    }
  }

  componentDidMount() {
    this.props
      .getActiveUser(this.props.auth.user.email, this.props.history)
      .then(response => {
        this.setState({ activeUser: response.data.user, loaded: true })
      })
  }

  render() {
    const { classes } = this.props
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    )

    if (this.state.loaded) {
      const user = this.state.activeUser
      const userName = user.firstName + ' ' + user.lastName
      return (
        <div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.profile}>
                <div>
                  <img
                    src={this.state.profilePic || this.state.url || avatar}
                    alt="..."
                    className={imageClasses}
                  />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>{userName}</h3>
                  <h6>{user.phoneNumber}</h6>
                  <h6>{user.email}</h6>
                  <Button justIcon link className={classes.margin5}>
                    <i className={'fab fa-twitter'} />
                  </Button>
                  <Button justIcon link className={classes.margin5}>
                    <i className={'fab fa-instagram'} />
                  </Button>
                  <Button justIcon link className={classes.margin5}>
                    <i className={'fab fa-facebook'} />
                  </Button>
                </div>
              </div>
            </GridItem>
          </GridContainer>

          <div className={classes.description}>
            <p>{user.about}</p>
          </div>

          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardBody profile>
                  <h4 className={classes.cardTitleWhite}>Ministry</h4>
                  <h4 className={classes.cardCategory}>{user.ministry}</h4>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardBody profile>
                  <h4 className={classes.cardTitleWhite}>Occupation</h4>
                  <h4 className={classes.cardCategory}>{user.occupation}</h4>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Card profile>
                <CardBody profile>
                  <h4 className={classes.cardTitleWhite}>Location</h4>
                  <h4 className={classes.cardCategory}>
                    {user.county}
                    {'/'}
                    {user.city}
                  </h4>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )
    } else {
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
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  getActiveUser: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin
})

const enhance = compose(
  withStyles(userProfileStyles),
  connect(
    mapStateToProps,
    { getActiveUser }
  )
)

export default enhance(withRouter(UserProfile))

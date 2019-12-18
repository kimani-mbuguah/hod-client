import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter } from "react-router-dom"
import { updateProfile } from "../../actions/authActions"
import { postUpdateProfilePic } from "../../actions/authActions"
import { getActiveUser } from "../../actions/adminAction"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputLabel from "@material-ui/core/InputLabel"

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity"
import AddAlert from "@material-ui/icons/AddAlert"

//Firebase
import storage from "../../components/Firebase/index"

import ClipLoader from "react-spinners/BounceLoader"
import { css } from "@emotion/core"

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
import Snackbar from "components/Snackbar/Snackbar.jsx"

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx"

import avatar from "assets/img/faces/marc.jpg"
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      phoneNumber: "",
      occupation: "",
      ministry: "",
      city: "",
      county: "",
      about: "",
      url: "",
      progress: 0,
      id: "",
      errors: {},
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      loaded: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    this.props
      .getActiveUser(this.props.auth.user.email, this.props.history)
      .then(response => {
        this.setState({
          loaded: true,
          email: response.data.user.email,
          phoneNumber: response.data.user.phoneNumber,
          occupation: response.data.user.occupation,
          ministry: response.data.user.ministry,
          city: response.data.user.city,
          county: response.data.user.county,
          about: response.data.user.about
        })
      })
  }

  async onSubmit(e) {
    e.preventDefault()
    const updatedProfile = {
      phoneNumber: this.state.phoneNumber,
      email: this.props.auth.user.email,
      occupation: this.state.occupation,
      city: this.state.city,
      county: this.state.county,
      about: this.state.about,
      ministry: this.state.ministry
    }

    await this.props.updateProfile(updatedProfile, this.props.history)
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

  handleImageChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0]

      this.setState(() => ({ image }))
    }
  }

  handleUpload = () => {
    const { image } = this.state
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        this.setState({ progress })
      },
      error => {
        // Error function ...
        console.log(error)
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url })

            this.props
              .postUpdateProfilePic(
                { id: this.props.auth.user.sub, profilePic: this.state.url },
                this.props.history
              )
              .then(response => {
                this.setState({ message: response.data.message })

                this.showNotification("tl")
              })
          })
      }
    )
  }

  render() {
    const { classes } = this.props
    const { errors } = this.props

    if (this.state.loaded) {
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <Snackbar
                place="tl"
                color="success"
                icon={AddAlert}
                message={this.state.message}
                open={this.state.tl}
                closeNotification={() => this.setState({ tc: false })}
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
                    Edit Profile Picture
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: this.handleImageChange,
                          type: "file"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <progress
                        value={this.state.progress}
                        max="100"
                        className="progress"
                      />
                    </GridItem>

                    <GridItem>
                      <Button
                        color="rose"
                        className={classes.updateProfileButton}
                        onClick={this.handleUpload}
                      >
                        Upload
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                      <PermIdentity />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                      Edit Profile -{" "}
                      <small>
                        Fill in the necessary fields to edit your profile
                      </small>
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Phone Number"
                          id="phone-number"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "phoneNumber",
                            value: this.state.phoneNumber,
                            onChange: this.onChange,
                            error: errors.phoneNumber
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
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
                            error: errors.occupation
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="City/Town"
                          id="city"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "city",
                            value: this.state.city,
                            onChange: this.onChange,
                            error: errors.city
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
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
                            error: errors.county
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Ministry"
                          id="ministry"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "ministry",
                            value: this.state.ministry,
                            onChange: this.onChange,
                            error: errors.ministry
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <InputLabel style={{ color: "#AAAAAA" }}>
                          About Me
                        </InputLabel>
                        <CustomInput
                          labelText="Please give a brief description of yourself"
                          id="about-me"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "about",
                            value: this.state.about,
                            onChange: this.onChange,
                            error: errors.about,
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
                      Update Profile
                    </Button>
                    <Clearfix />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </form>
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
        </div>
      )
    } else {
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
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  errors: PropTypes.object,
  updateProfile: PropTypes.func.isRequired,
  postUpdateProfilePic: PropTypes.func.isRequired,
  getActiveUser: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

const enhance = compose(
  withStyles(userProfileStyles),
  connect(
    mapStateToProps,
    { updateProfile, postUpdateProfilePic, getActiveUser }
  )
)

export default enhance(withRouter(UserProfile))

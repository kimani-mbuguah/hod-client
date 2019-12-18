import React from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter, Redirect } from "react-router-dom"

import { postUpdateProfile } from "../../actions/memberActions"

import { postUpdateProfilePic } from "../../actions/memberActions"

//Firebase
import storage from "../../components/Firebase/index"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputLabel from "@material-ui/core/InputLabel"

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity"
import Assignment from "@material-ui/icons/Assignment"

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
import CardText from "components/Card/CardText.jsx"
import ImageUpload from "components/CustomUpload/ImageUpload.jsx"
import Select from "@material-ui/core/Select"
import FormControl from "@material-ui/core/FormControl"
import MenuItem from "@material-ui/core/MenuItem"
import Table from "components/Table/Table.jsx"

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx"

import avatar from "assets/img/faces/avatar1.jpg"

class MemberProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      fullName: "",
      phoneNumber: "",
      email: "",
      occupation: "",
      ministry: "",
      city: "",
      county: "",
      about: "",
      maritalStatus: "",
      leadershipPosition: "",
      parentalStatus: "",
      gender: "",
      relationships: [],
      image: null,
      url: "",
      progress: 0,
      id: ""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.member.member != null) {
      this.setState({
        phoneNumber: this.props.member.member.phoneNumber,
        fullName: this.props.member.member.fullName,
        email: this.props.member.member.email,
        occupation: this.props.member.member.occupation,
        ministry: this.props.member.member.ministry,
        city: this.props.member.member.city,
        county: this.props.member.member.county,
        about: this.props.member.member.about,
        gender: this.props.member.member.gender,
        maritalStatus: this.props.member.member.maritalStatus,
        parentalStatus: this.props.member.member.parentalStatus,
        leadershipPosition: this.props.member.member.leadershipPosition,
        profilePic: this.props.member.member.profilePic,
        id: this.props.member.member._id
      })
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
                { id: this.state.id, profilePic: this.state.url },
                this.props.history
              )
              .then(response => {})
          })
      }
    )
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const newMember = {
      id: this.state.id,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      occupation: this.state.occupation,
      city: this.state.city,
      county: this.state.county,
      about: this.state.about,
      ministry: this.state.ministry,
      gender: this.state.gender,
      maritalStatus: this.state.maritalStatus,
      parentalStatus: this.state.parentalStatus,
      leadershipPosition: this.state.leadershipPosition
    }

    this.props
      .postUpdateProfile(newMember, this.props.history)
      .then(response => {
        //alert
      })
  }

  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }
  handleTags = regularTags => {
    this.setState({ tags: regularTags })
  }

  render() {
    const { classes } = this.props
    const { errors } = this.props
    const { member } = this.props.member

    if (member != null) {
      const relationshipsData = member.relationships
      let relationshipTableData = []

      for (let i in relationshipsData) {
        relationshipTableData.push([
          relationshipsData[i].fullName,
          relationshipsData[i].relationship
        ])
      }
      return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card profile>
                <CardAvatar profile>
                  <img
                    src={this.state.profilePic || this.state.url || avatar}
                    alt="..."
                  />
                </CardAvatar>
                <CardBody profile>
                  <h3 className={classes.cardTitle}>{member.fullName}</h3>
                  <h5 className={classes.cardCategory}>{member.phoneNumber}</h5>
                  <h6 className={classes.cardCategory}>{member.email}</h6>
                  <p className={classes.description}>{member.about}</p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
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

          <GridContainer>
            <GridItem xs={12}>
              <Card>
                <CardHeader color="rose" icon>
                  <CardIcon color="rose">
                    <Assignment />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>Relationships</h4>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Relationship"]}
                    tableData={relationshipTableData}
                    coloredColls={[3]}
                    colorsColls={["primary"]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          <GridContainer>
            <GridItem xs={12}>
              <form className={classes.form} onSubmit={this.onSubmit}>
                <Card>
                  <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                      <PermIdentity />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                      Edit Profile -{" "}
                      <small>
                        Change the values of the form and hit update profile to
                        edit member profile
                      </small>
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Full Name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "fullName",
                            value: this.state.fullName,
                            onChange: this.onChange,
                            error: errors.fullName
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Phone Number"
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
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Email Address"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            name: "email",
                            value: this.state.email,
                            onChange: this.onChange,
                            error: errors.email
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="select-gender"
                            className={classes.selectLabel}
                          >
                            Choose Gender
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.gender}
                            onChange={this.handleSimple}
                            inputProps={{
                              name: "gender",
                              id: "gender"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Gender
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="male"
                            >
                              Male
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="female"
                            >
                              Female
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="select-marital-status"
                            className={classes.selectLabel}
                          >
                            Choose Marital Status
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.maritalStatus}
                            onChange={this.handleSimple}
                            inputProps={{
                              name: "maritalStatus",
                              id: "maritalStatus"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Marital Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="single"
                            >
                              Single
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="married"
                            >
                              Married
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Occupation"
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
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="County of Residence"
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
                          labelText="Place of Residence"
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
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="select-parental-status"
                            className={classes.selectLabel}
                          >
                            Choose Parental Status
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.parentalStatus}
                            onChange={this.handleSimple}
                            inputProps={{
                              name: "parentalStatus",
                              id: "parentalStatus"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Parental Status
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="isParent"
                            >
                              Parent
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="isNotParent"
                            >
                              Not Parent
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          fullWidth
                          className={classes.selectFormControl}
                        >
                          <InputLabel
                            htmlFor="select-position"
                            className={classes.selectLabel}
                          >
                            Choose Leadership Position
                          </InputLabel>
                          <Select
                            MenuProps={{
                              className: classes.selectMenu
                            }}
                            classes={{
                              select: classes.select
                            }}
                            value={this.state.leadershipPosition}
                            onChange={this.handleSimple}
                            inputProps={{
                              name: "leadershipPosition",
                              id: "leadershipPosition"
                            }}
                          >
                            <MenuItem
                              disabled
                              classes={{
                                root: classes.selectMenuItem
                              }}
                            >
                              Choose Leadership Position
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="none"
                            >
                              None
                            </MenuItem>
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Youth_Leader"
                            >
                              Youth Leader
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Men_Leader"
                            >
                              Men Leader
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Women_Leader"
                            >
                              Women Leader
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Usher_Leader"
                            >
                              Usher
                            </MenuItem>

                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value="Musi_Leader"
                            >
                              Music
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="About Member"
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
              </form>
            </GridItem>
          </GridContainer>
        </div>
      )
    } else {
      return <Redirect to="/admin/member-list" />
    }
  }
}

MemberProfile.propTypes = {
  classes: PropTypes.object,
  member: PropTypes.object,
  errors: PropTypes.object,
  postUpdateProfile: PropTypes.func.isRequired,
  postUpdateProfilePic: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  member: state.member,
  errors: state.errors
})

const enhance = compose(
  withStyles(userProfileStyles),
  connect(
    mapStateToProps,
    { postUpdateProfile, postUpdateProfilePic }
  )
)

export default enhance(withRouter(MemberProfile))

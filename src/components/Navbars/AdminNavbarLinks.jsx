/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
// import { Manager, Target, Popper } from "react-popper";

import { connect } from "react-redux"
import compose from "recompose/compose"
import { withRouter } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { logoutUser } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Paper from "@material-ui/core/Paper"
import Grow from "@material-ui/core/Grow"
import Hidden from "@material-ui/core/Hidden"
import Popper from "@material-ui/core/Popper"
import Divider from "@material-ui/core/Divider"

// @material-ui/icons
import Person from "@material-ui/icons/Person"
import Notifications from "@material-ui/icons/Notifications"
import Dashboard from "@material-ui/icons/Dashboard"
import Search from "@material-ui/icons/Search"

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx"
import Button from "components/CustomButtons/Button.jsx"

import adminNavbarLinksStyle from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.jsx"

class HeaderLinks extends React.Component {
  state = {
    openNotification: false,
    openProfile: false
  }
  handleClickNotification = () => {
    this.setState({ openNotification: !this.state.openNotification })
  }
  handleCloseNotification = () => {
    this.setState({ openNotification: false })
  }
  handleClickProfile = () => {
    this.setState({ openProfile: !this.state.openProfile })
  }
  handleCloseProfile = () => {
    this.setState({ openProfile: false })
  }

  onLogoutClick(e) {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }

  render() {
    const { classes, rtlActive } = this.props
    const { openNotification, openProfile } = this.state
    const searchButton =
      classes.top +
      " " +
      classes.searchButton +
      " " +
      classNames({
        [classes.searchRTL]: rtlActive
      })
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    )
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    })
    const managerClasses = classNames({
      [classes.managerClasses]: true
    })
    return (
      <div className={wrapper}>
        <CustomInput
          rtlActive={rtlActive}
          formControlProps={{
            className: classes.top + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search",
              className: classes.searchInput
            }
          }}
        />
        <Button
          color="white"
          aria-label="edit"
          justIcon
          round
          className={searchButton}
        >
          <Search
            className={classes.headerLinksSvg + " " + classes.searchIcon}
          />
        </Button>

        <div className={managerClasses}>
          <Button
            color="transparent"
            aria-label="Person"
            justIcon
            aria-owns={openNotification ? "profile-menu-list" : null}
            aria-haspopup="true"
            onClick={this.handleClickProfile}
            className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
            muiClasses={{
              label: rtlActive ? classes.labelRTL : ""
            }}
            buttonRef={node => {
              this.anchorProfile = node
            }}
          >
            <Person
              className={
                classes.headerLinksSvg +
                " " +
                (rtlActive
                  ? classes.links + " " + classes.linksRTL
                  : classes.links)
              }
            />
            <Hidden mdUp implementation="css">
              <span
                onClick={this.handleClickProfile}
                className={classes.linkText}
              >
                {"Profile"}
              </span>
            </Hidden>
          </Button>
          <Popper
            open={openProfile}
            anchorEl={this.anchorProfile}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !openProfile,
              [classes.popperResponsive]: true,
              [classes.popperNav]: true
            })}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                id="profile-menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleCloseProfile}>
                    <MenuList role="menu">
                      <NavLink
                        to="/admin/profile"
                        className={
                          classes.itemLink + " " + classes.userCollapseLinks
                        }
                      >
                        <MenuItem
                          onClick={this.handleCloseProfile}
                          className={dropdownItem}
                        >
                          {"Profile"}
                        </MenuItem>
                      </NavLink>

                      <Divider light />
                      <MenuItem
                        //onClick={this.handleCloseProfile this.onLogoutClick.bind(this)}
                        onClick={this.onLogoutClick.bind(this)}
                        className={dropdownItem}
                      >
                        {"Log out"}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    )
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
  auth: state.auth
})

const enhance = compose(
  withStyles(adminNavbarLinksStyle),
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile }
  )
)

export default enhance(withRouter(HeaderLinks))

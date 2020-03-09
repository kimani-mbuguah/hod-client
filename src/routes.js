import AdminList from "views/Pages/AdminList.jsx";
import AdminProfile from "views/Pages/AdminProfile.jsx";
import Charts from "views/Charts/Charts.jsx";
import CreateSmsGroup from "views/Pages/CreateSMSGroup.jsx";
import CustomGroupSms from "views/Pages/CustomGroupSms.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import EditProfile from "views/Pages/EditProfile.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import FundsIn from "views/Pages/FundsIn.jsx";
import FundsList from "views/Pages/FundsList.jsx";
import FundsOut from "views/Pages/FundsOut.jsx";
import MinistrySms from "views/Pages/MinistrySms";
import IndividualSMS from "views/Pages/IndividualSMS.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import MemberList from "views/Pages/MemberList.jsx";
import MemberProfile from "views/Pages/MemberProfile.jsx";
import MultipleRecipients from "views/Pages/MultipleRecipients.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import RegisterMember from "views/Pages/RegisterMember.jsx";
import Relationship from "views/Pages/Relationship.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";

// @material-ui/icons
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Face from "@material-ui/icons/Face";
import Lock from "@material-ui/icons/Lock";
import Call from "@material-ui/icons/Call";

import jwt_decode from "jwt-decode";
const token = localStorage.getItem("hodJwtToken");

if (token) {
	const decoded = jwt_decode(token);

	const role = decoded.role;

	if (role === "SuperAdmin") {
		var dashRoutes = [
			{
				path: "/dashboard",
				name: "Dashboard",
				icon: DashboardIcon,
				component: Dashboard,
				layout: "/admin"
			},
			{
				path: "/login",
				name: "Login",
				mini: "L",
				component: LoginPage,
				layout: "/auth",
				invisible: true
			},
			{
				path: "/register",
				name: "Register",
				mini: "R",
				component: RegisterPage,
				layout: "/auth",
				invisible: true
			},
			{
				path: "/lock-screen-page",
				name: "Lock Screen",
				mini: "LS",
				component: LockScreenPage,
				layout: "/auth",
				invisible: true
			},
			{
				path: "/profile",
				name: "Profile",
				mini: "P",
				component: UserProfile,
				layout: "/admin",
				invisible: true
			},
			{
				path: "/edit-profile",
				name: "Edit Profile",
				mini: "EP",
				component: EditProfile,
				layout: "/admin",
				invisible: true
			},
			{
				path: "/error-page",
				name: "Error",
				mini: "E",
				component: ErrorPage,
				layout: "/auth",
				invisible: true
			},
			{
				collapse: true,
				name: "Members",
				icon: Face,
				state: "pageCollapse",
				views: [
					{
						path: "/member-registration",
						name: "Registration",
						mini: "MR",
						component: RegisterMember,
						layout: "/admin"
					},
					{
						path: "/relationship",
						name: "Add Relationship",
						mini: "AR",
						component: Relationship,
						layout: "/admin"
					},
					{
						path: "/member-list",
						name: "List Members",
						mini: "LM",
						component: MemberList,
						layout: "/admin"
					},
					{
						path: "/member-profile",
						name: "Member Profile",
						mini: "MP",
						component: MemberProfile,
						layout: "/admin",
						invisible: true
					}
				]
			},

			{
				collapse: true,
				name: "Communication",
				icon: Call,
				state: "communicationCollapse",
				views: [
					{
						path: "/individual",
						name: "Individual SMS",
						mini: "IS",
						component: IndividualSMS,
						layout: "/admin"
					},
					{
						path: "/multiple",
						name: "Multiple Recipients",
						mini: "MR",
						component: MultipleRecipients,
						layout: "/admin"
					},
					{
						path: "/ministry-sms",
						name: "Ministry SMS",
						mini: "MS",
						component: MinistrySms,
						layout: "/admin"
					},
					{
						path: "/group",
						name: "Group SMS",
						mini: "GS",
						component: CustomGroupSms,
						layout: "/admin"
					}
				]
			},

			{
				collapse: true,
				name: "Admin",
				icon: Lock,
				state: "adminsCollapse",
				views: [
					{
						path: "/admin-list",
						name: "List Admins",
						mini: "LA",
						component: AdminList,
						layout: "/admin"
					},
					{
						path: "/admin-profile",
						name: "Admin Profile",
						mini: "AP",
						component: AdminProfile,
						layout: "/admin",
						invisible: true
					},
					{
						path: "/create-group",
						name: "Create SMS Group",
						mini: "CG",
						component: CreateSmsGroup,
						layout: "/admin"
					}
				]
			},

			{
				collapse: true,
				name: "Finance",
				icon: AccountBalanceIcon,
				state: "financeCollapse",
				views: [
					{
						path: "/funds-in",
						name: "Funds In",
						mini: "FI",
						component: FundsIn,
						layout: "/admin"
					},
					{
						path: "/funds-out",
						name: "Funds Out",
						mini: "FO",
						component: FundsOut,
						layout: "/admin"
					},
					{
						path: "/finance-charts",
						name: "Finance Charts",
						mini: "FC",
						component: Charts,
						layout: "/admin"
					},
					{
						path: "/finance-list",
						name: "List View",
						mini: "LV",
						component: FundsList,
						layout: "/admin"
					}
				]
			}
		];
	} else if (role === "Admin") {
		dashRoutes = [
			{
				path: "/dashboard",
				name: "Dashboard",
				icon: DashboardIcon,
				component: Dashboard,
				layout: "/admin"
			},
			{
				path: "/login",
				name: "Login",
				mini: "L",
				component: LoginPage,
				layout: "/auth",
				invisible: true
			},
			{
				path: "/register",
				name: "Register",
				mini: "R",
				component: RegisterPage,
				layout: "/auth",
				invisible: true
			},
			{
				path: "/profile",
				name: "Profile",
				mini: "P",
				component: UserProfile,
				layout: "/admin",
				invisible: true
			},
			{
				path: "/edit-profile",
				name: "Edit Profile",
				mini: "EP",
				component: EditProfile,
				layout: "/admin",
				invisible: true
			},
			{
				path: "/error-page",
				name: "Error",
				mini: "E",
				component: ErrorPage,
				layout: "/auth",
				invisible: true
			},
			{
				collapse: true,
				name: "Members",
				icon: Face,
				state: "pageCollapse",
				views: [
					{
						path: "/member-registration",
						name: "Registration",
						mini: "MR",
						component: RegisterMember,
						layout: "/admin"
					},
					{
						path: "/relationship",
						name: "Add Relationship",
						mini: "AR",
						component: Relationship,
						layout: "/admin"
					},
					{
						path: "/member-list",
						name: "List Members",
						mini: "LM",
						component: MemberList,
						layout: "/admin"
					},
					{
						path: "/member-profile",
						name: "Member Profile",
						mini: "MP",
						component: MemberProfile,
						layout: "/admin",
						invisible: true
					}
				]
			},

			{
				collapse: true,
				name: "Communication",
				icon: Call,
				state: "communicationCollapse",
				views: [
					{
						path: "/individual",
						name: "Individual SMS",
						mini: "IS",
						component: IndividualSMS,
						layout: "/admin"
					},
					{
						path: "/multiple",
						name: "Multiple Recipients",
						mini: "MR",
						component: MultipleRecipients,
						layout: "/admin"
					},
					{
						path: "/ministry-sms",
						name: "Ministry SMS",
						mini: "MS",
						component: MinistrySms,
						layout: "/admin"
					},
					{
						path: "/group",
						name: "Group SMS",
						mini: "GS",
						component: CustomGroupSms,
						layout: "/admin"
					}
				]
			},
			{
				collapse: true,
				name: "Website",
				icon: Call,
				state: "communicationCollapse",
				views: [
					{
						path: "/slider",
						name: "Slider",
						mini: "S",
						component: IndividualSMS,
						layout: "/admin"
					},
					{
						path: "/gallery",
						name: "Gallery",
						mini: "G",
						component: MultipleRecipients,
						layout: "/admin"
					},
					{
						path: "/events",
						name: "Events",
						mini: "E",
						component: MinistrySms,
						layout: "/admin"
					}
				]
			}
		];
	}
} else {
	dashRoutes = [
		{
			path: "/login",
			name: "Login",
			mini: "L",
			component: LoginPage,
			layout: "/auth",
			invisible: true
		},
		{
			path: "/register",
			name: "Register",
			mini: "R",
			component: RegisterPage,
			layout: "/auth",
			invisible: true
		},

		{
			path: "/error-page",
			name: "Error",
			mini: "E",
			component: ErrorPage,
			layout: "/auth",
			invisible: true
		}
	];
}

export default dashRoutes;

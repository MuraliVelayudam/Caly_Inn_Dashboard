// ICONS IMPORT
import {
  Album,
  Calendar1,
  Castle,
  Home,
  MapPin,
  NotebookTabs,
  Users,
} from "lucide-react";

// LOGIN FORM INPUT

const loginForm_Inputs = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Please enter your email . . .",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Please enter your password . . .",
  },
];

// CREATE LOCATION FORM INPUTS
const createLocationForm_Inputs = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Please enter the location name . . .",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Please enter the location address . . .",
  },
  {
    name: "location_admin_name",
    label: "Admin Name",
    type: "text",
    placeholder: "Please enter the location admin name . . .",
  },
  {
    name: "location_admin_email",
    label: "Admin Email",
    type: "email",
    placeholder: "Please enter the location admin email . . .",
  },
  {
    name: "location_admin_password",
    label: "Admin Password",
    type: "password",
    placeholder: "Please enter the location admin password . . .",
  },
];

const navLinks = [
  {
    id: 0,
    title: "Dashboard",
    link: "dashboard",
    icon: <Home size={22} />,
    isAdmin: "false",
    active: true,
  },
  {
    id: 1,
    title: "Leads",
    link: "leads",
    icon: <NotebookTabs size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 2,
    title: "Bookings",
    link: "bookings",
    icon: <Album size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 3,
    title: "Venues",
    link: "venues",
    icon: <Castle size={22} />,
    isAdmin: "false",
    active: false,
  },
  {
    id: 4,
    title: "Calendar",
    link: "calendar",
    icon: <Calendar1 size={22} />,
    isAdmin: "false",
    active: false,
  },

  {
    id: 5,
    title: "Team",
    link: "team",
    icon: <Users size={22} />,
    isAdmin: "false",
    active: false,
  },
];

// Create New Venue Form Action Inputs
const createNewVenueForm_Inputs = [
  {
    name: "name",
    label: "Venue Name",
    placeholder: "Enter Venue Venue Name . . .",
  },
];

// Create New Team Form Action Inputs
const createNew_Team_Form_Inputs = [
  {
    name: "name",
    placeholder: "Enter Member Name",
  },
  {
    name: "email",
    placeholder: "Enter Member Email",
  },
  {
    name: "password",
    placeholder: "Enter Member Name",
  },
  {
    name: "mobile",
    placeholder: "Enter Member Name",
  },
];

export {
  loginForm_Inputs,
  createLocationForm_Inputs,
  navLinks,
  createNewVenueForm_Inputs,
  createNew_Team_Form_Inputs,
};

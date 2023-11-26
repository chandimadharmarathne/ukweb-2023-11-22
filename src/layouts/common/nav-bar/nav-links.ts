import LanguageSelector from "../../../components/language-selector";
import { FC } from "react";
import {
  AccountCircle,
  Bookmark,
  Category,
  Email,
  FilterNone,
  FilterNoneRounded,
  History,
  Language,
  Logout as LogoutIcon,
  Notifications,
  Person,
  PersonAdd,
  PersonSearch,
  Search,
  Send,
  Settings,
  Work,
  WorkHistory,
} from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import Logout from "../../../components/logout";
import { Auth } from "../../../store/providers/auth.provider";
import { ApplyJob, UserEdit } from "../../../utils/icons";

export interface Link {
  type: "link" | "component";
  link: string;
  name?: string;
  label?: string;
  innerLinks?: Link[];
  variant?: "text" | "outlined" | "contained";
  Component?: FC;
  loggedIn?: boolean;
  icon?: OverridableComponent<SvgIconTypeMap<Record<string, any>, "svg">> & {
    muiName: string;
  };
}

const getLinks = (role: Auth["role"]): Link[] => {
  const candidateLinks: Link[] = [
  
    
  ];
  const employerLinks: Link[] = [
    {
      link: "/company",
      label: "Company Profile",
      icon: Work,
      type: "link",
    },

    {
      link: "/company/overview",
      label: "Ads Overview",
      icon: Work,
      type: "link",
    },
    {
      link: "/ads/posted",
      label: "Posted Ads",
      icon: Send,
      type: "link",
    },
    {
      link:"/my-packages",
      label:"My Packages",
      icon:FilterNoneRounded,
      type:"link"
    }
  ];
  return [
    {
      link: "/",
      label: "Home",
      type: "link",
      icon: Search,
      name: "home",
    },
    {
      link: "/new-jobs",
      label: "New Jobs",
      type: "link",
      icon: PersonSearch,
      name: "new_jobs",
    },
    {
      link: "/salary-Guide",
      label: "Salary Guide",
      type: "link",
      icon: ApplyJob,
      name: "salary_guide",
    },
    {
      link:"/help",
      label:"Help",
      type:"link",
      icon:WorkHistory,
      name:"help"
    },
   

   
    ...(role === "candidate"
      ? [
          
        ]
      : []),
    
    {
      link: "/profile",
      label: "Profile",
      name: "profile",
      icon: AccountCircle,
      type: "link",
      loggedIn: true,
      innerLinks: [
        ...(role === "candidate"
          ? candidateLinks
          : role === "employer"
          ? employerLinks
          : []),

        
        {
          link: "/settings",
          label: "Settings",
          icon: Settings,
          type: "link",
        },
        {
          link: "#",
          name:"logout",
          label: "Logout",
          icon: LogoutIcon,
          type: "component",
          Component: Logout,
        },
      ],
    },
  ];
};
export default getLinks;

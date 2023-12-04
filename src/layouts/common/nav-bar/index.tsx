import { ExpandMore, Work } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Theme,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, {
  FC,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notification } from "../../../components/notifications/types";
import { SocketEvents } from "../../../constants/event-names";
import { useSocketEvent } from "../../../hooks/socket";
import { useToggle } from "../../../hooks/toggle.hook";
import * as profileService from "../../../services/profile-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import InnerLinks from "./inner-links";
import getLinks from "./nav-links";
import { is } from "date-fns/locale";

const MAX_NAVBAR_LINKS_VISIBLE = 4;

const MobileMenu = React.lazy(() => import("./mobile-menu"));

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );


  const { addSnack } = useSnackbar();
  const navigate = useNavigate();
  //const { token, role, lastlogin, adposted,completed } = useAuthentication();
  const [newDots, setNewDots] = useState<{ [key: string]: number }>({});
  const [openOtherLinks, toggleOpenOtherLinks] = useToggle();
  const [addPostDisabled, setAddPostDisabled] = useState(false);

 let token =  null

  

  const otherLinksButton = useRef<HTMLButtonElement>(null);

  const [fullLinks, otherLinks] = useMemo(() => {
    const allLinks = getLinks('employer');

    const full = allLinks.slice(0, MAX_NAVBAR_LINKS_VISIBLE);
    const others = allLinks.slice(MAX_NAVBAR_LINKS_VISIBLE);

    return [full, others];
  }, [token]);
  let role = "gest"

  useEffect(() => {
    if (role === undefined) {
      postAdLink = "#";
    } else {
      postAdLink =
        role === "employer" ? "/post-ad/post" : "/profile/candidate/edit";
    }
  }, [role]);

  let postAdLink =
    role === "employer" ? "/post-ad/post" : "/profile/candidate/edit";

  const updateDots = (id: string, count: (prev: number) => number) => {
    setNewDots((prev) => ({ ...prev, [id]: count(prev[id] ?? 0) }));
  };
  const removeDot = (id?: string) => () => {
    console.log("id",id)
    if (!id) return;
    
    updateDots(id, () => 0);
  };

  // const getBubbles = async () => {
  //   try {
  //     const { result } = await profileService.getInitialNotifications(
  //       lastlogin
  //     );
  //     updateDots("messages", (prev) => prev + result.chats);
  //     updateDots("notifications", (prev) => prev + result.notifications);
  //   } catch (error) {
  //     //
  //   }
  // };

  useSocketEvent(SocketEvents.NEW_MESSAGE_CAME, () => {
    updateDots("masseges", (prev) => prev + 1);
  });
  useSocketEvent(SocketEvents.NOTIFICATION, (notification: Notification) => {
    updateDots("notifications", (prev) => prev + 1);
    addSnack?.({
      severity: "info",
      message: notification.title,
      onClick: () => navigate("/notifications"),
    });
  });

  return (
    <AppBar
      color="default"
      sx={(theme) => ({ [theme.breakpoints.up("md")]: { zIndex: 9999 } })}
      position="fixed"
      elevation={0}
      className="not-printable"
      style={{
        display:'flex',
        backgroundColor:"white",
        height:100,
        color:'black',
        width:isDesktop? '89%':isMobile ? '89%':'90%',
        alignContent:'flex-start',
        alignItems: 'flex-start',
        
        
        paddingRight:0,
       justifyContent:'center'
        
      }}
    >
      <Toolbar
        variant="regular"
        style={{
          justifyContent: "space-between",
          padding: isDesktop ?"10px 1px": isMobile ? "8px 9px":"7px 8px", 
        width:"95%"
        }}
      >
        <Link to={"/"} style={{
         
        }}>
          <Box width={{ xs: 10, md: 50 }}>
            <img
              height={80}
              width={50}
              src="/assets/logo.jpg"
              alt="jobswomenlogo"
            />
          </Box>
        </Link>
       
        <nav aria-label="Main"  >
          {isTablet ? (
            <>
            
              <Suspense fallback={null}>
                <MobileMenu postAdLink={postAdLink} />
              </Suspense>
            </>
          ) : (
            <Stack spacing={3} direction="row">
        {
          !isTablet && (
            <>
            <Stack spacing={2} direction="row">
              {fullLinks
                .filter((link) => !link.loggedIn)
                .map((link) => {
                  if (link.Component)
                    return <link.Component  key={link.Component.name} />;

                  return (
                    <Button  style={{
                      color:"black"
                    
                    }}component={Link} to={link.link} key={link.link}>
                      {link.label}
                    </Button>
                  );
                })}
            </Stack>
            </>
          )
        }      

              <Stack direction="row" spacing={1} style={{
                marginRight:18,
                color:"black"
              }} >
                {!!token && typeof token ==='object' ? (
                  getLinks('candidate')
                    .filter((link) => link.loggedIn)
                    .map((link) => {
                      let Icon = link.icon ?? Work;
                      if(link?.name === 'profile'){
                        Icon = JSON.parse(localStorage?.getItem("user") ??"")?.displayname ??""
                      }
                      
                      if (link.innerLinks)
                        return <InnerLinks link={link} key={link.link} />;
                      return (
                        <IconButton
                          to={link.link}
                          key={link.link}
                          component={Link}
                          onClick={removeDot(link.name)}
                          aria-label={link.label}
                        >
                          <Badge
                            style={{
                              color:"black"
                            }}
                            badgeContent={newDots[link.name ?? "invalid"] ?? 0}
                          >
                            <Tooltip
                              sx={{ zIndex: 99999999 }}
                              title={String(link.label)}
                            >
                              <Icon style={{
                                color:"black"
                              }} />
                            </Tooltip>
                          </Badge>
                        </IconButton>
                      );
                    })
                ) : (
                  <Link to="/login">
                    <Button style={{
                      color:"black",
                      borderColor:"black"
                  
                    }} variant="outlined">Login</Button>
                  </Link>
                )}
              </Stack>
            </Stack>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

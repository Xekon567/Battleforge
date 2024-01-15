import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "assets/images/logo.png";
import { Dropdown } from "components/dropdown";
import { AppContext } from "hooks/appcontext";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { navItems } from "utils/constants";

type NavItem = {
  id: string;
  name?: string;
  icon?: any;
  to?: string;
  toAbs?: string;
  children?: Array<NavItem>;
  onClick?: Function;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  // marginLeft: theme.spacing(3),
  // width: 'auto',
  // [theme.breakpoints.up('sm')]: {

  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function MainAppBar() {
  const appContext = React.useContext(AppContext);
  const theme = useTheme();
  const { contextActions } = appContext;
  const fullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const numActionsToShow = fullScreen
    ? contextActions?.length
    : 2 - (appContext.searchMode ? 1 : 0);
  const navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container>
        {!(!!appContext.searchMode && !!appContext.enableSearch) && (
          <Toolbar style={{ padding: 0 }}>
            {!fullScreen && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 0 }}
                onClick={() => appContext.setDrawerOpen(!appContext.drawerOpen)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Button
              onClick={() => navigate("/")}
              sx={{ color: "inherit", p: 0 }}
            >
              <img
                src={logo}
                alt="Dice Guild"
                style={{
                  height: fullScreen ? "40px" : "35px",
                  marginRight: "20px",
                }}
              />
            </Button>
            {!!fullScreen && (
              <>
                {navItems.map((item: NavItem, index: number) => {
                  if (item.children) {
                    return (
                      <Dropdown key={index}>
                        {({
                          handleClose,
                          open,
                          handleOpen,
                          anchorElement,
                        }: any) => (
                          <>
                            <Button
                              startIcon={item.icon}
                              sx={{
                                color: "white",
                                mr: 1,
                                textTransform: 'none'
                              }}
                              key={item.id}
                              onClick={handleOpen}
                            >
                              <Typography>{item.name}</Typography>
                            </Button>
                            <Menu
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              anchorEl={anchorElement}
                              id="basic-menu"
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                onClick: handleClose,
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              {(item.children || []).map((child) => (
                                <MenuItem
                                  key={child.id}
                                  onClick={() => {
                                    if (child.toAbs) {
                                      window.open(child.toAbs, "_blank");
                                    } else if (child.to) {
                                      navigate(child.to as string);
                                    } else if (child.onClick) {
                                      child.onClick();
                                    }
                                    handleClose();
                                  }}
                                >
                                  <ListItemIcon>{child.icon}</ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography>{child.name}</Typography>
                                    }
                                  />
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        )}
                      </Dropdown>
                    );
                  }
                  if (item?.id === "divider") {
                    return <div style={{ flexGrow: 1 }} />;
                  }
                  return (
                    <Button
                      sx={{
                        color: "white",
                        mr: 1,
                        textTransform: 'none'
                      }}
                      startIcon={item.icon}
                      key={item.id}
                      onClick={() => {
                        if (item.toAbs) {
                          window.open(item.toAbs, "_blank");
                        } else if (item.to) {
                          navigate(item.to as string);
                        } else if (item.onClick) {
                          item.onClick();
                        }
                      }}
                    >
                      <Typography>{item.name}</Typography>
                    </Button>
                  );
                })}
              </>
            )}
            {appContext.enableSearch && (
              <IconButton
                size="large"
                aria-label="show more"
                color="inherit"
                onClick={() => {
                  appContext.setSearchMode(true);
                }}
              >
                <SearchIcon />
              </IconButton>
            )}
            {contextActions
              ?.slice(0, numActionsToShow)
              ?.map((action: any, index: number) => (
                <IconButton
                  key={index}
                  size="large"
                  color="inherit"
                  title={action.name}
                  onClick={() => action.onClick()}
                >
                  {action.icon}
                </IconButton>
              ))}
            {!!(contextActions?.length - numActionsToShow > 0) && (
              <Dropdown>
                {({ handleClose, open, handleOpen, anchorElement }: any) => (
                  <>
                    <IconButton
                      sx={{ color: "inherit" }}
                      style={{ paddingRight: 0 }}
                      onClick={handleOpen}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      anchorEl={anchorElement}
                      id="basic-menu"
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        dense: true,
                        onClick: handleClose,
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {contextActions
                        ?.slice(numActionsToShow)
                        ?.map((action: any, index: number) => (
                          <MenuItem
                            key={index}
                            onClick={() => action.onClick()}
                          >
                            <ListItemIcon>{action.icon}</ListItemIcon>
                            <ListItemText>{action.name}</ListItemText>
                          </MenuItem>
                        ))}
                    </Menu>
                  </>
                )}
              </Dropdown>
            )}
          </Toolbar>
        )}
        {!!appContext.searchMode && !!appContext.enableSearch && (
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                appContext.setSearchMode(false);
                appContext.setSearchText("");
              }}
              edge="start"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={appContext?.searchText}
                onChange={(event) => {
                  const value = event?.target?.value;
                  appContext.setSearchText(value);
                }}
              />
            </Search>
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
}

import CloseIcon from '@mui/icons-material/Close';
import { Box, createTheme, IconButton, PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { MainAppBar } from 'components/app-bar';
import { Appdrawer } from 'components/app-drawer';
import { AppContext } from 'hooks/appcontext';
import { useLocalStorage } from 'hooks/use-localstorage';
import { ModalProvider } from 'hooks/use-modal';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import {
  Navigate, Route, Routes
} from "react-router-dom";
import { getColor } from 'utils/colors';
import { Home, About } from 'routes';
import './App.css';
import { Footer } from 'components/footer';

function App() {
  const [userPrefs, setUserPrefs] = useLocalStorage("userPrefs", {});
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [appTheme, setAppTheme] = React.useState<PaletteMode | undefined>('dark');
  const [contextActions, setContextActions] = React.useState<Array<any>>([]);
  const [enableSearch, setEnableSearch] = React.useState<boolean>(false);
  const [searchMode, setSearchMode] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const setSearchEnabled = React.useCallback((enabled: boolean) => {
    setEnableSearch(enabled);
    if (!enabled) {
      setSearchText('');
      setSearchMode(false);
    }
  }, []);
  const appContextValue = {
    drawerOpen,
    setDrawerOpen,
    appTheme,
    setAppTheme,
    contextActions,
    setContextActions,
    enableSearch,
    setEnableSearch: setSearchEnabled,
    searchText,
    setSearchText,
    searchMode,
    setSearchMode,
    userPrefs,
    setUserPrefs
  };
  const notistackRef = React.createRef<any>();
  const onClickDismiss = (key: number) => () => {
    if (notistackRef && notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const browserTheme = prefersDarkMode ? 'dark' : 'light';
  const userTheme = userPrefs?.theme;
  const themeId = (!userTheme || userTheme === 'system') ? browserTheme : userTheme;
  const userPrimaryColor = getColor(userPrefs?.primaryColor)?.import || getColor('blue')?.import;
  const userSecondaryColor = getColor(userPrefs?.secondaryColor)?.import || getColor('blue')?.import;
  const customTheme = createTheme({
    palette: {
      mode: themeId,
      primary: userPrimaryColor,
      secondary: userSecondaryColor
    },
    typography: {
      fontFamily: 'Noto Sans JP',
      h1: {
        fontSize: '4rem',
        fontWeight: 'bold'
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 'bold'
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: 'bold'
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 'bold'
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
      },
      h6: {
        fontSize: '1rem',
      }
    },
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        }
      }
    }
  });
  return (
    <div>
      <ThemeProvider theme={customTheme}>
        <ModalProvider>
          <SnackbarProvider
            ref={notistackRef}
            maxSnack={3}
            action={(key: number) => (
              <IconButton sx={{ color: 'inherit' }} onClick={onClickDismiss(key)}>
                <CloseIcon />
              </IconButton>
            )}
          >
            <AppContext.Provider value={appContextValue}>
              <CssBaseline />
              <MainAppBar />
              <Box>
                <Appdrawer />
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
                <Footer />
              </Box>
            </AppContext.Provider>
          </SnackbarProvider>
        </ModalProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

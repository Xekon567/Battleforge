import { Box, Container, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import logo from "assets/images/logo_large.png";

export default function About() {
  const theme = useTheme();
  document.title = `Dice Guild - About`;
  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        style={{ width: "100%" }}
      >
        <img className={"d-block text-center logo-alt"} src={logo} alt="logo" />
      </Box>
      <Box>
        <Typography variant="body1" paragraph>
          Dice Guild began as a pandemic game project born out of the need for a
          game to play among friends. The goal was to create something we could
          use our existing miniatures with and unify many different sets we
          owned into something highly balanced and playable. Eventually this
          turned into what we now know as <strong>Battle Forge</strong> (which
          was previously several other names). Prototyping began around 2020 and
          quite a bit of time was spent getting points formulas and other
          balance concerns ironed out with some very minimal UI/UX
          considerations. I still fontly remember putting together a prototype
          army builder in about 3 days over the weekend so we could play some
          test games the next week. Eventually we onboarded a few new members
          who generously volunteer their time to help maintain game data and new
          units as well as give input on core rules design.
        </Typography>
        <Typography variant="body1" paragraph>
          Eventually, it made a lot of sense to come together as a brand to
          start marketing the games we create and to help get the word out so
          the game can grow and take on new players. Since 2023, our focus has
          been on polishing and presentation to bring the game to new audiences.
          It has taken quite a lot of work to reach the stage we're at now and
          we hope you'll join us on our journey to create awesome games for our
          dedicated and wonderful community. If you like the work we do, please
          consider supporting us on Ko-fi through the link in the sidebar.
          Donations are put entirely back into our games through graphics,
          design consulting and other work on the app to help improve the
          overall experience.
        </Typography>
        <Typography
          sx={{ pl: 2, borderLeft: `3px solid ${theme.palette.primary.main}` }}
        >
          - Jacob from Dice Guild
        </Typography>
      </Box>
    </Container>
  );
}

import { Box, CardActionArea, Container, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import logo from "assets/images/logo_large.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import Discord from "mdi-material-ui/Discord";
import Coffee from "mdi-material-ui/CoffeeOutline";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import { GAMES } from "utils/constants";
import splash from "assets/images/splash.jpg";

type CardType = {
  name: string;
  icon: any;
  text: string;
  to?: string;
  toAbs?: string;
  disabled?: boolean;
};

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up("md"));
  document.title = `Dice Guild - Home`;
  const iconSize = "35px";
  const CARDS: Array<CardType> = [
    {
      name: "GitHub",
      icon: <GitHubIcon style={{ fontSize: iconSize }} />,
      text: "Contribute to the game code on Github.",
      toAbs: "https://github.com/dice-guild",
    },
    {
      name: "Discord",
      icon: <Discord style={{ fontSize: iconSize }} />,
      text: "Join the community to discuss our games.",
      toAbs: "https://discord.com/invite/M9sets4",
    },
    {
      name: "Donate",
      icon: <Coffee style={{ fontSize: iconSize }} />,
      text: "Support further development of the game.",
      toAbs: "https://ko-fi.com/diceguild",
    },
  ];
  return (
    <Box>
      <div
        style={{
          backgroundImage: `url(${splash})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          style={{ width: "100%", background: "rgba(0,0,0,0.6)" }}
        >
          <img className={"d-block text-center logo"} src={logo} alt="logo" />
        </Box>
      </div>
      <Container sx={{ mt: 2}}>
        <Typography
          variant={fullScreen ? "h2" : "h3"}
          paragraph
          textAlign="center"
          sx={{
            mb: "0.5em",
            borderBottom: `3px solid grey`
          }}
        >
          Digital-first and Collaborative
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" paragraph>
            Dice Guild is a collection of tabletop creators banded together to
            publish the games we want to play. We focus on digital-first and
            app-assisted games that allow you to avoid as much book-keeping as
            possible and focus on the fun. Our games are designed to be simple
            to teach almost anyone and with enough depth to master over time. We
            pride ourselves on interesting gameplay depth without unnecessary
            complexity.
          </Typography>
          <Typography variant="body1" paragraph>
            As a publisher, we aim to work directly with our community to help
            test and refine our games to ensure they're fun for everyone and
            receive timely updates for both balance, and new content. Being
            digital-first means we can push forward with significant changes
            where necessary as quickly as possible without having to worry about
            updating physical mediums. We encourage anyone who wants to get
            involved to reach out on one of our social media outlets.
          </Typography>
        </Box>
      </Container>
      <Divider sx={{ my: 3 }} />
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Object.values(GAMES).map((card: any, index: number) => (
            <Grid item xs={6} key={index}>
              <Card>
                <CardActionArea
                  onClick={() => (window.location.href = card.to || card.toAbs)}
                >
                  <CardContent
                    sx={{ p: 0 }}
                    style={{
                      background: `url(${card.image})`,
                      backgroundSize: "cover",
                      minHeight: "350px",
                      display: "flex",
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: "100%",
                        background: "rgba(0,0,0,0.6)",
                      }}
                    >
                      <img alt="logo" className="game-logo" src={card.logo} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{ my: 3 }} />
      <Container sx={{ my: 3 }}>
        <Typography variant="body1" paragraph>
          Please consider supporting us either financially or through code contributions to help us grow as a team. You can do
          so at the following links below. We welcome any and all constructive feedback so be sure to visit our Discord server
          to join the discussion!
        </Typography>
        <Grid
          container
          rowSpacing={1}
          sx={{ my: 2 }}
          columnSpacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {CARDS.map((card: any, index: number) => (
            <Grid item xs={4} key={index}>
              <Card>
                <CardActionArea
                  disabled={card.disabled}
                  onClick={() =>
                    card.toAbs
                      ? window.open(card.toAbs, "_blank")
                      : navigate(card.to ?? "")
                  }
                >
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mr: 2 }}
                      >
                        {card.icon}
                      </Box>
                      <Stack>
                        <Typography variant="h4" component="div">
                          {card.name}
                        </Typography>
                      </Stack>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

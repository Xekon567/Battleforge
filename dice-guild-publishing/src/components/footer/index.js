import { Container, Box } from "@mui/material";
import './footer.css';
import { Link } from '@mui/material';
import { useWindowDimensions } from "hooks/use-window-dimensions";

export const Footer = () => {
  const dimensions = useWindowDimensions();
  return (
    <Container>
      <Box sx={{ mt: 2, mb: 2 }} display="flex" alignItems="center" justifyContent="end">
        <Box className={dimensions.width > 768 ? "text-right" : ""}>
          &#169; <Link href="https://www.diceguildpublishing.com">Dice Guild</Link>{" "}
          {new Date().getFullYear()}
        </Box>
      </Box>
    </Container>
  );
};

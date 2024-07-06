import { Typography, Container, Box } from "@mui/material";
import Nav from "../components/Navbar/Nav";

export default function Home() {
  return (
    <Box>
      <Nav />
      <Container>
        <Typography variant="h2">At home.</Typography>
      </Container>
    </Box>
  );
}

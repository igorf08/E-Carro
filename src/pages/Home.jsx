import { Box, Container } from "@mui/material";
import Nav from "../components/Navbar/Nav";
import MediaCard from "../components/MediaCard/MediaCard";

export default function Home() {
  return (
    <Box>
      <Nav />
      <Box>
        <MediaCard />
      </Box>
    </Box>
  );
}

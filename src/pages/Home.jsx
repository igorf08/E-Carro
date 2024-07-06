import { Typography, Container } from "@mui/material";

export default function Home(){
  return (
    <Container sx={{border: 2, bgcolor: 'red', m: 0}}>
      <Typography variant="h2">At home.</Typography>
    </Container>
  );
}

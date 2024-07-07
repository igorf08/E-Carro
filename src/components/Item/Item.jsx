import { Card, CardMedia } from "@mui/material";

// eslint-disable-next-line react/prop-types
function Item({ item }) {
  return (
      <Card>
          <CardMedia
            component="img" 
            image={item} 
            aria-label="veiculo"
            sx={{width: {xs: 400, md: 900}, height: {xs: 310, md:550}}}
          />
      </Card>
  );
}

export default Item;

/* eslint-disable react/prop-types */
import Carousel from "react-material-ui-carousel";
import Item from "../Item/Item";

function CmpntCarousel({ photos }) {
  return (
    <Carousel
      autoPlay={false}
      swipe={true}
      navButtonsAlwaysVisible={true}
      animation="slide"
      sx={{
        width: {xs: 450, md: 900},
        height: {xs: 320, md: 'auto'}
      }}
    >
      {photos.map((photo, index) => (
        <Item key={index} item={photo} />
      ))}
    </Carousel>
  );
}

export default CmpntCarousel;

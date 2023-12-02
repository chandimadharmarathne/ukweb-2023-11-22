import React, { FC } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  styled,
  useMediaQuery,
  Theme,
} from "@mui/material";
import CantactUs from "./cantactUs";

interface PostJobCardProps {
  card: any;
}

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  textAlign: "center",
  color: "wheat", // White text color
}));

const DescriptionCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Stack children vertically
  alignItems: "center", // Center horizontally
  justifyContent: "flex-end", // Align to the bottom
  minHeight: "100%", // Ensure the card content fills the card's height
}));

const DescriptionTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: "green", // Green background color
  //borderRadius: "0 0 30px 30px", // Rounded corners only at the bottom
  zIndex: 1, // Set z-index to bring it to the front
  paddingTop:'15px',
  padding: "8px", // Add some padding
}));

const PostJobCard: FC<PostJobCardProps> = ({ card }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const isTablet = useMediaQuery<Theme>((theme) =>
  theme.breakpoints.between("sm", "md")
);

  const StyledCard = styled(Card)(({ theme }) => ({
    width:isMobile ? 200 : 800, // Fixed width
    height: 300, // Fixed height
    maxWidth: 800,
    margin: "20px",
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: "relative", // Add position relative
  }));

  const [open, setOpen] = React.useState(false);
  const toggle = () => {
    console.log("toggle");
    setOpen(true);
  }

  return (
    <>
      <CantactUs open={open} onClose={() => {
        setOpen(false)
      }} />
      <StyledCard onClick={toggle}>
        <StyledCardContent>
          {/* Content here */}
        </StyledCardContent>
        <DescriptionCardContent>
          <DescriptionTypography variant="body2" gutterBottom color="inherit">
            {card?.description}
          </DescriptionTypography>
        </DescriptionCardContent>
      </StyledCard>
    </>
  );
};

export default PostJobCard;

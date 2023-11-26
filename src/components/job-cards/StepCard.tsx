import React, { FC } from "react";
import {
  Card,
  CardContent,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

interface StepCardProps {
  card: any;
}



const StyledCardContent = styled(CardContent)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.primary, // Set text color to the primary text color
}));

const StepCard: FC<StepCardProps> = ({ card }) => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const StyledCard = styled(Card)(({ theme }) => ({
        maxWidth: 400,
        margin: "auto",
        backgroundColor: isMobile ? "white":"rgba(128, 128, 128, 0.5)", // Gray transparent background
        marginBottom: theme.spacing(2),
        boxShadow:'-moz-initial'
      }));
  return (
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h5" gutterBottom style={{
            color:isMobile ? 'brown':'black'
        }}>
          {card?.title}
        </Typography>
        <Typography variant="body2"style={{
            color:isMobile ? 'brown':'black'
        }}>
          {card?.description}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default StepCard;

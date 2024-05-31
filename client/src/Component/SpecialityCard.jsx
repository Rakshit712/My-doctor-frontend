import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SpecialityCard = ({ imageUrl, name }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: { xs: 250, xl: 390 },
        height: 200,
        
        m:1.5
        
       
      }}
      onClick={() => navigate(`/`)}
    >
      <CardContent sx={{ textAlign: "center",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
       }}>
        <img
          src={`${imageUrl}`}
          alt="img not found"
          width="30%"
          
        />
        <Typography variant="h6" component="div" sx={{ mt: 3, fontSize: 18 }}>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpecialityCard;

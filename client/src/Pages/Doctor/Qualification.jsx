import React, { useState } from "react";
import Header from "../../Component/Navbar";
import Sidebar from "../../Component/Sidebar";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";

function Qualification() {
  const [edit, setEdit] = useState(false);
  const [qualifications, setQualifications] = useState([]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <div className="bg-gray-50 h-[700px]">
        <Header />
        <Sidebar />

        <div className="ml-[270px] my-5">
          <Grid container sx={{ width: "98%", margin: "auto" }}>
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                My Qualification
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3f51b5",
                  display: edit ? "inline" : "none",
                }}
                onClick={handleEdit}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#3f51b5", ml: 1, mr: 2 }}
                onClick={handleEdit}
              >
                {edit ? "Save" : "Edit"}
              </Button>
            </Grid>
            {qualifications.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  sx={{ color: "grey", textAlign: "center", fontSize: 18 }}
                >
                  No Qualification Added yet
                </Typography>
              </Grid>
            ) : (
              qualifications.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  sx={{
                    borderRadius: 1.2,
                    backgroundColor: "white",
                    border: 1,
                    borderColor: "divider",
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-basic"
                      required
                      label="Degree/Certifications"
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-basic"
                      label="Institute Name"
                      required
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-basic"
                      label="Year Of Completion"
                      required
                      variant="outlined"
                      disabled={!edit}
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    title="Delete Row"
                    item
                    xs={0.5}
                    sx={{ textAlign: "right", mr: 2 }}
                  >
                    <Button
                      sx={{
                        borderRadius: 40,
                       
                      }}
                    >
                      <IconButton aria-label="delete" disabled={!edit}>
                        <Close sx={{ color: "grey" }} />
                      </IconButton>
                    </Button>
                  </Grid>
                </Grid>
              ))
            )}
            <Grid
            item
            xs={2}
            sx={{
              ml: "auto",
              textAlign: "right",
              mt: 3,
              display: edit ? "block" : "none",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3f51b5" }}

             
            >
              Add More
            </Button>
          </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default Qualification;

import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel"
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/Config";
import "./ContentModal.css"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "90%",
    backgroundColor: "#141415",
    border: "1px solid #525457",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
       className="media" 
       style={{ cursor: "pointer" }}
       color="inherit"
       onClick={handleOpen}>
         {children}
       </div>
        
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
       
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                
                 <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal_landscape"
                />
                <div className="ContentModal_about">
                  <span className="ContentModal_title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline &&(
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal_description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={media_type} id={id}/>
                  </div>
                  <Button
                    sx={{ width: '60%', mx: "auto" }}
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="error"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal_portrait"
                />
              </div>
            </div>)}

        </Fade>
      </Modal>
    </>
  );
}
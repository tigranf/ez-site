import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";

export default function Suggestions({ setPrompt }) {
  return (
    <>
      <Card elevation={6}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"center"}
          >
            Type a brief but detailed description of your website idea.
          </Typography>
        </CardContent>
      </Card>
      <Divider variant="fullWidth" />
      <Card>
        <CardActionArea
          onClick={(e) => {
            let innerText = e.target.innerText;
            innerText = innerText.substring(2, innerText.lastIndexOf(" ") + 1);
            setPrompt(innerText);
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={"center"}
              gutterBottom
            >
              🙶 uber for private jet flights 🙷
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Divider variant="fullWidth"/>
      <Card>
        <CardActionArea
          onClick={(e) => {
            let innerText = e.target.innerText;
            innerText = innerText.substring(2, innerText.lastIndexOf(" ") + 1);
            setPrompt(innerText);
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={"center"}
              gutterBottom
            >
              🙶 a website that lets you rate and review people working in the
              service industry 🙷
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Divider variant="fullWidth"/>
      <Card>
        <CardActionArea
          onClick={(e) => {
            let innerText = e.target.innerText;
            innerText = innerText.substring(2, innerText.lastIndexOf(" ") + 1);
            setPrompt(innerText);
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={"center"}
              gutterBottom
            >
              🙶 a job board site for software developers with a focus on life
              quality in different urban areas 🙷
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Divider variant="fullWidth"/>
      <Card>
        <CardActionArea
          onClick={(e) => {
            let innerText = e.target.innerText;
            innerText = innerText.substring(2, innerText.lastIndexOf(" ") + 1);
            setPrompt(innerText);
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={"center"}
              gutterBottom
            >
              🙶 A platform designed for individuals and small businesses that
              helps them manage their finances. 🙷
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Divider variant="fullWidth"/>
      <Card>
        <CardActionArea
          onClick={(e) => {
            let innerText = e.target.innerText;
            innerText = innerText.substring(2, innerText.lastIndexOf(" ") + 1);
            setPrompt(innerText);
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign={"center"}
              gutterBottom
            >
              🙶 Health Insurance for Young People 🙷
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Divider variant="fullWidth"/>
    </>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import "./face.css";
import { Button } from "@mui/material";
import update from "./logic.js";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { apiLinkCount } from "../../apiList.js";
export default function Facebook(props) {
  const { topic, img, desc, views, _id, delay ,linkCount} = props;
  const [lengthy, setLengthy] = React.useState(false);
  const [readMore, setReadMore] = React.useState(false);
  const [linkCounting,setLinkCounting] = React.useState(linkCount);
  const handleCopyClick = () => {
    if (!img) {
      toast.error("Unable to copy the link");
      return;
    }
    setLinkCounting(linkCount+1);
    navigator.clipboard.writeText(img).then(
      () => {
        axios.post(apiLinkCount,  {_id})
          .then(() => {
            // Handle success
            console.log("Link count updated successfully");
          })
          .catch(error => {
            // Handle error
            console.error("Failed to update link count: ", error);
          });
        toast.success("Copied");
      },
      (err) => {
        console.error("Failed to copy link: ", err);
      }
    );
  };
  React.useEffect(() => {
    if (desc.length > 200) {
      setLengthy(true);
    }
    update({ _id, views, delay });
  }, []);
  function getAdjustment() {
    if (lengthy && readMore) {
      return ` adjust`;
    } else {
      return `overflow-hidden max-h-20`;
    }
  }
  return (
    <Card sx={{ maxWidth: 600, m: 2, minWidth: 345 }}>
      <CardHeader
        title={
          !topic ? (
            <Skeleton
              animation="wave"
              height="10"
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <span>{topic}</span>
          )
        }
      />
      {!topic ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia component="img" height="140" image={img} alt={img} />
      )}

      <CardContent>
        {!topic ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            <div>
              <div className="flex justify-between">
                <h3>Views: {views}</h3>
                <Button onClick={handleCopyClick}>
                  <FontAwesomeIcon icon={faCopy} style={{ color: "#74C0FC" }} /> :  {linkCounting}
                </Button>
              </div>
              <div className={`text-orange-800 ${getAdjustment()}`}>{desc}</div>
              {!readMore && lengthy && (
                <Button onClick={() => setReadMore(true)}>Readmore</Button>
              )}
              {readMore && (
                <Button onClick={() => setReadMore(false)}>Show less</Button>
              )}
            </div>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

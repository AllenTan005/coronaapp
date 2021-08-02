import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core/";

import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 10,
    padding: 10,
    width: 275,
    textAlign: "start",
    marginBottom: 7,
    background: "#121212",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 435,
    },
  },
  newUpdate: {
    color: "#018786",
    marginTop: 7,
  },
}));

const Cards = ({ data, country }) => {
  const classes = useStyles();

  return data === null ? (
    <h1>loading</h1>
  ) : (
    <Grid container spacing={3}>
      {/*1st card */}
      <Grid item>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography gutterBottom>Total Cases</Typography>
            <Typography variant="h4" component="h2">
              <CountUp
                start={100}
                end={data.TotalConfirmed}
                separator=","
                duration={2}
              />
            </Typography>

            {!country && (
              <Typography variant="subtitle1" className={classes.newUpdate}>
                &#9650;{" "}
                <CountUp
                  start={100}
                  end={data.NewConfirmed}
                  separator=","
                  duration={2}
                />
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      {/*2nd card */}
      <Grid item>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography gutterBottom>Total Death</Typography>
            <Typography variant="h4" component="h2">
              <CountUp
                start={100}
                end={data.TotalDeaths}
                separator=","
                duration={2}
              />
            </Typography>
            {!country && (
              <Typography variant="subtitle1" className={classes.newUpdate}>
                &#9650;{" "}
                <CountUp
                  start={100}
                  end={data.NewDeaths}
                  separator=","
                  duration={2}
                />
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      {/*3rd card */}
      <Grid item>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography gutterBottom>Total Recovered</Typography>
            <Typography variant="h4" component="h2">
              <CountUp
                start={100}
                end={data.TotalRecovered}
                separator=","
                duration={2}
              />
            </Typography>
            {!country && (
              <Typography variant="subtitle1" className={classes.newUpdate}>
                &#9650;{" "}
                <CountUp
                  start={100}
                  end={data.NewRecovered}
                  separator=","
                  duration={2}
                />
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cards;

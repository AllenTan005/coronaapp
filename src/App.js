import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Chart from "./components/Chart";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core/";
import Cards from "./components/Cards";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  Top: {
    marginTop: 20,
  },
  countrySelector: {
    paddingTop: 20,
    color: "#3700b3",
    fontWeight: "Bold",
  },
  title: {
    color: "#fff",
    fontWeight: "Bold",
    fontSize: 20,
  },
  defaultSelector: {
    color: "#fff",
  },
  innerSelector: {
    marginTop: 10,
  },
  chart: {
    marginTop: 50,
    width: "100%",
    padding: 20,
    border: '1px solid #eee',
    borderRadius:10,
    },
}));

const App = () => {
  const classes = useStyles();
  const [summary, setSummary] = useState(null);
  const [country, setCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countrySummary, setCountrySummary] = useState(null);
  const [countryResult, setCountryResult] = useState(null);

  const url = "https://api.covid19api.com";

  console.log(url)
  
  useEffect(() => {
    const getSummary = async () => {
      try {
        const { data } = await axios.get(`${url}/summary`);
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    };

    

    const getCountry = async () => {
      try {
        const { data } = await axios.get(`${url}/countries`);
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getSelectedCountry = async () => {
      try {
        const { data } = await axios.get(
          `${url}/total/dayone/country/${selectedCountry}`
        );
        setCountryResult(data);
        setCountrySummary({
          TotalConfirmed: data.reduce(
            (total, curr) => total + curr.Confirmed,
            0
          ),
          TotalDeaths: data.reduce((total, curr) => total + curr.Deaths, 0),
          TotalRecovered: data.reduce(
            (total, curr) => total + curr.Recovered,
            0
          ),
        });
      } catch (error) {
        console.error(error);
      }
    };
    getCountry();
    getSummary();
    getSelectedCountry();
  }, [selectedCountry]);

  return summary === null ? (
    <h1>loading..</h1>
  ) : (
    <>
      <Header />

      <Container>
        <Grid container>
          <Grid item lg={3} xs={12}>
            <div className={classes.Top}>
              <Typography variant="h5">Global Overview</Typography>
              <Typography>
                Last Update: {summary.Date.substring(0, 10)}
              </Typography>
              <Cards data={summary.Global} />
            </div>
          </Grid>

          <Grid item lg={9} xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.title}>
                Select Countries
              </InputLabel>
              <Select
                className={classes.countrySelector}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {country.map((item) => (
                  <MenuItem
                    className={classes.innerSelector}
                    key={item.slug}
                    value={item.Slug}
                  >
                    {item.Country}
                  </MenuItem>
                ))}
              </Select>
              <Cards data={countrySummary} country />
            </FormControl>
            <Grid container className={classes.chart}>
              <Grid item xs={12} md={4}>
                <Chart line lineData={countryResult} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Chart pie pieData={countrySummary} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;

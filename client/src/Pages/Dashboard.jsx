import React from 'react';
import Grid from "@mui/material/Grid";
import DashboardItem from '../Components/Dashboard/DashboardItem';
import DashboardSearch from '../Components/Dashboard/DashboardSearch';
import { useNewsContext } from '../ContextAPI/NewContext';


export default function Dashboard() {
  const { loading, news } = useNewsContext();

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Grid container>
      <Grid item>
        <DashboardSearch />
      </Grid>
      <Grid container spacing={2} direction="row" style={{ gap: "1rem", margin: "1rem", justifyContent: "flex-start", flexGrow: 1 }}>
        {!news.length ? <>No News Found</> : news.map((newsItem) => <DashboardItem newsItem={newsItem} key={newsItem?.url} />)}
      </Grid>
    </Grid>

  );
}


import React, { useEffect } from 'react';
import Grid from "@mui/material/Grid";
import DashboardItem from '../Components/Dashboard/DashboardItem';
import DashboardSearch from '../Components/Dashboard/DashboardSearch';
import { useNewsContext } from '../ContextAPI/NewsContext';
import Loading from "../Components/Common/Loading";
import EmptyItems from "../Components/Common/EmptyItems";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { loading, news, bookMarks, firstLoad, setFirstLoad } = useNewsContext();
  const navigate = useNavigate();
  useEffect(() => {
    setFirstLoad(false);
    if (!firstLoad){
      return;
    };
    if (bookMarks.length && firstLoad) {
      navigate("/bookmarks");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoad])

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item style={{ width: "100%" }}>
        <DashboardSearch />
      </Grid>
      <Grid container spacing={2} direction="row" style={{ gap: "1rem", margin: "1rem", justifyContent: "flex-start", width: "100%", height: "100%" }}>
        {!news.length ? <EmptyItems itemName="News" /> : news.map((newsItem) => <DashboardItem newsItem={newsItem} key={newsItem?.url} />)}
      </Grid>
    </Grid>
  );
}


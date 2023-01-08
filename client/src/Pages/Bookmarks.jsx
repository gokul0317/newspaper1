import React from 'react';
import Grid from "@mui/material/Grid";
import DashboardItem from '../Components/Dashboard/DashboardItem';
import { useNewsContext } from '../ContextAPI/NewsContext';
import Loading  from "../Components/Common/Loading";
import EmptyItems from "../Components/Common/EmptyItems";

export default function Bookmarks() {
  const { loading, bookMarks, bookmarkLoading } = useNewsContext();

  if (loading || bookmarkLoading) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid container spacing={2} direction="row" style={{ gap: "1rem", margin: "1rem", justifyContent: "flex-start", width: "100%", height: "100%"}}>
        {!bookMarks.length ? <EmptyItems itemName="Bookmarks" /> : bookMarks.map((newsItem) => <DashboardItem newsItem={newsItem} key={newsItem?.url} />)}
      </Grid>
    </Grid>

  );
}


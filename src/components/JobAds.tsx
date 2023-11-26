import React from 'react'
import { useAuthBackend } from '../hooks/backend';
import { useParams } from 'react-router-dom';
import { Response } from "../utils/utils.types";
import { Stack, Typography } from '@mui/material';
import JobCard from './job-cards/horizontal';
export default function JobAds() {

    const {id} = useParams();
    const { data, loading, error } = useAuthBackend<Response<any[]>, Error>(
        `/advertisement/company/ads?id=${id}`
      );
  return (
    <Stack spacing={2}>
    {!data?.result.length && !loading && (
      <Typography
        variant="h2"
        paragraph
        textAlign="center"
        color="secondary"
      >
        No Results found
      </Typography>
    )}
    {data?.result.map((card) => (
      <JobCard card={card} key={"any" + card.id} />
    ))}
  </Stack>
  )
}

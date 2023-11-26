import React from 'react'
import { useAuthBackend } from '../hooks/backend';
import { Response } from "../utils/utils.types";
import { Card, Grid } from '@mui/material';
import { BACKEND_URL } from '../constants/config';
import CompanyCard from './job-cards/comapnyCard';
export default function CompanyPage1() {

    const { data, loading, error } = useAuthBackend<Response<any[]>, Error>(
        "/request/companies"
      );

  return (
   <Grid>
       {
              data?.result.map((item)=>{
                return (
                    <Grid item md={4} xs={12} key={item.id}>
                       <CompanyCard card1={item} key={"any"+item.id} />

                    </Grid>
                )
                })
       }
   </Grid>
  )
}

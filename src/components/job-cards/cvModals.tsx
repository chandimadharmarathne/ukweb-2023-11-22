import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@apollo/client';
import { GET_CVS } from '../../query';
import client from '../../applo';
import { Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CvModal({data1, isOpen, onRequestClose}: any) {
  
  const {loading,error,data} = useQuery(GET_CVS,{
    client:client
   })
   const [selectedItems, setSelectedItems] = useState<any>([]);

  const toggleItemSelection = (itemId:any) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((item:any) => item !== itemId));
    } else {
      setSelectedItems([itemId]);
    }
  };

  return (
    <div>
      
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={'md'}
        onClose={onRequestClose}
        aria-describedby="alert-dialog-slide-description"
      >
       <div style={{
        display:'flex',
        justifyContent:'space-between',
        padding:10,
       }}>
       <div 
        style={{
          fontWeight:'bold',
        }}
       >{"Apply to choose your CV"}</div>
        <CloseOutlined onClick={onRequestClose}/>
       </div>

        <DialogContent>
        <Grid container>
      {data?.cvs.map((item:any, index:any) => (
        <Grid item xs={12} md={12} key={index}>
          <Stack
            spacing={2}
            direction={'row'}
            padding={10}
            height={100}
            style={{
              backgroundColor: selectedItems.includes(item.id)
                ? 'lightblue' // Change the background color when selected
                : '#f5f5f5',
              padding: 10,
              justifyContent: 'space-between',
              border: selectedItems.includes(item.id)
                ? '2px solid blue' // Add a border when selected
                : 'none',
            }}
          >
            
            <div style={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-around'
              //paddingRight:10,
            }}>
              <div style={{
                display:'flex',
                backgroundColor:'red',
                justifyContent:'center',
                alignItems:'center',
              }}>Pdf</div>
            <h3>{item.label}</h3>
            </div>
            <button style={{
              backgroundColor:selectedItems.includes(item.id) ? 'red' : 'blue',
              color:'white',
              padding:10,
              borderRadius:10,
              border:'none',
              outline:'none'
            }}
            onClick={() => toggleItemSelection(item.id)}>
              {selectedItems.includes(item.id) ? 'Unselect' : 'Select'}
            </button>
          </Stack>
        </Grid>
      ))}
    </Grid>
 

        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose}>Disagree</Button>
          <Button onClick={onRequestClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

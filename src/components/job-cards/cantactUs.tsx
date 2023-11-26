import { CloseOutlined } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import Form from './contactForm';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function CantactUs({open,onClose}:any) {
  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={'lg'}
        onClose={onClose}
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
       >{"Post A Job"}</div>
        <CloseOutlined onClick={onClose}/>
       </div>

        <DialogContent>
      
      <Form/>
 

        </DialogContent>
       
      </Dialog>
    </div>
  )
}

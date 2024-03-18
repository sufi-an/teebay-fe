

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import MultiSelect from '../../components/select/MultiSelect'
import SingleSelect from '../../components/select/SingleSelect'

const steps = ['Title', 'Categories', 'Description', 'Price & Rent', 'Summary'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    // return step === 1;
    return false
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              
            </Step>
          );
        })}
      </Stepper>
      <form>
      {activeStep === 0 && (
         <div className="grid grid-cols-2 gap-4">
         <TextField
           id="outlined-basic"
           label="First Name"
           variant="outlined"
           type="string"
        //    defaultValue={userData.first_name}
        //    inputProps={{ maxLength: 50 }}
        //    {...register("first_name")}
         />
         </div>
      )}
      {activeStep === 1 && (
         <div className="grid grid-cols-2 gap-4">
         <MultiSelect/>
          </div>
      )}
      {activeStep === 2 && (
         <div className="grid grid-cols-2 gap-4">
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          fullWidth
          rows={4}
          defaultValue="Default Value"
        />
         </div>
      )}
      {activeStep === 3 && (
         <div className="grid grid-cols-2 gap-4">
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
           <TextField
            margin="normal"
            required
            
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <SingleSelect/>
         </div>
      )}
      {activeStep === 4 && (
         <div className="grid grid-cols-2 gap-4">
         summary
         </div>
      )}
      </form>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
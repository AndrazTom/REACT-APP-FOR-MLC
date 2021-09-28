import React from 'react';
import { Measures } from './dataOptions';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';


class Eval extends React.Component {

  constructor(props) {
    super(props);
    this.handleMeasure = this.handleMeasure.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.handleMeasureError= this.handleMeasureError.bind(this);
    this.handleRangeError= this.handleRangeError.bind(this);

    this.state = {
      SelectedMeasure: "",
      SelectedRange: "",
      MeasureError: false,
			RangeError: false
    }
  }

	handleMeasure(e, v) {
    this.setState({
      SelectedMeasure: v
    }, ()=>console.log('eval'+this.state.SelectedMeasure))
    this.props.onHandleMeasureChange(v, this.props.id);
	}

  handleRange(e) {
    this.setState({
      SelectedRange: e.target.value
    }, ()=>{this.handleRangeError()})
    this.props.onHandleRangeChange(e.target.value, this.props.id);
	}
	
  handleMeasureError() {
      if (this.state.SelectedMeasure)
        this.setState({ MeasureError: false })
      else
        this.setState({ MeasureError: true })
  }

  handleRangeError() {
    const regex = new RegExp(/^(\d+(\.\d)?\d*(-\d+(\.\d)?\d*)?|[><]=?\d+(\.\d)?\d*)$/)
    if ( this.state.SelectedRange === '' || regex.test(this.state.SelectedRange))
      this.setState({ RangeError: false })
    else
      this.setState({ RangeError: true })
  }

 
  render() {
    
    return (

      <Grid container spacing = {2}>
        <Grid item>
          <Autocomplete
            multiple = {false}
            limitTags={50}
            options={Measures}
            sx={{width: 300}}
            onChange={this.handleMeasure}
            renderInput={(params) => 
            <TextField {...params}
            value={this.state.SelectedMeasure}
            variant='outlined'
            label = "Evaluation measure"
            color='secondary'
            onChange={this.handleMeasureError}
            error={
              this.state.SelectedMeasure==="" &&
              this.state.SelectedRange!=="" &&
              !this.state.RangeError
            }
            //helperText={this.state.MeasureError &&  "Please enter a measure."}
            />}
					/>
        </Grid> 

        <Grid item>
        
        <TextField
            label='Range'
            color='secondary'
            margin='dense'
            variant='outlined'
            value={this.state.SelectedRange}
            onChange={this.handleRange}
            error={this.state.RangeError}
            helperText={this.state.RangeError &&  "Please enter a valid range."}
        />
				</Grid>
      </Grid>
    );
   }
 }
  
 export default Eval;
 
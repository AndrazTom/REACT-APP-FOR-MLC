import React from 'react';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { Measures } from './dataOptions'


class EvaluationMeasureRange extends React.Component {
  constructor(props) {
    super(props);
    this.handleMeasure = this.handleMeasure.bind(this);
    this.handleRange = this.handleRange.bind(this);
    this.handleMeasureError= this.handleMeasureError.bind(this);
    this.handleRangeError= this.handleRangeError.bind(this);

    this.state = {
      SelectedMeasure: props.measure,
      SelectedRange: props.range,
      MeasureError: false,
			RangeError: false,
      disabledMeasures: props.disabledMeasures
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps!== this.props){
    console.log("updated")
    this.setState({
      SelectedMeasure: this.props.measure,
      SelectedRange: this.props.range,
      disabledMeasures: this.props.disabledMeasures,
    })
    }
  }

	handleMeasure(e, v) {
    this.setState({
      SelectedMeasure: v,
    }, ()=>console.log(v+'eval'+this.state.SelectedMeasure+this.state.disabledMeasures))
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
            getOptionDisabled={(option) => !!this.state.disabledMeasures.find(element => element === option)}
            value={this.state.SelectedMeasure}
            sx={{width: 300}}
            onChange={this.handleMeasure}
            renderInput={(params) => 
              <TextField {...params}
                variant='outlined'
                label = "Evaluation measure"
                color='secondary'
                onChange={this.handleMeasureError}
                error={this.state.SelectedMeasure==="" && this.state.SelectedRange!=="" && !this.state.RangeError}
              />
            }
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
  
 export default EvaluationMeasureRange;
 
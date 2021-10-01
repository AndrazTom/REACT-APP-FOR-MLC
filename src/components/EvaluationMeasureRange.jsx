import React from 'react';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { Measures } from './dataOptions'


class EvaluationMeasureRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMeasure: props.measure,
      selectedRange: props.range,
			rangeError: false,
      disabledMeasures: props.disabledMeasures
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps!== this.props){
      this.setState({
        selectedMeasure: this.props.measure,
        selectedRange: this.props.range,
        disabledMeasures: this.props.disabledMeasures,
      })
    }
  }

	handleMeasure = (e, v) => {
    this.setState({selectedMeasure: v})
    this.props.onHandleMeasureChange(v, this.props.id);
	}

  handleRange = (e) => {
    this.setState({selectedRange: e.target.value}, ()=>{this.handleRangeError()})
    this.props.onHandleRangeChange(e.target.value, this.props.id);
	}

  handleRangeError = () => {
    const regex = new RegExp(/^(\d+(\.\d)?\d*(-\d+(\.\d)?\d*)?|[><]=?\d+(\.\d)?\d*)$/)
    if ( this.state.selectedRange === '' || regex.test(this.state.selectedRange))
      this.setState({ rangeError: false })
    else
      this.setState({ rangeError: true })
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
            value={this.state.selectedMeasure}
            sx={{width: 300}}
            onChange={this.handleMeasure}
            renderInput={(params) => 
              <TextField {...params}
                variant='outlined'
                label = "Evaluation measure"
                color='secondary'
                error={this.state.selectedMeasure==="" && this.state.selectedRange!=="" && !this.state.rangeError}
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
            value={this.state.selectedRange}
            onChange={this.handleRange}
            error={this.state.rangeError}
            helperText={this.state.rangeError &&  "Please enter a valid range."}
          />
				</Grid>
      </Grid>
    );
   }
 }
 export default EvaluationMeasureRange;
 
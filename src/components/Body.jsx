import React from 'react';
import { Datasets, Methods } from './dataOptions';
import Eval from './eval';
import { Autocomplete } from '@mui/material';
import { Button, TextField } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@material-ui/core';

class Body extends React.Component {

	constructor(props) {
    super(props);
		this.parentHandleMeasure = this.parentHandleMeasure.bind(this);
    this.parentHandleRange = this.parentHandleRange.bind(this);
		this.handleAdd = this.handleAdd.bind(this)
		this.handleRemove = this.handleRemove.bind(this)


		this.state = {
			idSelectedEvals: 0,
      selectedEvals: [
				{
					"measure": "",
					"range": "",
					"id": 0
				}
			],
    }
  }

	parentHandleMeasure(val, id) {
		let newSelectedEvals = this.state.selectedEvals
		newSelectedEvals[id].measure = val
		this.setState({
			selectedEvals: newSelectedEvals 
		})
	}

	parentHandleRange(val, id) {
    let newSelectedEvals = this.state.selectedEvals
		newSelectedEvals[id].range = val
		this.setState({
			selectedEvals: newSelectedEvals 
		})
	}

	updateMeasures(){
		const evals = [];

		for(let i = 0; i<this.state.selectedEvals.length; i++){
			evals.push(
				<Grid container spacing = {2}>
					<Grid item>
						<Eval
							onHandleMeasureChange={this.parentHandleMeasure}
							id = {i}
							onHandleRangeChange={this.parentHandleRange}
						/>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => this.handleRemove(i)}
						>
							<DeleteIcon/>
						</Button>
					</Grid>
				</Grid>
			)
		}
	return evals
	}
	

	handleAdd() {
		let newId = this.state.idSelectedEvals + 1
		let newSelectedEvals = this.state.selectedEvals
		newSelectedEvals[this.state.selectedEvals.length]= {
			"measure": "",
			"range": "",
			"id": newId
		}
		this.setState({
			idSelectedEvals: newId,
			selectedEvals: newSelectedEvals
		})
		console.log(this.state.selectedEvals)
	}

handleRemove(x) {
  let newSelectedEvals = []
  for(let i = 0; i<this.state.selectedEvals.length; i++){
		if(i!==x){
    	newSelectedEvals.push(this.state.selectedEvals[i])
		}
  }
  this.setState({
    selectedEvals: newSelectedEvals
  }, ()=>console.log(this.state.selectedEvals))
	this.updateMeasures()
}

  render() {
    return (
			<React.Fragment>
				<Autocomplete
							multiple = {true}
							limitTags={50}
							options={Datasets}
							sx={{width: 300}}
							renderInput={(params) => 
							<TextField {...params}
							variant='outlined'
							label = {"Datasets"}
							color='secondary'
							/>}
						/>
					<Autocomplete
							multiple = {true}
							limitTags={3}
							options={Methods}
							sx={{width: 300}}
							renderInput={(params) => 
							<TextField {...params}
							variant='outlined'
							label = "Methods"
							color='secondary'
							/>}
						/>
					<Autocomplete
							multiple = {true}
							limitTags={50}
							options={["1", "2", "3"]}
							sx={{width: 300}}
							renderInput={(params) => 
							<TextField {...params}
							variant='outlined'
							label = "Fold"
							color='secondary'
							/>}
						/>

						{this.updateMeasures()}				
							<Button
								variant='contained'
								color='secondary'
								onClick={this.handleAdd}
							>
								<AddIcon />
							</Button>
			</React.Fragment>
		);
  }
}

export default Body;
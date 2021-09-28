import React from 'react';
import { Datasets, Methods } from './dataOptions';
import EvaluationMeasureRange from './EvaluationMeasureRange';
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
			evaluationHTMLElements: [],
      		selectedEvals: [
				{
					"measure": "",
					"range": "",
					"id": 0
				}
			]
    	}
  	}

	componentDidMount(){
		this.setEvaluationHTMLElements()
	}

	parentHandleMeasure(val, id) {
		let newSelectedEvals = []
		this.state.selectedEvals.forEach(el => {
			if(el.id === id){
				el.measure = val
			}
			newSelectedEvals.push(el)
		})
		this.setState({
			selectedEvals: newSelectedEvals 
		})
	}

	parentHandleRange(val, id) {
		let newSelectedEvals = []
		this.state.selectedEvals.forEach(el => {
			if(el.id === id){
				el.range = val
			}
			newSelectedEvals.push(el)
		})
		this.setState({
			selectedEvals: newSelectedEvals 
		})
	}

	setEvaluationHTMLElements(){
		console.log("set HTML")
		console.log(this.state.selectedEvals)
		const evals = [];
		for(let i = 0; i<this.state.selectedEvals.length; i++){
			evals.push(
				<Grid container spacing = {2}>
					<Grid item>
						<EvaluationMeasureRange
							onHandleMeasureChange={this.parentHandleMeasure}
							id = {this.state.selectedEvals[i].id}
							range = {this.state.selectedEvals[i].range}
							measure = {this.state.selectedEvals[i].measure}
							onHandleRangeChange={this.parentHandleRange}
							key = {this.state.selectedEvals[i].id}
						/>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => this.handleRemove(this.state.selectedEvals[i].id)}
						>
							<DeleteIcon/>
						</Button>
					</Grid>
				</Grid>
			)
		}
		this.setState({
			evaluationHTMLElements: evals
		})
	}
	

	handleAdd() {
		let newSelectedEvals = this.state.selectedEvals
		newSelectedEvals.push({
			"measure": "",
			"range": "",
			"id": this.state.selectedEvals[this.state.selectedEvals.length-1].id+1
		})

		this.setState({
			selectedEvals: newSelectedEvals
		}, 
		()=>{
			console.log("handle add")
			console.log(this.state.selectedEvals)
			this.setEvaluationHTMLElements()
		})
		
	}

	handleRemove(x) {
		console.log("handle remove "+x)
		let newSelectedEvals = []
		for(let i = 0; i<this.state.selectedEvals.length; i++){
			if(this.state.selectedEvals[i].id!==x)
				newSelectedEvals.push(this.state.selectedEvals[i])
		}
		this.setState({
			selectedEvals: newSelectedEvals
		}, 
		()=>{
			console.log("handle remove")
			console.log(this.state.selectedEvals)
			this.setEvaluationHTMLElements()
		})
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
						<TextField {...params} variant='outlined' label = {"Datasets"} color='secondary' />
					}
				/>
				<Autocomplete
					multiple = {true}
					limitTags={3}
					options={Methods}
					sx={{width: 300}}
					renderInput={(params) => 
						<TextField {...params} variant='outlined' label = "Methods" color='secondary'/>
					}
				/>
				<Autocomplete
					multiple = {true}
					limitTags={50}
					options={["1", "2", "3"]}
					sx={{width: 300}}
					renderInput={(params) => 
						<TextField {...params} variant='outlined' label = "Fold" color='secondary'/>
					}
				/>
				{this.state.evaluationHTMLElements}				
				<Button variant='contained' color='secondary' onClick={this.handleAdd}>
					<AddIcon />
				</Button>
			</React.Fragment>
		);
  	}
}
export default Body;
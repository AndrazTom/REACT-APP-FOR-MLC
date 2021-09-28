import React from 'react';
import {Button, AppBar, Toolbar, Typography, ButtonGroup } from '@material-ui/core';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Box from '@material-ui/core/Box';

class Header extends React.Component {

  render() {
    return (
			<AppBar position="static">
				<Toolbar>
					<Box display='flex' flexGrow={1}>
					<Typography variant='h5'>
						DATA QUERYING
					</Typography>
					</Box>
					<ButtonGroup 
						variant="contained"
						color='secondary'
						size='small'
					>
						<Button>
							<FilterAltIcon />
							<b>filter</b>
						</Button>
						<Button>
							<RestartAltIcon />
							<b>reset</b>
						</Button>
					</ButtonGroup>
				</Toolbar>
			</AppBar>
    )
  }
}
 
export default Header;

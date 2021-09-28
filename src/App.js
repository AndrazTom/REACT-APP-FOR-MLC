import React from 'react'
import './App.css';
import Header from './components/Header';
import BenchmarkDataFilter from './components/BenchmarkDataFilter'
import { customTheme } from './components/customTemplate';
import { ThemeProvider } from '@material-ui/core/styles';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={customTheme()}>
          <Header />
          <BenchmarkDataFilter />    
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;

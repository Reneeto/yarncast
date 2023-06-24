/*Challenges:
Build a react component called Box, render that component to the page.

Give Box a property (prop) that dictates what text it renders and render an 'X'.

Give Box some style! Make it a button with height 100px and width 100px.

Have Box render text based on its state.

Have Box's state change every 300ms, alternating between 'X' and 'O'.

Where should this be written?
This is a good moment to learn about the component cycle!
Make sure to clear your interval!
Have Box's state change based on clicks. Set initial state to '-'.

How do we set up an event handler for React components?
Make Box alternate between 'X' and 'O' on clicks.
Let's make a new component called Row that renders 3 Box components.

Pull the state out of each Box and into the higher level Row component.

Don't forget to pass each child Box a key property.
Rig up the event handling so that clicks on a Box component change the state on their parent Row component.

Now create a Board component that renders three Row components.

Pull the state out of the Row components and into the Board component.

Rig up event handling so clicks on Box's bubble up to the Board itself. */

import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputNum: 3,
      render: [['-', '-', '-'],['-', '-', '-'],['-', '-', '-']] 
    };
    this.xToO = this.xToO.bind(this);
    // this.assembleBoard = this.assembleBoard.bind(this);
  }

  xToO(rowIndex, boxIndex) {
    //create deep copy of render array
    const copyRender = JSON.parse(JSON.stringify(this.state.render));
    //if corresponding render element is -, then reassign copyRender element at the index of keys to X, then use setState to make current state copyRender instead of render
    if (this.state.render[rowIndex][boxIndex] === '-') {
      copyRender[rowIndex][boxIndex] = 'X';
      this.setState({ render: copyRender });
    }
    else if (this.state.render[rowIndex][boxIndex] === 'X') {
      copyRender[rowIndex][boxIndex] = 'O';
      this.setState({ render: copyRender });
    }
    else if (this.state.render[rowIndex][boxIndex] === 'O') {
      copyRender[rowIndex][boxIndex] = 'X';
      this.setState({ render: copyRender });
    }
  }

  // componentDidMount() {
  //   console.log('mounting  happened here');
  //   this.assembleBoard();
  // }

  // assembleBoard() {
  //   const render = [];
  //   for(let i = 0; i < this.state.inputNum; i++) {
  //     render.push(['-', '-', '-']);
  //     // const subArray = [];
  //     // for(let j=0; j< this.state.inputNum; i++){
  //     //   subArray.push('-');
  //     // }
  //     // render.push(subArray);
  //   }
  //   this.setState({
  //     render: render
  //   });
  // }

  render() {
    const rowArray = [];
    for(let i = 0; i < this.state.inputNum; i++) {
      const row = <Row subArray={this.state.render[i]} xToO={this.xToO} rowIndex={i} key={`Row${i}`} inputNum={this.state.inputNum} />;
      rowArray.push(row);
    }

    return (
      <div className='row-div' style={{ display: 'flex', flexDirection: 'column' }}>
        {rowArray}
      </div>
    );
  }
}


class Row extends Component {
  render() {
    const boxArray = [];
    for(let i = 0; i < this.props.inputNum; i++) {
      const box = <Box rowIndex={this.props.rowIndex} element={this.props.subArray[i]} xToO={this.props.xToO} boxIndex={i} key={`Box${i}`}/>;
      boxArray.push(box);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {boxArray}
      </div>
    );
  }
}

class Box extends Component {
  render() {
    return (
      <div>
        <button type="button" className='box-btn' onClick={() => this.props.xToO(this.props.rowIndex, this.props.boxIndex)}>
          {this.props.element}
        </button>
      </div>
    );
  }
}



render(<App />, document.querySelector('#root'));
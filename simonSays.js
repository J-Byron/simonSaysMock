'use strict';

class Square{
  constructor(_elementID){
    this._elementID = _elementID;
    // Instance 'context'(this) available in arrow Function only
    $(this._elementID).on('click', ()=>{
      // Click was not correct Click
      if(this.board.getCorrectNext() != this._elementID){
        this.board.resetScore();
        this.board.endGame();
      }
      // Click was final correct click
      else if((this.board.getCorrectNext() == this._elementID)&&(this.board.turnInPattern == this.board.pattern.length -1 )) {
        this.board.increaseScore();
        this.board.resetTurnInPattern();
        for(let pattern of this.board.pattern){
          console.log(pattern._elementID);
        }
      }
      // Click was correct click
      else if(this.board.getCorrectNext() == this._elementID){
        this.board.increaseTurnInPattern();

      }
    });// End element on click
  }// End Square constructor

  set(board){
    this.board = board;
  }// end set board

  get(_elementID){
    return this._elementID;
  }// end get _elementID
} // End Square Class


class Board{
  constructor(squares, patternCount = 3){
    this.squares = squares;
    this.score = 0;
    this.patternCount = patternCount;
    this.pattern = this.generateStartPattern();
    this.gameOver = false;
    this.turnInPattern = 0;

    for(let element of this.squares){
      element.set(this);
    }
    this.animatePattern();
  }// End board class constructor

  increaseTurnInPattern(){
    this.turnInPattern++;
  }// end increaseTurnInPattern


  resetTurnInPattern(){
    this.turnInPattern = 0;
    this.generateNextPattern();
    this.animatePattern();
  }// end resetTurnInPattern


  getCorrectNext(){
    if(this.gameOver){
      console.log('GAME - OVER');
    }
    else{
      return this.pattern[this.turnInPattern]._elementID;
    }
  } // end getCorrectNext


  generateStartPattern(){
    let pattern = [];
    for(let i = 0; i < this.patternCount; i++){
      pattern.push(this.selectRandomSquare());
    }
    return pattern;
  }// end generateStartPattern

  increaseScore(){
    this.score++;
    let scoreElement = $('#scoreElement')
    scoreElement.empty();
    scoreElement.append(`<h1>Score - ${this.score}</h1>`);
  }// end increaseScore

  resetScore(){
    this.score = 0
    let scoreElement = $('#scoreElement')
    scoreElement.empty();
    scoreElement.append(`<h1> GAME - OVER </h1>`);
  }// end resetScore

  generateNextPattern(){
    this.pattern.push(this.selectRandomSquare());
  }// end generateNextPattern

  animatePattern(){
    for(let i = 0; i<this.pattern.length;i++){
      //animation
      setTimeout( ()=>{
        $(this.pattern[i].get()).animate({
          opacity: 0.1
        },200);
        $(this.pattern[i].get()).animate({
          opacity: 1
        },400);
      }, i*800 );
    }
  }// end animatePattern

  restartGame(){
    this.score = 0;
    this.patternCount = 2;
    this.pattern = [];
  } // End restart Game

  endGame(){
    if(!this.gameOver){
      this.gameOver = true;
      this.pattern = [];
      this.turnInPattern = 0;
      this.score = 0;

      for(let square of this.squares){
        $(square.get()).on('click');
      }
    }
  }// end endGame



  // Helper Functions


  // Return a random square elemet from squares
  selectRandomSquare(){
    return this.squares[Math.floor(Math.random() * this.squares.length)];
  }// End selectRandomSquare
} // End Board Class

$(document).ready(function(){

  // Theme functionality
  let theme = {dark:true};

  $(`#theme`).on('click',function(){
    if(theme.dark){
      $(`h1`).css('color','#414a4c');
      $(`body`).css('background-color','#ececec');
      theme.dark = false;
    }else{
      $(`h1`).css('color','#ececec');
      $(`body`).css('background-color','#3b444b');
      theme.dark = true;
    }
  }); // end theme on click

  // Create an array to hold element IDs
  let square_elementIDs = ['#squareA','#squareB','#squareC',
  '#squareD'];

  // Create an array of Squares with IDs
  let squares = square_elementIDs.map(el => new Square(el));

  // Initialize board with [square]
  let board = new Board(squares);

  // Output pattern in console
  for(let pattern of board.pattern){
    console.log(`${pattern.get()}`);
  }
}// end function call
);

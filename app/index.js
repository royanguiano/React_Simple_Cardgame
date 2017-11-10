import React from 'react'
import ReactDOM from 'react-dom'

const gamesStatesEnum = {   first: 'waiting first card', 
                           second: 'waiting second card', 
                           wrong: 'wrong',
                           finished: 'game over' 
                        }; 
var turn = 0; 

//create array 
function createArray(x, y){ return Array.apply( null, Array( x )).map( (e) => Array( y )); }

//shuffle cards function
function shuffleArray(a) {  
  var j, x, i; 
  for(i = a.length; i; i--){
    j = Math.floor(Math.random() * i ); 
    x = a[i - 1]; 
    a[i - 1] = a[j]; 
    a[j] = x; 
  }
}

//card component
class Card extends React.Component {
  render() {
    return <div className = 'card' ><span>{ this.props.card.flipped ? this.props.card.cardValue : '?' }</span></div>; 
  }
}

//layout component 
class Layout extends React.Component {  
	constructor(props){
  	super(props); 
	
	turn = props.width + props.height; 

    if( props.width * props.height % 2 == 1 ){
    	alert('odd numbers of cards'); 
   }
   
   var cards = createArray( props.height, props.width );
	 var numbers = []; 
   
   for(var oneDIndex = 0; oneDIndex < props.height * props.width; oneDIndex++){
   			numbers.push(Math.floor(oneDIndex / 2 ) + 1 ); 
   }
   
   shuffleArray(numbers); 
   
    for( var rowIndex = 0; rowIndex < props.height; rowIndex++ ){
      for( var collumnIndex = 0; collumnIndex < props.width; collumnIndex++ ){
        cards[ rowIndex ][ collumnIndex ] = {  cardValue: numbers[rowIndex * props.width + collumnIndex],
                                               flipped: false, 
                                               rowIndex: rowIndex, 
                                               collumnIndex: collumnIndex }
      }
    }

    //initialize state of components
    this.state = { 	cards: cards, 
                    gameState: gamesStatesEnum.first, 
                    firstCard: null, 
                    secondCard: null, 
                    player: 'player one', 
                    reset: false };  
    
  }

resetGame(){
  console.log('reseting game')
}

//check what happens when card is clicked
  cardClick( card ){
  	if( !card.flipped ){
      switch( this.state.gameState ){
        //case one
        case gamesStatesEnum.first: 
            this.state.cards[ card.rowIndex ][ card.collumnIndex ].flipped = true; 
            this.setState({ cards : this.state.cards, firstCard: card, gameState: gamesStatesEnum.second });
        break; 

        //case two
        case gamesStatesEnum.second: 
            this.state.cards[ card.rowIndex ][ card.collumnIndex ].flipped = true;
			      turn = turn - 2; 

           if( this.state.firstCard.cardValue == card.cardValue ){
             this.setState({ gameState: gamesStatesEnum.first, cards: this.state.cards }); 
            } else { 
              if(this.state.player == 'player one'){
              	this.setState({player: 'player two'}); 
              } else {
              	this.setState({player: 'player one'}); 
              }
              this.setState({ gameState: gamesStatesEnum.wrong, cards: this.state.cards , secondCard: card}); 
            }
        break; 

      //case three
       case gamesStatesEnum.wrong: 
            this.state.cards[ this.state.firstCard.rowIndex ][ this.state.firstCard.collumnIndex ].flipped = false; 
            this.state.cards[ this.state.secondCard.rowIndex ][ this.state.secondCard.collumnIndex ].flipped = false; 
            this.state.cards[ card.rowIndex ][ card.collumnIndex ].flipped = true; 
            this.setState({ gameState: gamesStatesEnum.second, cards: this.state.cards , firstCard: card }); 
       	break; 
      } 
 	}
  }
  
	render() {
  	const cardsRendered = this.state.cards.map(( rowOfCards, rowIndex ) => 
														<tr>{ rowOfCards.map(( card, indexofCardinRow ) =>
															<td onClick = {() => this.cardClick( card ) }>{<Card card={ card } />}</td> )} 
						                                </tr>);
						                                          
    return  <div>
               <div>{ this.state.gameState }  <hr />
               Turn: {this.state.player}</div>
                <table>
                  <tbody>{ cardsRendered }</tbody>
                </table>
                <button onClick={this.resetGame}>Reset Game</button>
            </div>
  }
}

ReactDOM.render(
 	<Layout width = { 6 } height = { 6 }/>, document.getElementById('root')
);



















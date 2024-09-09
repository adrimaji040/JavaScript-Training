/**
* randomInt:
* Returns a random positive integer from min to max
* @Parameters: min - the smallest possible number, max - largest possible number
* @Return: Int
* @Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function randomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}


let arrayDomino = [];
let arrayFaces = ["face-0","face-1","face-2","face-3", "face-4", "face-5", "face-6"];

function GetArrayDominos(){
  for(let i=0; i <= 6; i++){
    for(let j=0; j <= 6; j++ ){
        arrayDomino.push([i,j]);
    }
  } 
}


function shuffleArray(){
  for(let i=0; i < arrayDomino.length; i++){
    let j = Math.floor(Math.random() * (i + 1));
     [arrayDomino[i],arrayDomino[j]] = [arrayDomino[j],arrayDomino[i]];
  }
}

function createTiles(){
  let $container = document.getElementById('container');
  

  for(let i = 0; i < 50; i++){
    // create col
    let col = document.createElement('div');
    col.classList.add('item');
    let controlCol = 1;
    let divCol;

    let top = arrayDomino[i][0];
    let bot = arrayDomino[i][1];
    
    let divTop = document.createElement('div');
    divTop.classList.add('dice');
    divTop.classList.add(arrayFaces[top]);

    for(let k = 1; k <= top; k++){     

      let divDot = document.createElement('div');
      divDot.classList.add('dot'); 

      /*For four dot*/
      if( top === 4 ){
        if(k === 1 ){
           divCol = document.createElement('div');
           divCol.classList.add('column');
        }
         if ( k === 3){
          divTop.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');        
        }
        if ( k === 4){
          divTop.appendChild(divCol);
        }

         divCol.appendChild(divDot);
      } 
      
      /*For five dot*/
      if(top === 5){
        if(k === 1){
          divCol = document.createElement('div');
          divCol.classList.add('column');          
        } 

        if( k ===3){
          divTop.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');
        }

        if (k === 4) {
          divTop.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');
        }
        divCol.appendChild(divDot);
        if ( k === 5){
          divTop.appendChild(divCol);
        }
      }
      /*For six dot*/
      if(top === 6){

        if(k === 1){
          divCol = document.createElement('div');
          divCol.classList.add('column');          
        } 
        if (k === 4) {
          divTop.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');
        }
        divCol.appendChild(divDot);
        if ( k === 6){
          divTop.appendChild(divCol);
        }
      }
      
      if (top < 4){
        divTop.appendChild(divDot);
      }
    }


    /*Bottom*/
    let divBot =  document.createElement('div');
    divBot.classList.add('dice');
    divBot.classList.add(arrayFaces[bot]);

    for(let k = 1; k <= bot; k++){     

      let divDot = document.createElement('div');
      divDot.classList.add('dot'); 

      /*For four dot*/
      if( bot === 4 ){
        if(k === 1 ){
           divCol = document.createElement('div');
           divCol.classList.add('column');
        }
         if ( k === 3){
          divBot.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');        
        }
        if ( k === 4){
          divBot.appendChild(divCol);
        }

         divCol.appendChild(divDot);
      } 
      
      /*For five dot*/
      if(bot === 5){
        if(k === 1){
          divCol = document.createElement('div');
          divCol.classList.add('column');          
        } 

        if( k === 3){
          divBot.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');
        }

        if (k === 4) {
          divBot.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');
        }
        divCol.appendChild(divDot);
        if ( k === 5){
          divBot.appendChild(divCol);
        }
      }
      /*For six dot*/
      if(bot === 6){

        if(k === 1){
          divCol = document.createElement('div');
          divCol.classList.add('column');          
        } 
        if (k === 4) {
          divBot.appendChild(divCol);
          divCol = document.createElement('div');
          divCol.classList.add('column');
        }
        divCol.appendChild(divDot);
        if ( k === 6){
          divBot.appendChild(divCol);
        }
      }
      
      if (bot < 4){
        divBot.appendChild(divDot);
      }
    }


    // append divTop and divBot to col
    col.appendChild(divTop);
    col.appendChild(divBot);

    // append col to $container
    $container.appendChild(col);
    
  }
}

  GetArrayDominos(); 
  GetArrayDominos(); 
  shuffleArray();
  createTiles()  






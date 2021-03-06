import React from 'react';

export default function Goblin(props) {
  return (
    // be sure you take a look at this component i'm handing you and figure out what props it will need to work correctly.
    <div 
      className='goblin' 
      //short circuit - props.handleDeleteGoblin is true (ie it exists and was passed down from props) then run handDeleteGoblin for the current goblin id
      onClick={() => 
        props.handleDeleteGoblin && props.handleDeleteGoblin(props.goblin.id)
      }
    >
      <h3>{props.goblin.name}</h3>  
      <img src="goblin.png" style={{ backgroundColor: props.goblin.color }} />
      <p>{props.goblin.hp} HP</p>
    </div>
  );
}

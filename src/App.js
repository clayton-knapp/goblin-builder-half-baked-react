import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  
  // track: 
  //   allGoblins, an array of all goblins
  const [allGoblins, setAllGoblins] = useState([]);
  //   filteredGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
  const [filteredGoblins, setFilteredGoblins] = useState([]);
  //   goblinFormName, which is how we track the user input for the current name of the goblin in the form
  const [goblinFormName, setGoblinFormName] = useState('');
  //   goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
  const [goblinFormHP, setGoblinFormHP] = useState(1);
  //   goblinFormColor, which is how we track the user input for the current color of the goblin in the form
  const [goblinFormColor, setGoblinFormColor] = useState('lightgreen');

  //super stretch - use effect
  const [query, setQuery] = useState('');

  
  function submitGoblin(e) {
    e.preventDefault();
    
    // on submit, make a new goblin object with a random id, a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    const newGoblin = {
      id: (Math.ceil(Math.random() * 100)),
      name: goblinFormName,
      hp: goblinFormHP,
      color: goblinFormColor
    };

    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setAllGoblins([...allGoblins, newGoblin]);
    
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
    setGoblinFormName('');
    setGoblinFormHP(1);
    setGoblinFormColor('lightgreen');

  }


  function handleDeleteGoblin(id) {
    // find the index of the goblin in allGoblins with this id
    const index = allGoblins.findIndex(goblin => goblin.id === id);

    // use splice to delete the goblin object at this index
    allGoblins.splice(index, 1);

    // update the allGoblins array immutably to this new, smaller array
    setAllGoblins([...allGoblins]);


    // STRETCH ALSO REMOVE FROM FILTERED

    const index2 = filteredGoblins.findIndex(filteredGoblin => filteredGoblin.id === id);

    filteredGoblins.splice(index2, 1);

    setFilteredGoblins([...filteredGoblins]);
  }

  //super stretch use effect
  useEffect(handleFilterGoblins, [query, allGoblins]);

  function handleFilterGoblins() {
    // use the filter method to get an array of goblins whose name includes this search argument
    // if there is a search argument, set the filtered goblins to the filtered goblins
    // if the search argument is undefined, set the filtered goblins in state to just be the array of all goblins

    if (query) {
      const tempFilteredGoblins = allGoblins.filter(goblin => 
        goblin.name.includes(query)
      );
  
      setFilteredGoblins(tempFilteredGoblins);
      
    } 

    //when you just delete a letter it doesnt change the filter for some reason, its still has the last thing you typed creating the filtered array, it hasnt deleted the array, so the array still exists and it shows that instead of evaluating to false and showing the all goblins array
    //hence we need the else here to say if search is false and there is no query make the filtered array all goblins
    else {
      setFilteredGoblins([...allGoblins]);
    }

  }

  return (
    <div className="App">
      <div className='current-goblin quarter'>
        <Goblin goblin={{
          /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state 
          */
          name: goblinFormName,
          hp: goblinFormHP,
          color: goblinFormColor
        }}/>
      </div>
      <div className='goblin-filter quarter'>
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => setQuery(e.target.value)} />
      </div>
      <GoblinForm 
        // This component takes in a ton of props! 
        // Here is the list of props to pass:
        submitGoblin={submitGoblin}
        goblinFormName={goblinFormName} 
        setGoblinFormName={setGoblinFormName}
        goblinFormColor={goblinFormColor} 
        setGoblinFormColor={setGoblinFormColor}
        goblinFormHP={goblinFormHP} 
        setGoblinFormHP={setGoblinFormHP}
      />
      <GoblinList 
        // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array 
        goblins={
          filteredGoblins.length
            ? filteredGoblins
            : allGoblins
        }
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;

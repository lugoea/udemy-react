import React, {useState} from 'react';
import './App.css';
import Person from './Person/Person';
import Radium from 'radium';

const App = props =>  {
    
  const [personsState, setPersonsState] = useState({
    persons: [
      {id:'1',name: 'Edgar', age:28},
      {id:'2',name: 'Max', age:29}, 
      {id:'3',name: 'Manu', age:35}
    ]    
  })

  const [otherstate, setOtherState] = useState('another value');

  const [showPersonsState, setShowPersonsState] = useState(false);
  
  //console.log(showPersonsState);

   const deletePersonHandler = (personIndex) => {
      //debugger
    //  console.log(personIndex);
    //const persons = personsState.persons.slice();
    //ES6 alternative with spread of above line 
    const persons = [...personsState.persons];
    persons.splice(personIndex,1);
    setPersonsState({persons:persons});

  }
    
    const nameChangeHandler = (event, id) => {

      const personIndex = personsState.persons.findIndex(p=>{
          return p.id === id;
      });      

      const person = {...personsState.persons[personIndex]};

      person.name = event.target.value;

      const persons = [...personsState.persons];

      persons[personIndex] = person;

      setPersonsState({persons: persons});
    }

    const tooglePersonsHandler = () => {
      const doesShow = showPersonsState.showPersons;
      setShowPersonsState({        
        showPersons: !doesShow
      })
     }

    const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover':{
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    
    let persons = null;

    if (showPersonsState.showPersons)
    {
      persons = (
        <div >
          {
            personsState.persons.map((person,index) => {
              return <Person 
              name={person.name} 
              age={person.age} 
              click={()=>deletePersonHandler(index)}
              key={person.id}
              changed={(event)=>nameChangeHandler(event, person.id)}
              />     
            })
          }       
          
        </div>

      );
          style.backgroundColor = 'red';
          style[':hover'] = {
            backgroundColor: 'salmon',
            color: 'black'
          }   
    }

    const classes = [];

    if (personsState.persons.length <= 2)
    {
      classes.push('red');
    }

    if (personsState.persons.length <= 1)
    {
      classes.push('bold');
    }

    return (
    <div className="App">
      <h1>Hi I'm a react app</h1> 
      <p className={classes.join(' ')}>This is working ok!!!</p>
      <button style={style} onClick={tooglePersonsHandler}>Toogle Persons</button>
      {persons}   
      
    </div>
  );
}

export default Radium(App);


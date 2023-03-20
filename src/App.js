import React from "react";
import {useState, useEffect} from "react";
import Axios from "axios";
import ArrowL from "./components/ArrowL";
import ArrowR from "./components/ArrowR";
import HealthBar from "./components/HealthBar";



import { attack, firstStrike } from "./helpers";

function App() {
  const[pokemon1, setPokemon1] = useState({
    hp: "",
    name: "",
    attack: "",
    defense: "",
    speed: "",
  });

  const[pokemon2, setPokemon2] = useState({
    hp: "",
    name: "",
    attack: "",
    defense: "",
    speed: "",
  })


  const[turn, setTurn] = useState(null);
  const[pokemon2Health, setPokemon2Health] = useState(null);
  const[pokemon1Health, setPokemon1Health] = useState(null);
  const[message, setMessage] = useState("")
  const[die, setDie] = useState("")
 
  const randomPokemonId1 = Math.floor(Math.random() * 300) + 1;
  const randomPokemonId2 = Math.floor(Math.random() * 300) + 1;
 
  

  console.log(`${pokemon2.name} has now ${pokemon2Health}`);
  console.log(`${pokemon1.name} has now ${pokemon1Health}`);
  console.log(turn);
  console.log(pokemon1.speed);

  const getPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId1}`).then(
      (response) => {
        //console.log(response)
        setPokemon1({
          name: response.data.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat
        })
    });
  };

  useEffect(() => {
    getPokemon()
  }, [])

  const getPokemon2 = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId2}`).then(
      (response) => {
        setPokemon2({
          name: response.data.name,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat
        })
    });
  };

  useEffect(() => {
    getPokemon2()
  }, [])


function handleTurnClick(){
  
 setTurn(firstStrike({pokemon1, pokemon2}));
   if (turn === 0) {
        const attacker = pokemon1;
        const receiver = pokemon2;
        console.log(attacker);
        console.log(receiver);
        const damage = attack({attacker, receiver});
        setMessage(`${pokemon1.name} dealt ${damage} damage`);

        if(damage >= 0 && damage >= pokemon2.hp){
          setDie(`${pokemon2.name} has died`);
        }
          if(pokemon2Health === null) {
            setPokemon2Health(pokemon2Health => pokemon2Health + pokemon2.hp - damage);
            console.log(`${pokemon2.name} now has ${pokemon2.hp - damage}`)
            setTurn(1)
            }  else {    
                  if(damage >= 0 && damage >= pokemon2Health){
                    console.log(`${pokemon2.name} has died`)
                    setDie(`${pokemon2.name} has died`);
                     }         
                  setPokemon2Health(pokemon2Health => pokemon2Health - damage);
                  console.log(`${pokemon2.name} now has ${pokemon2Health - damage}`);
                  setTurn(1);
                  } 
          }

  if (turn === 1){
    const receiver = pokemon1;
    const attacker = pokemon2;
    console.log(attacker)
    console.log(receiver)
    const damage = attack({attacker, receiver})
    setMessage(`${pokemon2.name} dealt ${damage} damage`);

    if(damage >= 0 && damage >= pokemon1.hp){
      setDie(`${pokemon1.name} has died`);
    }
      if(pokemon1Health === null) {
        setPokemon1Health(pokemon1Health => pokemon1Health + pokemon1.hp - damage);
        console.log(`${pokemon1.name} now has ${pokemon1.hp - damage}`);
        setTurn(0);
          } else { 
                if(damage >= 0 && damage >= pokemon1Health){
                    console.log(`${pokemon1.name} has died`)
                    setDie(`${pokemon1.name} has died`);
                    }            
              setPokemon1Health(pokemon2Health => pokemon2Health - damage);
              console.log(`${pokemon1.name} now has ${pokemon2Health - damage}`);
              setTurn(0);
              } 
          }
      }    
       
  
  return (
    <>
    <div>
      <HealthBar value={pokemon1Health} maxHP={pokemon1.hp}  />
      <h2>{pokemon1.name}</h2>
      <img 
        src={`https://img.pokemondb.net/artwork/large/${pokemon1.name}.jpg`}
        width={200}
        height={200}
        className="pokemon-one"
        alt={pokemon1.name}
        />
      <h3>Stats</h3>
      <p>HP:{pokemon1.hp}</p>
      <p>Attack:{pokemon1.attack} </p>
      <p>Defense:{pokemon1.defense} </p>
      <p>Speed:{pokemon1.speed} </p>
     </div>

     { turn === 0 ? <ArrowL/> : <ArrowR /> }
     <button onClick={handleTurnClick} >ATTACK</button>
     <div>
      <p>{message}</p>
      <p>{die}</p>
     </div>

     <div>
     <HealthBar value={pokemon2Health} maxHP={pokemon2.hp}  />
      <h2>{pokemon2.name}</h2>
      <img 
        src={`https://img.pokemondb.net/artwork/large/${pokemon2.name}.jpg`}
        width={200}
        height={200}
        className="pokemon-one"
        alt={pokemon2.name}
        />
      <h3>Stats</h3>
      <p>HP:{pokemon2.hp}</p>
      <p>Attack:{pokemon2.attack} </p>
      <p>Defense:{pokemon2.defense} </p>
      <p>Speed:{pokemon2.speed} </p>
     </div>

     </>  
  );
  
}

export default App;

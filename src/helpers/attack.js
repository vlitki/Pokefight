


export const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });


export const attack = ({ attacker, receiver }) => {
    let chance = Math.floor(Math.random() * 5 );
    const receivedDamage = attacker.attack/2 - receiver.defense * 0.1;
    const miss = 0;
        if(chance === 0 || chance === 1 || chance === 2 || chance === 3) {
            console.log('success')
            return receivedDamage;
        } else {
            console.log(attacker.name + " missed")
            return miss;
        }
  };

  export const firstStrike =({pokemon1, pokemon2}) => {
    if(pokemon1.speed > pokemon2.speed) {
      return 0;
    } return 1; 
    } // tu sam stao  

  
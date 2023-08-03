// get elements
const newPlayers = document.getElementById('#new-players-Form');
const newPlayerFormContainer = document.getElementById('#all-players-Container');

const PLAYERS_API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/${2302-ACC-ET-WEB-PT-B}/players";

/*
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const getAllPlayers = async () => {
    try {
       
        const response = await fetch(PLAYERS_API_URL);
        console.log(response)
       const players = await response.json(); 
       return players;

    } catch (error) {
        console.log('Uh oh, trouble fetching players!', err);
    }
}

// get single player
const getSinglePlayer = async (id) => {
    try {
        const response = await fetch(`${PLAYERS_API_URL}/players/${id}`);
        const player = await response.json();
        const playerElement = document.createElement("div");
        playerElement.classList.add(player);
        playerElement.innerHTML =`
        <h4>${player.title}</h4
        <p>${player.instructions}</p>
        `;
        playerContainer.appendChild(playerElement);
    //if (result.error) throw result.error;
       // return result.data.player;

    } catch (error) {
        console.error(`Oh no, trouble fetching player #${id}!`, error);
    }
};
/*/const playerObj =("name",breeed);
   //add new player
const addNewPlayer = async (playerObj) => 
//const  playerObj =  ("name", "title", "breed");
console.log(playerObj);
    try {
        const response = await fetch(PLAYERS_API_URL, {
            method: 'POST',
            body: JSON.stringify({player,imageUrl,title}),
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
        const player = await response.json();
        console.log(player);
        fetchAllPlayers();
        //if (result.error) throw result.error;
        //return result.data.player;
    } catch (error){
    console.error('Oops, something went wrong with adding that player!', err);
    }
    
*/
    //remove a player
const removePlayer = async (id) => {
    try {
        const response = await fetch(`${API_URL}/players/${id}`, {
            method: 'DELETE',
        });
        const player = await response.json();
        const result = await response.json();
        if (result.error) throw result.error;
        return;

    } catch (error) {
     console.error(`Whoops, trouble removing player #${id} from the roster!`);
    }
  
    }
//};

/*
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
/*
//render all players
const renderAllPlayers = (playerList) => {
    if (!playerList || playerList.length === 0) {
        playersContainer.innerHTML = '<h3>No players to display!</h3>';
        return;
    }
    playersContainerHTML = '';

    playerList.map(pup =>{
        let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="delete-button" data-id=${pup.id}>Remove from roster</button>
      </div>
    `;
    playerContainer.appendChild(playerElement);
        //playerContainerHTML += pupHTML;
    });
    playerContainer.innerHTML = playerContainerHTML;

    let detailButtons = [...document.getElementsByClassName('detail-button')];
    detailButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const player = await fetchSinglePlayer(button.dataset.id);
            renderSinglePlayer(player);
        });
    });

    let deleteButtons = [...document.getElementsByClassName('delete-button')];
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            await removePlayer(button.dataset.id);
            const players = await fetchAllPlayers();
            renderAllPlayers(players);
        });
    });
};
*/
// render a single party by id
const renderSinglePlayerById = async (id) => {
    try {
      // fetch party details from server
      const player = await getPlayerById(id);
  
      // GET - /api/workshop/guests/party/:partyId - get guests by party id
      const playerResponse = await fetch(`${PLAYERS_API_URL}/party/${id}`);
      const guests = await playerResponse.json();
  

  
      // GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
       //const giftsResponse = await fetch(`${PARTIES_API_URL}/party/gifts/${id}`);
       //const gifts = await giftsResponse.json();
  
      // create new HTML element to display party details
      const playerDetailsElement = document.createElement('div');
      playerDetailsElement.classList.add('player-details');
      playerDetailsElement.innerHTML = `
              <h2>${player.breed}</h2>
              <p>${player.name}</p>
              <p>${player.status}</p>
              <p>${player.imageUrl}</p>
              <p>${player.teamId}</p>
              <h3>player:</h3>
              <ul>
              ${player
                .map(
                  (player, index) => `
                <li>
                  <div>${player.name}</div>
                  <div>${player[index].status}</div>
                </li>
              `
                )
                .join('')}
            </ul>
            
  
  
              <button class="close-button">Close</button>
          `;
      playerContainer.appendChild(playerDetailsElement);
      // see details
      const detailsButton = playerElement.querySelector('.details-button');
      detailsButton.addEventListener('click', async (event) => {
        // your code here
        console.log(event.target.dataset.id)
      });
  
/*
const renderSinglePlayer = (playerObj) => {
    if (!playerObj || !playerObj.id) {
        playerContainer.innerHTML = "<h3>Couldn't find data for this player!</h3>";
        return;
    }

    let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${playerObj.name} the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;
    playerContainer.innerHTML = pupHTML;

    let seeAllButton = document.getElementById('see-all');
    seeAllButton.addEventListener('click', async () => {
        const players = await fetchAllPlayers();
        renderAllPlayers(players);
    });
}

/*
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
/*

//render new player form
const renderNewPlayerForm = () => {
    let formHTML = `
    <form>
      <label for="name"> Mike:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
    newPlayerFormContainer.innerHTML = formHTML;

    let form = newPlayerFormContainer.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        let playerData = {
            name: form.elements.name.value,
            breed: form.elements.breed.value
        }
        await addNewPlayer(playerData);
        const players = await fetchAllPlayers();
        renderAllPlayers(players);
        form.elements.name.value = '';
        form.elements.breed.value = '';
    });
    try {

    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err)
    }
};

/*const init = async () => {
    const players = await fetchAllPlayers();
  renderAllPlayers(players);
    
}
    //renderNewPlayerForm();




init();*/

// init function
const init = async () => {
    // your code here
    console.log("starting init function...")
    try{
     
     const players = await getAllPlayers();
     console.log(players)
      //await renderPlayers(players)
  
    } catch (err) {
      console.error(err)
  
    }
  
    
  };
  
  init(); 
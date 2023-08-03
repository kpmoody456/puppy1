const playerContainer = document.getElementById('#all-players-container');
const newPlayerFormContainer = document.getElementById('#new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder

//const cohortName = ('2302-ACC-ET-WEB-PT-B');
// Use the APIURL variable for fetch requests
const PLAYERS_API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/${2302-ACC-ET-WEB-PT-B}/players";

/*const PLAYERS_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${2302-ACC-ET-WEB-PT-B}/PLAYERS`;
 returns An array of objects.
 */
const getAllPlayers = async () => {
    try {
    const response = await fetch(PLAYERS_API_URL);
    console.log(response)
        const players = await response.json();
        return players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!');
    }
};
//  Get single player by 
const getSinglePlayerByID = async (Id) => {
    
  try {
    const response = await fetch (`${PLAYERS_API_URL}/${id}`);
    const player = await response.json();
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${Id}!`, err);
  }
    
};
// remove player
const removePlayer = async (id) => {
    try {
        const response = await fetch(`${PLAYERS_API_URL}/players/${id}`, {
            method: 'DELETE',
        });
        const player = await response.json();
        const result = await response.json();
        if (result.error) throw result.error;
        return;

    } catch (error) {
     console.error(`Whoops, trouble removing player #${id} from the roster!`);
    }
        };
//add a new player
//const playerObj =("name","breed");
const createNewPlayer = async (player, image_url, title) => {

    try {
    const response = await fetch(PLAYERS_API_URL,{
        method: "POST",
        body: JSON.stringify({player,image_url,title}),
        headers: {
            "content-type" : "application/json"
    }
    
    });

    const player = await response.json();
    console.log(player);
    fetchAllPlayers();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
   
};

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
// render single player


    
        //render all players
        const renderAllPlayers = (playerList) => {
            if (!playerList || playerList.length === 0) {
                playersContainer.innerHTML = '<h3>No players to display!</h3>';
                return;
            }
            playersContainer.innerHTML = '';

            playerList.map (pup => {
                const playerElement = document.createElement('div');
                playerElement.classList.add('player-card');
            playerElement.innerHTML= `
                 
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
                
           // playerContainer.HTML + = player.HTML;
            });
            playerContainer.innerHTML = playerContainerHTML;

            let deleteButton = playerElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();
                removeplayer(player.id);
            });
    
            let detailButton = playerElement.querySelector('.detail-button');
            detailButton.addEventListener('click', (event) => {
                event.preventDefault();
                renderSingleRecipe(player);
            });
        };
    
    //render single players
    const rendersinglePlayers = (player) => {
        if (!playerList || playerList.length === 0) {
            playersElement.innerHTML = '<h3>No players to display!</h3>';
            return;
        }
    };
    /*    //HtMl

     let playerHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img> src="${playerObj.imageUrl}" alt="photo of ${playerObj.name} the puppy"</img>
      <button id="see-all">Back to all players</button>
    </div>`;
    };
 playerContainer.innerHTML = playerHTML;
        let detailButton = playerElement.querySelector('.detail-button');
        detailButton.addEventListener('click', async () => {
            event.preventDefault();
            renderAllplayers(player);
        });
    */

    
        
            /*let detailButtons = [...document.getElementsByClassName('detail-button')];
            detailButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const player = await fetchSinglePlayer(button.dataset.id);
                    renderSinglePlayer(player);
                });
            });*/
            let deleteButtons = [...document.getElementsByClassName('delete-button')];
            deleteButtons.forEach(button => {
                button.addEventListener('click', async (event) => {
                    await removePlayer(button.dataset.id);
                    const players = await fetchAllPlayers();
                    renderAllPlayers(players);
            });
        });
    
        /*const init = async () => {
            const players = await fetchAllPlayers();
            renderAllPlayers(players);
            renderNewPlayerForm();
        }*/
        const playerDetailsElement = document.createElement('div');
        playerDetailsElement.classList.add("player-details")
        playerDetailsElement.innerHTML =`
        <h2>${playerContainer.title}</h2>`
        playerContainer.appendChild(playerDetailsElement);
    

        
        //HtMl
/*
     let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img> src="${playerObj.imageUrl}" alt="photo of ${playerObj.name} the puppy"</img>
      <button id="see-all">Back to all players</button>
    </div>
  `;
     //playerContainer.innerHTML = pupHTML;
*/
    // init function
 const init = async () => {
    // your code here
    console.log("starting init function...")
    try{
     
     const players = await getAllPlayers();
     //console.log(players)
     // await renderPlayers(players);
       //renderPlayers();
  
    } catch (err) {
      console.error(err)
  
    }
  
    
  };
  
  init();
// HTML Items

const siteTitle = document.getElementById("site-title"); // getting site title element for further use to render homepage from other pages
const mainSection = document.getElementById("content"); // the main section of the webpage
const viewFavouritesButton = document.getElementById("view-favourites-button"); // the button to view favourite list
const url = "https://www.themealdb.com/api/json/v1/1/"; // api's link to retrieve data

// IIFE

(function() {
    const searchedMealInput = document.getElementById("search-meals-bar-input"); // the input bar to search for meals
    searchedMealInput.value = ""; // The search bar should be empty on every refresh

    searchedMealInput.addEventListener('input', function() { // for searching meals
        let duration = 400; // duration (in milliseconds) for which the list should not show
        clearTimeout(searchedMealInput.myTimer) // clear the previous function call
        searchedMealInput.myTimer = setTimeout(fetchDataAndDisplay, duration); // function is called after (duration)ms when the input is changed
    });
})();

// Universal Event Listeners

siteTitle.addEventListener('click', showHomePage); // for rending homepage without refreshing the webpage

viewFavouritesButton.addEventListener('click', viewFavourites); // view favourites on button click

// Functions

    // Reusable Functions 

function removeAllChildNodes(parent) { // function to remove child nodes from a given parent node
    parent.querySelectorAll('*').forEach( n => n.remove() ); // gets every single child element and removes it
    parent.textContent = ""; // removes any extra text left
}

function addToFavourites(meal) { // function for storing favourite meals
    const mealId = Number(meal.idMeal); // converting ID String to number
    if(localStorage.getItem(mealId)) { // checking if it is already storred in the storage
        alert("Item was already added"); // tell user it was already added
    }
    else {
        localStorage.setItem(Number(meal.idMeal), meal.strMeal); // add the meal to the local storage
        alert("Item was added to favourites"); // tell the user that the meal was added
    }
}

function createMealCard(meal, pageType) { // function for making a meal card

    //creating required items

    const mealCard = document.createElement("div"); // div containing the list item's informations created
    const mealCardImageContainer = document.createElement("div"); // div containing list item's image
    const mealCardImage = document.createElement("img"); // img showing the image of the list item meal
    const mealCardName = document.createElement("div"); // div containing name of the list item
    const mealCardFavButton = document.createElement("button"); // button which will be used to add the given meal to favourites

    //adding information to card and its sub-elements
    
        // adding image to the card

    mealCardImage.setAttribute("src", meal.strMealThumb); // Getting Image's source link from the given meal object and addding it as as string to display the image.
    mealCardImageContainer.append(mealCardImage); // adding image to the image container
    mealCardImageContainer.setAttribute('class', pageType + "-meal-card-img"); // setting class for image element to add styling
    
            // adding card title
        
    mealCardName.innerText = meal.strMeal; // getting meals name and displaying it in the name div.
    mealCardName.setAttribute("class", pageType + "-meal-card-name"); // setting card name's class for styling
    
            //adding card's favourite/delete button
    
    if(pageType === "favmealpage") { // check if the page type is the favourite's page or not
        mealCardFavButton.innerText = "Remove From Favourites"; // setting the text in the button to describe its purpose
        mealCardFavButton.setAttribute("class", pageType + "-meal-card-delete-button"); // giving class name for styling
        mealCardFavButton.addEventListener('click', function(event) { // adding a function to remove from favourite list on button click  
            event.preventDefault(); // avoiding any just in case refresh of the page
            removeFavourite(mealCard, meal.idMeal); // adding to storage
            event.stopPropagation(); // avoiding any further propagation
        });     
    }
    else {
        mealCardFavButton.innerText = "Add to Favourites"; // setting the text in the button to describe its purpose
        mealCardFavButton.setAttribute("class", pageType + "-meal-card-fav-button"); // giving class name for styling
    
        mealCardFavButton.addEventListener('click', function(event) { // function for adding to favourites
            event.preventDefault(); // avoiding any just in case refresh of the page
            addToFavourites(mealCard.info); // adding to storage
            event.stopPropagation(); // avoiding any further propagation
        });
    }
    
            //adding everything to the main meal card
    
    mealCard.info = meal; // adding meal's info to the meal card for further use
    mealCard.append(mealCardImageContainer, mealCardName, mealCardFavButton); // adding everything to the main meal card
    mealCard.setAttribute("class", "meal-card " + pageType + "-meal-card"); // giving classes for styling
    mealCard.addEventListener('click', () => {showMealDetails(mealCard.info)}); // adding an event listner to the meal card

    return mealCard; //returning the meal card
}

function DisplayElementInList(meal, mealList, pageType) { // function to create meal items and append them to the list for display
    const listItem = document.createElement("li"); // list item created    
    listItem.append(createMealCard(meal, pageType)); // creating the meal card and adding it as list item
    mealList.append(listItem); // adding list item to the list
}

    //Home Page Functions

async function fetchDataAndDisplay() { // function for fecthing data in relation to the searched word, finding the meals and displaying them
    const mealList = document.getElementById("meal-list"); // the unorder meal list from html
    removeAllChildNodes(mealList); // removing all previous results from the list
    const searchedMealInput = document.getElementById("search-meals-bar-input"); // the input bar to search for meals
    if(searchedMealInput.value != false) { // If the search bar is not empty
        let res = await fetch(url + "search.php?s=" + searchedMealInput.value.trim()); // get searched meal from search bar
        let data = await res.json(); // convert data returned into JS object.
        for(meal of data.meals) DisplayElementInList(meal, mealList, "homepage"); // display the meal list from api
    }
}

function showHomePage() { // function for rendring homepage without refreshing the page
    removeAllChildNodes(mainSection); // remove everything from main section

    mainSection.innerHTML = `
        <!-- Form to search -->

        <form id="search-meals-bar">
            <input type="text" id="search-meals-bar-input" placeholder="Search for meals here">
        </form>

        <!-- Meal List-->

        <ul id="meal-list"></ul>
    `; // Add the original home page back

    const searchedMealInput = document.getElementById("search-meals-bar-input"); // the input bar to search for meals
    searchedMealInput.value = ""; // The search bar should be empty on every refresh

    searchedMealInput.addEventListener('input', function() { // for searching meals
        let duration = 400; // duration (in milliseconds) for which the list should not show
        clearTimeout(searchedMealInput.myTimer) // clear the previous function call
        searchedMealInput.myTimer = setTimeout(fetchDataAndDisplay, duration); // function is called after (duration)ms when the input is changed
    });
}

    // Details Page Functions

function showMealDetails(meal) { // function to show detials of a perticular meal

    // removing everything from the homepage and getting the meal card

    removeAllChildNodes(mainSection); // remove everything from the home page
    let mealCard = createMealCard(meal, "detailspage"); // creating a meal card from the given meal 

    // adding extra information to the meal card

    let mealInstruction = document.createElement("div"); // creating an html element for instructions
    mealInstruction.setAttribute("class", "detailspage-meal-card-instructions"); // setting its class for styling
    mealInstruction.innerHTML = meal.strInstructions + "<br />&nbsp;<br />" + `link to the recipe :- <a href="${meal.strYoutube}" target="_blank" class="detailspage-meal-card-video">` + meal.strYoutube + "</a>"; // adding instruction text and video link to the element

    // adding the updated card to the details page

    mealCard.append(mealInstruction); // adding extra information to the card
    mainSection.append(mealCard); // adding the card to the page
}

    // Favourites Page

function viewFavourites() { // function for viewing the favourite meals
    removeAllChildNodes(mainSection); // removing everything from the main section.

    mainSection.innerHTML = `
        <!-- Favourite Meal List-->

        <ul id="fav-meal-list"></ul>
    `; // adding html elements for favourites page

    const favMealList = document.getElementById("fav-meal-list"); // the unorder favourite meal list from html
    Object.keys(localStorage).forEach(async function(mealId) { // iteratring over every favourite meal
        let res = await fetch(url + "lookup.php?i=" + mealId); // get searched meal from search bar
        let data = await res.json(); // convert data returned into JS object
        DisplayElementInList(data.meals[0], favMealList, "favmealpage"); // add meals to favourites page
    });
}

function removeFavourite(mealCard, mealId) { // function to remove from favourites list
    mealCard.parentNode.remove(); // remove the html element
    localStorage.removeItem(mealId); // remove the favourite meal from storage
    alert(mealCard.info.strMeal + " was removed"); // tell the user that the selected meal was removed
}
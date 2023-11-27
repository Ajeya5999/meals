// HTML Items

const searchedMealInput = document.getElementById("search-meals-bar-input"); //the input bar to search for meals
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // api's link to retrieve data
// IIFE

(function() {
    searchedMealInput.value = ""; // The search bar should be empty on every refresh
})();

// Event Listeners

searchedMealInput.addEventListener('input', function(event) {
    event.preventDefault(); // Will not refresh on default activity
    let duration = 400; // duration (in milliseconds) for which the list should not show
    clearTimeout(searchedMealInput.myTimer) // clear the previous function call
    searchedMealInput.myTimer = setTimeout(fetchDataAndDisplay, duration); // function is called after (duration)ms when the input is changed
});

// Functions

    // Reusable Functions 

function removeAllChildNodes(parent) { // function to remove child nodes from a given parent node
    parent.querySelectorAll('*').forEach( n => n.remove() ); // gets every single child element and removes it
    parent.textContent = ""; // removes any extra text left
}

function createMealCard(meal, pageType) { // function for making a meal card

    //creating required items

    const mealCard = document.createElement("div"); // div containing the list item's informations created
    const mealCardImageContainer = document.createElement("div"); // div containing list item's image
    const mealCardImage = document.createElement("img"); // img showing the image of the list item meal
    const mealCardName = document.createElement("div"); // div containing name of the list item
    const mealCardFavButton = document.createElement("button"); // button which will be used to add the given meal to favroites

    //adding information to card and its sub-elements
    
        // adding image to the card

    mealCardImage.setAttribute("src", meal.strMealThumb); // Getting Image's source link from the given meal object and addding it as as string to display the image.
    mealCardImageContainer.append(mealCardImage); // adding image to the image container
    mealCardImageContainer.setAttribute('class', pageType + "-meal-card-img"); // setting class for image element to add styling
    
            // adding card title
        
    mealCardName.innerText = meal.strMeal; // getting meals name and displaying it in the name div.
    mealCardName.setAttribute("class", pageType + "-meal-card-name"); // setting card name's class for styling
    
            //adding card's favroite button
    
    mealCardFavButton.innerText = "Add to Favriotes"; // setting the text in the button to describe its purpose
    mealCardFavButton.setAttribute("class", pageType + "-meal-card-fav-button"); // giving class name for styling
    
            //adding everything to the main meal card
    
    mealCard.info = meal; // adding meal's info to the meal card for further use
    mealCard.append(mealCardImageContainer, mealCardName, mealCardFavButton); // adding everything to the main meal card
    mealCard.setAttribute("class", pageType + "-meal-card"); // giving class for styling

    return mealCard; //returning the meal card
}

    //Home Page Functions

function DisplayElementInList(meal, mealList) { // function to create meal items and append them to the list for display

    const listItem = document.createElement("li"); // list item created    
    listItem.append(createMealCard(meal, "homepage")); // ceating a meal card and adding it as a list item
    mealList.append(listItem); // adding list item to the list
}

async function fetchDataAndDisplay() { // function for fecthing data in relation to the searched word, finding the meals and displaying them

    const mealList = document.getElementById("meal-list"); // the unorder meal list from html
    removeAllChildNodes(mealList); // removing all previous results from the list
    let res = await fetch(url + searchedMealInput.value.trim()); // get searched meal from search bar
    let data = await res.json(); // convert data returned into JS object.
    for(meal of data.meals) DisplayElementInList(meal, mealList); // display the meal list from api
}
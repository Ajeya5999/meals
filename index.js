// HTML Items

const mainSection = document.getElementById("content"); // the main section of the webpage
const searchedMealInput = document.getElementById("search-meals-bar-input"); // the input bar to search for meals
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // api's link to retrieve data

// IIFE

(function() {
    searchedMealInput.value = ""; // The search bar should be empty on every refresh
})();

// Event Listeners

searchedMealInput.addEventListener('input', function() {
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
    mealCard.setAttribute("class", "meal-card " + pageType + "-meal-card"); // giving class for styling

    return mealCard; //returning the meal card
}

    //Home Page Functions

function DisplayElementInList(meal, mealList) { // function to create meal items and append them to the list for display
    const listItem = document.createElement("li"); // list item created    
    let mealCard = createMealCard(meal, "homepage"); // creating the meal card
    mealCard.addEventListener('click', () => {showMealDetails(mealCard.info)}); // adding an event listner to the meal card
    listItem.append(mealCard); // adding meal card as list item
    mealList.append(listItem); // adding list item to the list
}

async function fetchDataAndDisplay() { // function for fecthing data in relation to the searched word, finding the meals and displaying them
    const mealList = document.getElementById("meal-list"); // the unorder meal list from html
    removeAllChildNodes(mealList); // removing all previous results from the list
    let res = await fetch(url + searchedMealInput.value.trim()); // get searched meal from search bar
    let data = await res.json(); // convert data returned into JS object.
    for(meal of data.meals) DisplayElementInList(meal, mealList); // display the meal list from api
}

    // Details Page Functions

function showMealDetails(meal) { // function to show detials of a perticular meal

    // removing everything from the homepage and getting the meal card

    removeAllChildNodes(mainSection); // remove everything from the home page
    console.log(meal);
    let mealCard = createMealCard(meal, "detailspage"); // creating a meal card from the given meal 

    // adding extra information to the meal card

    let mealInstruction = document.createElement("div"); // creating an html element for instructions
    mealInstruction.setAttribute("class", "detailspage-meal-card-instructions"); // setting its class for styling
    mealInstruction.innerHTML = meal.strInstructions + "<br />&nbsp;<br />" + `link to the recipe :- <a href="${meal.strYoutube}" target="_blank" class="detailspage-meal-card-video">` + meal.strYoutube + "</a>"; // adding instruction text and video link to the element

    // adding the updated card to the details page

    mealCard.append(mealInstruction); // adding extra information to the card
    mainSection.append(mealCard); // adding the card to the page
}
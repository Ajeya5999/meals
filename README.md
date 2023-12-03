# Overview

This is a meals web app. Through this, one can search for a meal from a list of meals and learn about the meal's recipe. One can also have a list of favourite meals which is stored permanently.

Use the app through this link:- https://moonlit-crepe-e113dd.netlify.app/

# App Operation

The app consists of 3 functioning pages:-

+ Home Page
+ Details Page
+ Favourites Page

Firstly, here is the description for the header of the app

## App Header

Every page has a common header which consists of 2 components:- 

+ Site Title:- It is what the name suggests, the title of the site. However, **you can click on it to get back to the home page**, without refreshing the site.

+ View Favourites:- It is a button used to view one's favourites list.

![Screenshot of the header of the app](./assets/images/Readme%20Images/Header.png)

The description and function of each aforementioned page is as follows

## Home Page

This is the main page that shows up when the app loads. It consists of the following components

+ Search Bar:- The search bar is used to search meals from the meals API (link to the API:- https://www.themealdb.com/api.php), it will suggest a list of meals, as one proceeds to type in the bar, from the available meals.

+ Meals List:- As a person types, a list of meals will be suggested to them in the form of cards. **One can click on the card to get more details about the recipe**, as the person is sent to the details page. **One can click on the "Add to Favourites" button as well to add the meal to the favourites list**.

![Screenshot of the home page of the app](./assets/images/Readme%20Images/Home%20Page.png)

## Details Page

Once a person clicks on one of the cards on the meals list on the home page, one can view the details of the meal. It consists of the recipe along with a YouTube link to the recipe. It also consists of the "Add to Favourites" button to add the meal to the favourites list, as mentioned before. 

![Screenshot of the details page of the app](./assets/images/Readme%20Images/Details%20Page.png)

## Favourites List page

A person can click on the "View Favourites" button in the app header to view this page. It will show the list of all the meals the person has favourited from the API list in the form of cards. One can click on the card to learn the details or **remove the meal from the list by clicking the "Remove from favourites" button.**

![Screenshot of the favourite meals page of the app](./assets/images/Readme%20Images/Favourite%20Meals%20List.png)


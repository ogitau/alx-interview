#!/usr/bin/node

/* eslint-disable */

// Importing the request module
const request = require('request');

// Function to fetch character endpoints from the Star Wars API based on film ID
function getCharacterEndPoints(filmID) {
  const filmURL = `https://swapi-api.alx-tools.com/api/films/${filmID}`;
  return new Promise((resolve, reject) => {
    // Making a request to fetch film data
    request(filmURL, (error, response, body) => {
      if (error) {
        reject(error); // Reject promise on error
      } else {
        resolve(JSON.parse(body).characters); // Resolve promise with characters array
      }
    });
  });
}

const starWarID = process.argv[2]; // Retrieve movie ID from command line arguments

// Calling the function to get character endpoints
getCharacterEndPoints(starWarID)
  .then((userEndPoints) => {
    // Mapping over each character endpoint to create an array of promises
    const requests = userEndPoints.map((element) => {
      return new Promise((resolve, reject) => {
        // Making a request to fetch character data
        request(element, (error, response, body) => {
          if (error) {
            reject(error); // Reject promise on error
          } else {
            resolve(JSON.parse(body).name); // Resolve promise with character name
          }
        });
      });
    });

    // Resolving all promises in parallel
    Promise.all(requests)
      .then((characterNames) => {
        // Logging each character name retrieved
        characterNames.forEach((name) => {
          console.log(name);
        });
      })
      .catch((error) => console.log(error)); // Catch any errors during promise resolution
  })
  .catch((error) => console.log(error)); // Catch any errors during initial API request
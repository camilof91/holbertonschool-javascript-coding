#!/usr/bin/node
const url = process.argv[2];
const request = require('request');

request(url, (err, response, body) => {
  if (err) throw err;

  const data = JSON.parse(body).results;
  let count = 0;

  data.forEach(film => {
    film.characters.forEach(character => {
      if (character.includes('/18/')) {
        count++;
      }
    });
  });

  console.log(count);
});

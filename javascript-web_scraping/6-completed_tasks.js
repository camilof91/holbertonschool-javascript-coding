#!/usr/bin/node
const url = process.argv[2];
const request = require('request');

request(url, (err, response, body) => {
  if (err) throw err;

  const dataApi = JSON.parse(body);
  const obj = {};
  const userIds = new Set();

  // Filtrar las tareas completadas
  const userCompleted = dataApi.filter(dt => dt.completed === true);

  // Agregar los userId únicos al conjunto
  for (const usrId of userCompleted) {
    userIds.add(usrId.userId);
  }

  // Contar las tareas completadas por cada userId
  for (const data of userIds) {
    let values = 0;
    for (const user of userCompleted) {
      if (user.userId === data) values++;
    }
    obj[`${data}`] = values;
  }

  console.log(obj);
});

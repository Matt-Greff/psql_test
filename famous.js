famousPersonToAdd = process.argv.slice(2);
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    ssl      : settings.ssl
  }
});

// these next two functions output the same value, one uses raw while the first uses knex syntax and has error handing
const allFamous = () => {
  knex.select('*')
    .from('famous_people')
    .asCallback( (err, rows) => {
      if (err) return console.error(err);
      rows.forEach((person) => {
        console.log(`${person.first_name} ${person.last_name} born ${(person.birthdate)}`)
      });
    });
}

const addPerson = () => {
  knex('famous_people')
  .insert([{
    first_name : famousPersonToAdd[0],
    last_name  : famousPersonToAdd[1],
    birthdate  : famousPersonToAdd[2]
  }])
  .then(() => {
    console.log('success!');
    allFamous();  
  })
}

famousPersonToAdd[2] ? addPerson() : console.log('incorrect parameters...');

/* 
knex.raw('select * from famous_people')
  .then((result) => {
    result.rows.forEach((name) => {
      console.log(`${name.first_name} ${name.last_name} born ${(name.birthdate)}`)
    });
  });
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT first_name, last_name, birthdate FROM famous_people where first_name = '${nameQuery[0]}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach((name) => {
        console.log(`${name.first_name} ${name.last_name} born ${name.birthdate}`)
    }); //output: queried name
    client.end();
  });
}); */

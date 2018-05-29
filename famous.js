nameQuery = process.argv.slice(2);
console.log(nameQuery)
const pg = require("pg");
const settings = require("./settings"); // settings.json

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
});

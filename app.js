const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const port = 8090

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user: 'nodejs',
  password: '11111111',
  database: 'part_time',
  dateStrings: 'date'
});

app.get('/', (req, res) => {
  const sql = "select * from alba";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('index', {
      alba: result
    });
  });
});

app.post('/', (req, res) => {
  const sql = "INSERT INTO alba SET ?"
  con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/');
  });
});

app.get('/create', (req, res) =>
  res.sendFile(path.join(__dirname, 'form.html')))

app.get('/edit/:id', (req, res) => {
  const sql = "SELECT * FROM alba WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    res.render('edit', {
      alba: result
    });
  });
});

app.post('/update/:id',(req,res)=>{
  const sql = "UPDATE alba SET ? WHERE id = " + req.params.id;
  con.query(sql,req.body,function (err, result, fields) {  
    if (err) throw err;
    console.log(result);
    res.redirect('/');
    });
});

app.get('/delete/:id', (req, res) => {
  const sql = "DELETE FROM alba WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result)
    res.redirect('/');
  })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
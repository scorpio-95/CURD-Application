// defined all the required dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

//db connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "myprofile_data"
});

// started using all the defined dependencies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api url set up for fetching all the details from particular table and send data to fronend
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM customers";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

//api url set up for posting all the details in particular table
app.post("/api/post", (req, res) => {
    const { id, name, address } = req.body;
    const sqlInsert = "INSERT INTO customers (name, address) VALUES (?,?)";
    db.query(sqlInsert, [name, address], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

//api url set up for deleting all the details from particular table
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM customers WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

//api url set up for fetching all the details from particular table with respect to id
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM customers WHERE id = ? ";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

//api url set up for updating the details in particular table with respect to id
app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;
    const sqlUpdate = "UPDATE customers SET name= ?, address=? WHERE id = ? ";
    db.query(sqlUpdate, [name, address, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

// Inserting data through the backend
app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO customers (name, address) VALUES ('naina', 'ulhasnagar')";
    // db.query(sqlInsert,(err,result) =>{
    //     console.log("error",err);
    //     console.log("result",result);
    //     res.send("Hello Express");
    // });
});

// server setup
app.listen(5000, () => {
    console.log("server is running")
})
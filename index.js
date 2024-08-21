require("dotenv").config()

const fs = require("fs");
const express = require("express");
const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port} `))

app.use(express.json())

//Get request
app.get("/", (req, res) => {
    fs.readFile('database.json', 'utf8', (err, data) => {
        if (err) console.log(res.status(400).json({ err }));
        if (data) res.status(200).json({ data: JSON.parse(data) })

    })
})


// Post request
app.post("/", (req, res) => {
    fs.readFile("database.json", "utf-8", (err, data) => {
        if (err) console.log(err);
        if (data) {
            data = JSON.parse(data);
            users = data["users"];
            let id = data["last_id"] + 1;
            const { name } = req.body;
            // const {Oid} = req.body;
            // if (data["last_id"] === Oid) { res.status(200).json({ msg: "The id is dublicated so we will give you new ID" }) }

            users.push({ id, name });

            fs.writeFile(
                "database.json",
                JSON.stringify({ users, last_id: id }),
                (err) => {
                    if (err) {
                        res.status(400).json({ err });
                    }

                    else {
                        res.status(201).json({ msg: "user has been added" });
                    }
                }
            );
        }
    })
})

//Put request
app.put("/:id", (req, res) => {
    let id = req.params.id;
    const { name } = req.body;
    fs.readFile("database.json", "utf-8", (err, data) => {
        if (err) res.status(400), json({ err })
        if (data) {
            const pdata = JSON.parse(data);
            let users = pdata["users"];
            users[users.findIndex((e) => e.id == id)].name = name;
        

        fs.writeFile("database.json",JSON.stringify({users, last_id: pdata["last_id"]}), (err)=>{
           if(err) res.status(400).json({err})
            else res.status(200).json({msg:`user number ${id} has been updated successfully`})
        })}

    })
})


//Delete request
app.delete("/:id", (req, res) => {
    fs.readFile("database.json", "utf-8", (err, data) => {

        let id = req.params.id;
        if (err) res.status(400).json({ err });
        if (data) {
            const pdata = JSON.parse(data);
            let users = pdata["users"];

            users = users.filter((e) => e.id != id);

            fs.writeFile("database.json", JSON.stringify({ users, last_id: pdata["last_id"] }), (err) => {
                if (err) {
                    res.status(400).json({ err });
                } else res.status(200).json({ msg: `user with id ${id} has been deleted` })
            })
        }
    })
})





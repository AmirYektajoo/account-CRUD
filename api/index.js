const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 8888;
const { bootstrap, database } = require("./db");

process.setMaxListeners(0);

app.get("/", (req, res) => {
  res.send("Hello nodejs");
});

app.get("/accounts", async (req, res) => {
  database
    .then((db) => {
      return db.all("SELECT * FROM account");
    })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.get("/accounts/:extcustid", async (req, res) => {
  const { extcustid } = req.params;
  database
    .then((db) => {
      return db.all(`SELECT * FROM account where extcustid=${extcustid}`);
    })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.delete("/accounts/:extcustid", async (req, res) => {
  const { extcustid } = req.params;
  database
    .then((db) => {
      return db.all(`DELETE FROM account where extcustid=${extcustid}`);
    })
    .then((results) => {
      res.status(200).json({ delete: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.post("/accounts/", async (req, res) => {
  const keys = Object.keys(req.body).join(", ");

  const validation = Object.values(req.body);

  const isValid = validation.some((i) => i.length > 0);

  if (!isValid) {
    return res.status(400).json({ message: "send all info" });
  }

  const values = Object.values(req.body)
    .reduce(function (acc, i) {
      acc.push(`'${i}'`);
      return acc;
    }, [])
    .join(",");
  database
    .then((db) => {
      return db.run(`INSERT INTO account (${keys}) values (${values})`);
    })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.put("/accounts/", async (req, res) => {
  const { extcustid, ...rest } = req.body;

  const entries = Object.entries(rest)
    .reduce(function (acc, i) {
      acc.push(`${i[0]} = '${i[1]}'`);
      return acc;
    }, [])
    .join(",");

  database
    .then((db) => {
      return db.run(`
        UPDATE account
        SET ${entries}
        where extcustid = ${extcustid}
        `);
    })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.listen(port, () => {
  bootstrap();
  console.log(`Example app listening at http://localhost:${port}`);
});

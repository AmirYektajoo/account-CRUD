var Database = require("sqlite-async");

const customers = [
  {
    first_name: "مرضیه",
    last_name: "بیات",
    extcustid: "12202751",
    phone: "0912111111",
  },
  {
    first_name: "علی",
    last_name: "احمدی",
    extcustid: "3331224",
    phone: "0935555555",
  },
];
var database = Database.open(":memory:");
var bootstrap = async function () {
  database
    .then(async (db) => {
      await db.run(`
    CREATE TABLE account (
        id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        extcustid TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL UNIQUE
        );
        `);

      customers.forEach(async (customer, index) => {
        const keys = Object.keys(customer).join(", ");
        const values = Object.values(customer)
          .reduce(function (acc, i) {
            acc.push(`'${i}'`);
            return acc;
          }, [])
          .join(",");
        await db.run(`INSERT INTO account (${keys}) values (${values})`);
      });

      var result = await db.all("SELECT * FROM account");
      console.log(result);
    })
    .catch((err) => {});
};

module.exports = {
  bootstrap,
  database,
};

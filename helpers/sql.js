const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
// ???
// sql.js is for triggering a conversion from JavaScript to SQL. dataToUpdate updates the data. jsToSQL converts the object from JavaScript to columns found in SQL.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Obtain keys with dataToUpdate
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // Cols is a mpa of dataToUpdate
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  //{
  //  setCols: '"first_name"=$1, "last_name"=$2, "age"=$3, "email"=$4',
  //  values: ['first', 'last', 30, 'first.last@example.com]  
  //}

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

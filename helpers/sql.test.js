const supertest = require("supertest");
const { sqlForPartialUpdate } = require("./sql");
const { json } = require("body-parser");
const { BadRequestErrpr, ExpressError } = require("../expressError");

describe("sqlForPartialUpdate", function() {
    test("works: 1 item", function() {
        const result = sqlForPartialUpdate(
            { f1: "v1" },
            { f1: "f1", fF2: "f2" });
        expect(result).toEqual({
            setCols: "\"f1\"=$1",
            values: ["v1"],
        });
    });

    test("works: 2 items", function() {
        const result = sqlForPartialUpdate(
            { f1: "v1", jsF2: "v2" },
            { jsF2: "f2" });
        expect(result).toEqual({
            setCols: "\"f1\"=$1, \"f2\"=$2",
            values: ["v1", "v2"],
        });
    });
});

describe("Test SQL for partial update", function() {
    test("Returns JSON containing setCols and values", function() {
        let dataToUpdate = {
            "first_name": "Chris",
            "last_name": "Guy",
            "age": 31,
            "email": "chris.guy@hotmail.com"
        }

        let jsToSQL = {
            firstName: 'first_name',
            lastName: 'last_name'
        };

        let test = sqlForPartialUpdate(dataToUpdate, jsToSQL)

        expect(test).toEqual({
            setCols: '"first_name"=$1, "last_name"=$2, "age"=$3, "email"=$4',
            values: ['Chris', 'Guy', 31, 'chris.guy@hotmail.com']
        })
    })

    test("Throws error is no keys", function() {
        let dataToUpdate = {}
        let jsToSQL = {
            firstName: 'first_name',
            lastName: 'last_name'
        };
        let test = () => {sqlForPartialUpdate(dataToUpdate, jsToSQL)}
        expect(test).toThrow(new BadRequestErrpr("No data"))
    })

    test("Returns without colNames in jsToSQL", function() {
        let dataToUpdate = {
            "first_name": "Chris",
            "last_name": "Guy",
            "age": 31,
            "email": "chris.guy@hotmail.com"
        }
        let jsToSQL = {}

        let test = sqlForPartialUpdate(dataToUpdate, jsToSQL)

        expect(test).toEqual({
            setCols: '"first_name"=$1, "last_name"=$2, "age"=$3, "email"=$4',
            values: ['Chris', 'Guy', 31, 'chris.guy@hotmail.com']
        })
    })

    test("Processes bad data", function() {
        // Output should be
        // {
            // setCols: '"0"=$1, "1"=$2,
            // calues: {'b', 'a', 'd'}
        // }
        let dataToUpdate = "bad data"

        let jsToSQL = {
            firstName: 'first_name',
            lastName: 'last_name'
        };

        let test = () => {sqlForPartialUpdate(dataToUpdate, jsToSQL)}

        expect(test).not.toThrow(ExpressError)
    })
})
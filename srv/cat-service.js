const cds = require("@sap/cds");
const SequenceHelper = require("./lib/SequenceHelper");
const { query } = require("express");


module.exports = cds.service.impl(async function () {
    const { Login, empDetails, Suppliers, Documents } = this.entities;

    const service = await cds.connect.to('db');

    const external = await cds.connect.to('API_BUSINESS_PARTNER')

    // this.on('CREATE', 'Documents', async (req) => {
    //     const { name, mimeType, size, content } = req.data;
    
    //     if (!content) {
    //         req.error(400, 'Content must be provided');
    //         return;
    //     }
    
    //     let buffer;
    //     try {
    //         buffer = Buffer.from(content, 'base64');
    //     } catch (err) {
    //         req.error(400, 'Invalid content format');
    //         return;
    //     }
    
    //     const document = {
    //         name,
    //         mimeType,
    //         size,
    //         content: buffer
    //     };
    
    //     try {
    //         const result = await service.run(INSERT.into(Documents).entries(document));
    //         return result;
    //     } catch (error) {
    //         req.error(500, 'Error saving document to the database');
    //         console.error('Error saving document:', error);
    //     }
    // });
    
    this.on('usercount', async req => {
        try {
            let data;
            let totalCount = 0;
            data = await service.run(
                SELECT.from(Login).columns('count(*) as userCount', 'type').groupBy('type')
            );
            for (let i = 0; i < data.length; i++) {
                totalCount += data[i].userCount;
            }
            data.push({
                "userCount": totalCount,
                "type": "total Count"
            });
            return data;
        } catch (error) {
            console.log(error);
            req.reject(400);
        }
    });

    this.on('addUser', async (req) => {
        try {
            const users = req.data.excledata;
            const db = await cds.connect.to('db');
            // const results = [];

            for (let i = 0; i < users.length; i++) {
                const sequenceHelper = new SequenceHelper({
                    db: db,
                    sequence: "employeeID",
                    table: "Login"
                });
                users[i].ID = String((await sequenceHelper.getNextNumber()));
                users[i].empDetail.ID = String((await sequenceHelper.getNextNumber()));
            }

            const result = await db.run(INSERT.into(Login).entries(users));
            // results.push(...result);
            return result;
        } catch (error) {
            console.log(error);
            req.reject(400, 'Failed to add users');
        }
    });
    this.on('addSalary', async (req) => {
        try {
            const { ID, salary } = req.data;
            let employee = await service.run(SELECT.from(empDetails).where({ ID: ID }));

            if (employee.length > 0) {
                employee = employee[0];
                const amount = employee.salary * salary / 100;
                employee.salary += amount;

                await service.run(UPDATE(empDetails).set({ salary: employee.salary }).where({ ID: ID }));
                return employee;
            } else {
                req.reject(404, `Employee with ID ${ID} not found`);
            }
        } catch (error) {
            console.error("Error during salary increment:", error);
            return req.reject(400, 'Failed to increment salary');
        }
    });

    // this.before('CREATE', 'Login', async (req) => {
    //     const db = await cds.connect.to("db");
    //     const sequenceHelper = new SequenceHelper({
    //         db: db,
    //         sequence: "employeeID",
    //         table: "Login",
    //         field: "ID"
    //     });
    //     req.data.ID = (await sequenceHelper.getNextNumber()).toString();
    // });
    this.on('READ', 'Suppliers', async (req) => {
        try {
            return external.run(req.query);
        } catch (error) {
            console.error("Error reading Suppliers:", error);
            req.error(error);
        }
    })
    this.on('SuppliersDataIsBlocked', async (req) => {
        try {
            const { value } = req.data;
            let data;

            data = await external.run(SELECT.from(Suppliers).columns('ID', 'fullName', 'isBlocked').where({ isBlocked: value }));
            return data;
        } catch (error) {
            console.log(error);
        }
    });
});
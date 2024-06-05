const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    const { Login,empDetails } = this.entities;
   
    const service = await cds.connect.to('db');

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

            const results = [];
            const result = await db.run(INSERT.into(Login).entries(users));
            results.push(...result);

            return results
        } catch (error) {
            console.error(error);
            req.reject(400, 'Failed to add users');
        }
    });

    this.on('addSalary', async (req) => {
        try {  
        const { ID, salary } = req.data;
        console.log(`Received request to increment salary for ID: ${ID} by amount: ${salary}`);       
            let employee = await service.run(SELECT.from(empDetails).where({ ID:ID }));

            employee = employee[0];
            let amount=employee.salary*salary/100;
            employee.salary+=amount;
    
            await service.run(UPDATE(empDetails).set({ salary: employee.salary }).where({ ID:ID }));
            return employee;
    
        } catch (error) {
          console.error("Error during salary increment:", error);
          return req.reject(400, 'Failed to increment salary');
        }
    })
});
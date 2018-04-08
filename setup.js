
const mysql = require('mysql2');
var config = {
    host: 'ww-data-host.mysql.database.azure.com',
    user: 'database@ww-data-host',
    password: 'uJHeCu3P!',
    port: 3306,
    ssl: true
};
const conn = new mysql.createConnection(config);

conn.connect(
    function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            var sql = "DROP DATABASE IF EXISTS projectDb;";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            sql = "CREATE Database projectDb;";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "USE projectDb;";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `Project` (`id` varchar(50) NOT NULL,`creatorId` varchar(50) NOT NULL,`iconId` varchar(50) NOT NULL,`name` varchar(50) NOT NULL,`description` TEXT NOT NULL,`creationDate` DATE NOT NULL,PRIMARY KEY (`id`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `Milestone` (`id` varchar(50) NOT NULL,`projectId` varchar(50) NOT NULL,PRIMARY KEY (`id`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "CREATE TABLE `IssueMilestone` (`issueId` varchar(50) NOT NULL,`milestoneId` varchar(50) NOT NULL,PRIMARY KEY (`issueId`,`milestoneId`));";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_fk0` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`);";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });

            sql = "ALTER TABLE `IssueMilestone` ADD CONSTRAINT `IssueMilestone_fk0` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`);";



            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            conn.end();


        }
    });


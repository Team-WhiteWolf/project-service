
const mysql = require('mysql2');
var config = {
    host: 'icon-db.mysql.database.azure.com',
    user: 'wolf@icon-db',
    password: 'EJ6chESAmK',
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
            var sql = "DROP DATABASE projectDb;";
            conn.query(sql, function (err, results, fields) {
                if (err) {
                    throw err;
                }
            });
            sql = [
                "CREATE Database projectDb;",
                "USE projectDb CREATE TABLE `Project` (`id` varchar(50) NOT NULL,`creatorId` varchar(50) NOT NULL,`iconId` varchar(50) NOT NULL`name` varchar(50) NOT NULL`description` TEXT NOT NULL,`creationDate` DATE NOT NULL,PRIMARY KEY (`id`));",
                "USE projectDb CREATE TABLE `Milestone` (`id` varchar(50) NOT NULL,`projectiId` varchar(50) NOT NULL,PRIMARY KEY (`id`));",
                "USE projectDb CREATE TABLE `IssueMilestone` (`issueId` varchar(50) NOT NULL,`milestoneId` varchar(50) NOT NULL,PRIMARY KEY (`issueId`,`milestoneId`));",
                "ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_fk0` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`);",
                "ALTER TABLE `IssueMilestone` ADD CONSTRAINT `IssueMilestone_fk0` FOREIGN KEY (`milestoneId`) REFERENCES `Milestone`(`id`);",
            ];

            for (var i in sql) {
                conn.query(i, function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                });
            }

        }
    });


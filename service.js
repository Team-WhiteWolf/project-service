//import uuid
const uuidv4 = require('uuid/v4');

//Azure Bus
var azure = require('azure');
var path = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
var serviceBusService = azure.createServiceBusService(path);

//MySQL stuff
const mysql = require('mysql2');
var config =
    {
        host: 'icon-db.mysql.database.azure.com',
        user: 'wolf@icon-db',
        password: 'EJ6chESAmK',
        port: 3306,
        database: 'groupPermissionDb',
        ssl: true
    };
const conn = new mysql.createConnection(config);
const queureName = "project";


serviceBusService.receiveQueueMessage((queureName + '-recieve'), function (error, receivedMessage) {
    if (!error) {
        // Message received and deleted
        switch (receivedMessage.type) {
            //TODO


        }
    }
});


function addIssueMilestone(issueId, milestoneId) {
    var sql = "INSERT INTO IssueMilestone (issueId, milestoneId) VALUES (?, ?)";
    var values = [issueId, milestoneId];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
function getIssueIdMilestone(milestoneId) {
    var sql = "SELECT issueId FROM IssueMilestone WHERE milestoneId == " + milestoneId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function removeIssueMilestone(issueId, milestoneId) {
    var sql = "DELETE FROM IssueMilestone WHERE issueId == " + issueId + " AND milestoneId == " + milestoneId;

    conn.query(sql, function (err, results, fields) {
        if (err) throw err;
    });
}

function createMilestone(projectId) {
    var sql = "INSERT INTO Milestone (id, projectId) VALUES (?, ?);";
    var values = [uuidv4, projectId];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
function removeMilestone(milestoneId) {
    var sql = "DELETE FROM Milestone WHERE milestoneId == " + milestoneId;

    conn.query(sql, function (err, results, fields) {
        if (err) throw err;
    });
}
function getMilestones() {
    
}

function createProject() {

}
function getProjects() {

}
function getIcon() {

}
function setIcon() {

}
function getName() {

}
function getDescription() {

}
function getCreationDate() {

}



//adds a permission to an user
function addUserPermission(userId, permissionId) {
    var sql = "INSERT INTO UserPermission (userId, permissionId) VALUES (?, ?);";
    var values = [userId, permissionId];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
//returns all the permissions of an user
function getUserPermissions(userId) {
    var sql = "SELECT p.permission FROM UserPermission u INNER JOIN Permission p ON u.permissionId == p.permissionId WHERE userId == " + userId;

    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
//removes a permission from a user
function removeUserPermission(userId, permissionId) {
    var sql = "DELETE FROM UserPermission WHERE userId == " + userId + " AND permissionId == " + permissionId;

    conn.query(sql, function (err, results, fields) {
        if (err) throw err;
    });
}

//adds a permission to a group
function addGroupPermission(groupId, permissionId) {
    var sql = "INSERT INTO GroupPermission (groupId, permissionId) VALUES (?, ?);";
    var values = [groupId, permissionId];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}
//returns all the permissions of a group
function getGroupPermissions(groupId) {
    var sql = "SELECT p.permission FROM GroupPermission u INNER JOIN Permission p ON u.permissionId == p.permissionId WHERE userId == " + groupId;

    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
//removes a permission from a group
function removeGroupPermission(groupId) {
    var sql = "DELETE FROM GroupPermission WHERE groupId == " + groupId + " AND permissionId == " + permissionId;

    conn.query(sql, function (err, results, fields) {
        if (err) throw err;
    });
}

//adds a permission
function addPermission(permissionText) {
    var sql = "INSERT INTO Permission (id, permission) VALUES (?, ?);";
    var values = [uuidv4, permissionText];

    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}




//send message
function send(message) {
    serviceBusService.sendQueueMessage((queureName + '-send'), message, function (error) {
    });
}

//loop (request new messages)
function requestMessage() {
    asbService.receiveQueueMessage((queureName + '-recieve'), handleMessage);
}

function handleMessage(error, receivedMessage) {
    if (error) {
        requestMessage();
        return;
    }

    processMessage(receivedMessage);
    requestMessage();
}

function processMessage(message) {
    console.log(message);
}
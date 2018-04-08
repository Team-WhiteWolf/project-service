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
            case "Add_Issue_To_Milestone":
                addIssueMilestone(receivedMessage.payload.issueId, receivedMessage.payload.milestoneId);
                break;
            case "Get_IssueId_From_Milestone":
                getIssueIdMilestone(receivedMessage.payload.milestoneId);
                break;
            case "Remove_Milestone":
                removeIssueMilestone(receivedMessage.payload.issueId, receivedMessage.payload.milestoneId);
                break;
            case "Create_Project":
                createProject(receivedMessage.payload.creatorId, receivedMessage.payload.iconId, receivedMessage.payload.name, receivedMessage.payload.description);
                break;
            case "Get_Icon":
                getIcon(receivedMessage.payload.projectId);
                break;
            case "Set_Icon":
                setIcon(receivedMessage.payload.projectId, receivedMessage.payload.iconId);
                break;
            case "Get_Project_Name":
                getName(receivedMessage.payload.projectId);
                break;
            case "Get_Project_Description":
                getDescription(receivedMessage.payload.projectId);
                break;
            case "Get_Project_Creation_Date":
                getCreationDate(receivedMessage.payload.projectId);
                break;
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

function createProject(creatorId, iconId, name, description) {
    var sql = "INSERT INTO Project (id, creatorId, iconId, name, description, creationDate) VALUES (?, ?, ?, ?, ?, ?);";
    var values = [uuidv4, creatorId, iconId, name, description, this.date];
    conn.query(sql, values, function (err, results, fields) {
        if (err) throw err;
    });
}

function getIcon(projectId) {
    var sql = "SELECT iconId FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function setIcon(projectId, iconId) {
    //TODO
}
function getName(projectId) {
    var sql = "SELECT name FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getDescription(projectId) {
    var sql = "SELECT name FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
    });
}
function getCreationDate(projectId) {
    var sql = "SELECT creationDate FROM Project WHERE id == " + projectId;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            throw err;
        } else {
            send(result);
        }
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
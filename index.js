const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
// const fs = require('fs');
const csv = require('csvtojson');
const ftpClient = require('ftp-client');
const formidable = require('formidable');

var client = new ftpClient({
    host: 'ftp.drivehq.com',
    user: 'brukberhane',
    password: 'bruk@123456'
});
client.connect(() => {
    console.log('connected the ftp server');
});

const port = process.env.PORT || 6969;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/schedule/get/:bIDSec', (req, res) => {

    const bIDSec = req.params.bIDSec;
    console.log(`Requesting schedule for ${bIDSec}`);

    var data = {
        message: "OK"
    };

    client.ftp.cwd("schedules", (err, currDir) => {
        if (err) console.log(err);
        console.log(currDir);

        client.ftp.get(bIDSec.replace('/', '--') + '.json', (err, astream) => {
            if (err) {
                console.log(err);
                res.end(`{\"message": \"Not Found\"}`);
            } else {
                var results = "";
                astream.on('data', chunk => results += chunk);
                astream.on('end', () => {
                    console.log(results);
                    data.schedule = JSON.parse(results);
                    res.send(JSON.stringify(data)).end();
                });
            }

        });
    });

});

app.post('/schedule/update', (req, res) => {
    let password = req.body.password;
    let form = new formidable.IncomingForm();
    form.parse(req);

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        console.log(`password : ${fields.password}`);
        console.log(fields);
        password = fields.password;

        if (password === "M3kk0HzAfFvjdkBwXj") {
            console.log("password matches");
            console.log(files);
            csv()
                .fromFile(files.document.path)
                .then((jsonObj) => {
                    // console.log(jsonObj)

                    console.log(jsonObj[3].PeriodNumber + ' ' + jsonObj[4].PeriodNumber + ' ' + jsonObj[4].SectionName + ' ' + jsonObj[4].RoomName + ' ' + jsonObj[4].CourseCode);

                    client.ftp.cwd("schedules", (err, currDir) => {
                        // if (err) console.log(err);
                        console.log(currDir);

                        client.ftp.get('lists.json', (err, stream) => {
                            if (err) console.log(err);
                            else {
                                var results = "";
                                astream.on('data', chunk => results += chunk);
                                astream.on('end', () => {
                                    console.log(results);
                                    var array = JSON.parse(results)
                                    let i;
                                    for (i = 0; i < array.length; i++){
                                        client.ftp.delete(array[i].replace('/', '--') + '.json', (err) => {
                                            if (err) console.log(err);
                                        });
                                    }
                                });
                            }

                        });

                        var i;
                        let listOfBatches = [];
                        for (i = 0; i < jsonObj.length; i++) {
                            let currBatch = jsonObj[i].SectionName;
                            if (!listOfBatches.includes(currBatch)) {
                                console.log(currBatch + " Pushed");
                                listOfBatches.push(currBatch);

                                let schedule = {
                                    scheduleType: "",
                                    monday: {
                                        firstPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        secondPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        thirdPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fourthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fifthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        sixthPeriod: {
                                            Title: "",
                                            Room: ""
                                        }
                                    },
                                    tuesday: {
                                        firstPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        secondPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        thirdPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fourthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fifthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        sixthPeriod: {
                                            Title: "",
                                            Room: ""
                                        }
                                    },
                                    wednesday: {
                                        firstPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        secondPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        thirdPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fourthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fifthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        sixthPeriod: {
                                            Title: "",
                                            Room: ""
                                        }
                                    },
                                    thursday: {
                                        firstPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        secondPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        thirdPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fourthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fifthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        sixthPeriod: {
                                            Title: "",
                                            Room: ""
                                        }
                                    },
                                    friday: {
                                        firstPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        secondPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        thirdPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fourthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fifthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        sixthPeriod: {
                                            Title: "",
                                            Room: ""
                                        }
                                    },
                                    saturday: {
                                        firstPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        secondPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        thirdPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fourthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        fifthPeriod: {
                                            Title: "",
                                            Room: ""
                                        },
                                        sixthPeriod: {
                                            Title: "",
                                            Room: ""
                                        }
                                    }
                                };
                                var j;
                                for (j = 0; j < jsonObj.length; j++) {
                                    if (jsonObj[j].SectionName === currBatch) {
                                        if (jsonObj[j].DayName === 'Mon') {
                                            switch (jsonObj[j].PeriodNumber) {
                                                case '1':
                                                    schedule.monday.firstPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.monday.firstPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '2':
                                                    schedule.monday.secondPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.monday.secondPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '3':
                                                    schedule.monday.thirdPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.monday.thirdPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '4':
                                                    schedule.monday.fourthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.monday.fourthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '5':
                                                    schedule.monday.fifthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.monday.fifthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '6':
                                                    schedule.monday.sixthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.monday.sixthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                            }
                                        }
                                        else if (jsonObj[j].DayName === 'Tue') {
                                            switch (jsonObj[j].PeriodNumber) {
                                                case '1':
                                                    schedule.tuesday.firstPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.tuesday.firstPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '2':
                                                    schedule.tuesday.secondPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.tuesday.secondPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '3':
                                                    schedule.tuesday.thirdPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.tuesday.thirdPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '4':
                                                    schedule.tuesday.fourthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.tuesday.fourthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '5':
                                                    schedule.tuesday.fifthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.tuesday.fifthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '6':
                                                    schedule.tuesday.sixthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.tuesday.sixthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                            }
                                        }
                                        else if (jsonObj[j].DayName === 'Wed') {
                                            switch (jsonObj[j].PeriodNumber) {
                                                case '1':
                                                    schedule.wednesday.firstPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.wednesday.firstPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '2':
                                                    schedule.wednesday.secondPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.wednesday.secondPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '3':
                                                    schedule.wednesday.thirdPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.wednesday.thirdPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '4':
                                                    schedule.wednesday.fourthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.wednesday.fourthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '5':
                                                    schedule.wednesday.fifthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.wednesday.fifthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '6':
                                                    schedule.wednesday.sixthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.wednesday.sixthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                            }
                                        }
                                        else if (jsonObj[j].DayName === 'Thu') {
                                            switch (jsonObj[j].PeriodNumber) {
                                                case '1':
                                                    schedule.thursday.firstPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.thursday.firstPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '2':
                                                    schedule.thursday.secondPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.thursday.secondPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '3':
                                                    schedule.thursday.thirdPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.thursday.thirdPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '4':
                                                    schedule.thursday.fourthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.thursday.fourthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '5':
                                                    schedule.thursday.fifthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.thursday.fifthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '6':
                                                    schedule.thursday.sixthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.thursday.sixthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                            }
                                        }
                                        else if (jsonObj[j].DayName === 'Fri') {
                                            switch (jsonObj[j].PeriodNumber) {
                                                case '1':
                                                    schedule.friday.firstPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.friday.firstPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '2':
                                                    schedule.friday.secondPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.friday.secondPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '3':
                                                    schedule.friday.thirdPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.friday.thirdPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '4':
                                                    schedule.friday.fourthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.friday.fourthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '5':
                                                    schedule.friday.fifthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.friday.fifthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '6':
                                                    schedule.friday.sixthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.friday.sixthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                            }
                                        }
                                        else if (jsonObj[j].DayName === 'Sat') {
                                            switch (jsonObj[j].PeriodNumber) {
                                                case '1':
                                                    schedule.saturday.firstPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.saturday.firstPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '2':
                                                    schedule.saturday.secondPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.saturday.secondPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '3':
                                                    schedule.saturday.thirdPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.saturday.thirdPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '4':
                                                    schedule.saturday.fourthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.saturday.fourthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '5':
                                                    schedule.saturday.fifthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.saturday.fifthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                                case '6':
                                                    schedule.saturday.sixthPeriod.Title = jsonObj[j].CourseCode;
                                                    schedule.saturday.sixthPeriod.Room = jsonObj[j].RoomName;
                                                    break;
                                            }
                                        }
                                    }
                                }
                                schedule.scheduleType = fields.chooseScheduleType;
                                console.log(schedule);

                                client.ftp.put(JSON.stringify(schedule), currBatch.replace('/', '--') + '.json', (err) => {
                                    // if (err) console.log(err);
                                    console.log("Schedule for Batch:" + currBatch + " uploaded to folder: " + currDir);
                                });

                            }
                        }
                    });
                    client.ftp.put(JSON.stringify(listOfBatches), 'list.json', (err) => {
                        console.log(listOfBatches);
                    });

                });

            res.end('{"message": "OK"}');

        } else {
            console.log("password didn't match");
            res.end("{\"message\": \"1420788507\"}");
        }
    });
});

app.get('/schedule/update/interface/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index1.html"))
});

app.set('port', port);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
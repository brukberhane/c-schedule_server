const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ftpClient = require('ftp-client');

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
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/schedule/get/:bIDSec', (req, res) => {

    const bIDSec = req.params.bIDSec;
    console.log(`Requesting schedule for ${bIDSec}`);

    var data = {
        message: "OK"
    };

    // var schedFile = path.join(__dirname, "/schedules/" + bIDSec + ".json");

    // if (fs.existsSync(schedFile)){
    //     data.schedule = require(schedFile);
    //     res.send(JSON.stringify(data)).end();
    // } else {
    //     res.end(`{\"message\":\"Not Found\"}`)
    // }
    client.ftp.get(bIDSec + '.json', (err, astream) => {
        if (err) {
            console.log(err);
            res.end(`{\"message": \"Not Found\"}`);
        } else {
            var  results = "";
            astream.on('data', chunk => results += chunk);
            astream.on('end', () => {
                console.log(results);
                data.schedule = JSON.parse(results);
                res.send(JSON.stringify(data)).end();
            });
        }

    })

});

app.post('/schedule/update', (req, res) => {

    var password = req.body.password;

    console.log("Connected!\nPassword entered: " + password);

    if (password == "M3kk0HzAfFvjdkBwXj"){
        var schedule = {
            scheduleType : req.body.scheduleType,

            monday : {
                firstClass : {
                    title: req.body.mondayFirstClass,
                    room: req.body.mondayFirstRoom
                },
                secondClass: {
                    title: req.body.mondaySecondClass,
                    room: req.body.mondaySecondRoom
                },
                thirdClass: {
                    title: req.body.mondayThirdClass,
                    room: req.body.mondayThirdRoom
                },
                fourthClass: {
                    title: req.body.mondayFourthClass,
                    room: req.body.mondayFourthRoom
                }
            },
            tuesday: {
                firstClass : {
                    title: req.body.tuesdayFirstClass,
                    room: req.body.tuesdayFirstRoom
                },
                secondClass: {
                    title: req.body.tuesdaySecondClass,
                    room: req.body.tuesdaySecondRoom
                },
                thirdClass: {
                    title: req.body.tuesdayThirdClass,
                    room: req.body.tuesdayThirdRoom
                },
                fourthClass: {
                    title: req.body.tuesdayFourthClass,
                    room: req.body.tuesdayFourthRoom
                }
            },
            wednesday: {
                firstClass : {
                    title: req.body.wednesdayFirstClass,
                    room: req.body.wednesdayFirstRoom
                },
                secondClass: {
                    title: req.body.wednesdaySecondClass,
                    room: req.body.wednesdaySecondRoom
                },
                thirdClass: {
                    title: req.body.wednesdayThirdClass,
                    room: req.body.wednesdayThirdRoom
                },
                fourthClass: {
                    title: req.body.wednesdayFourthClass,
                    room: req.body.wednesdayFourthRoom
                }
            },
            thursday: {
                firstClass : {
                    title: req.body.thursdayFirstClass,
                    room: req.body.thursdayFirstRoom
                },
                secondClass: {
                    title: req.body.thursdaySecondClass,
                    room: req.body.thursdaySecondRoom
                },
                thirdClass: {
                    title: req.body.thursdayThirdClass,
                    room: req.body.thursdayThirdRoom
                },
                fourthClass: {
                    title: req.body.thursdayFourthClass,
                    room: req.body.thursdayFourthRoom
                }
            },
            friday: {
                firstClass : {
                    title: req.body.fridayFirstClass,
                    room: req.body.fridayFirstRoom
                },
                secondClass: {
                    title: req.body.fridaySecondClass,
                    room: req.body.fridaySecondRoom
                },
                thirdClass: {
                    title: req.body.fridayThirdClass,
                    room: req.body.fridayThirdRoom
                },
                fourthClass: {
                    title: req.body.fridayFourthClass,
                    room: req.body.fridayFourthRoom
                }
            },
            saturday: {
                firstClass : {
                    title: req.body.saturdayFirstClass,
                    room: req.body.saturdayFirstRoom
                },
                secondClass: {
                    title: req.body.saturdaySecondClass,
                    room: req.body.saturdaySecondRoom
                },
                thirdClass: {
                    title: req.body.saturdayThirdClass,
                    room: req.body.saturdayThirdRoom
                },
                fourthClass: {
                    title: req.body.saturdayFourthClass,
                    room: req.body.saturdayFourthRoom
                }
            }
        }

        //TODO: Probably remove this code because it's now redundant.
        // var fileLocation = path.join(__dirname, "/schedules/" + req.body.bidsec + ".json");

        // fs.writeFile(fileLocation, JSON.stringify(schedule), (err) => {
        //     if (err) return console.log(err);

        //     console.log("Schedule for Batch:"+req.body.bidsec+" updated.");
        // })

        client.ftp.put(JSON.stringify(schedule), req.body.bidsec + '.json', (err) => {
            if (err) console.log(err);
            console.log("Schedule for Batch:"+req.body.bidsec+" uploaded/updated to the ftp server");
        })
        

        res.redirect('/schedule/update/updated/success');

    } else {
        res.end("{\"message\": \"1420788507\"}");
    }

});

app.get('/schedule/update/updated/success', (req, res) => {
    res.end("<html> <head><title>Update/Add Success! </title></head>  <body> <h1> Successfully updated the the schedule!");
});

app.get('/schedule/update/interface/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.set('port', port);

app.listen(6969, () => {
    console.log(`Server is running on port ${port}`);
});
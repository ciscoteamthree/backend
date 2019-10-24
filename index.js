const Server = require('socket.io');
const moment = require('moment');
const io = new Server();
io.set('origins', '*:*');

let templates = [
    {
        title: "Example template",
        agenda: [
            {
                "title": "Introduksjon",
                "description": "Veldig bra beskrivelse",
                "duration": 300,
                "color": "#ff0000",
            },
            {
                "title": "Part 2",
                "description": "Testing",
                "duration": 500,
                "color": "#00ff00",
            },
            {
                "title": "Break",
                "description": "Have fun!",
                "duration": 1000,
                "color": "#0000ff",
            },
            {
                "title": "Last plan",
                "description": "Hello world",
                "duration": 300,
                "color": "#fefefe",
            },
        ]
    },
    {
        title: "Scrum Retrospective",
        agenda: [
            {
                "title": "Set the stage",
                "description": "Welcome everyone to the retrospective meeting and establish the rules of engagement:\nEmbrace a positive spirit of continuous improvement and share whatever you think will help the team improve.\nDon't make it personal, don't take it personally.\nListen with an open mind, and remember that everyone's experience is valid (even those you don't share).\nSet the boundary of your discussion – is it that last sprint? the last quarter? since the project started? Be clear how far back you're going to go.\nEncourage the team to embrace an improvement mindset, away from blame.",
                "duration": 300,
                "color": "#ff0000",
            },
            {
                "title": "What went well?",
                "description": "Start the session on a positive note. Have each team member use green sticky notes to write down what they feel went well (one idea per sticky). As people post their stickies on the whiteboard, the facilitator should group similar or duplicate ideas together.\n\nDiscuss your ideas briefly as a team.",
                "duration": 600,
                "color": "#00ff00",
            },
            {
                "title": "What needs improvement?",
                "description": "Same structure as above, but using pink or red stickies. Remind your team that this is about actions and outcomes – not about specific people.",
                "duration": 600,
                "color": "#0000ff",
            },
            {
                "title": "Next steps",
                "description": "Having identified what didn't go so well, what concrete actions can the team take to improve those things? Have your team use blue sticky notes to place ideas on the board. Group them and then discuss as a team, agree to which actions you will take, assign owners and a due date to get them DONE.\n\nThank everyone for their involvement and their honesty. Quickly run through the list of follow-up items, their owners and due dates.",
                "duration": 300,
                "color": "#fefefe",
            }
        ]
    }
]

let meeting = null;
/*
let meeting = {
    title: "good meeting",
    startTime: moment().minute(0).second(0).add(10, "minutes").toISOString(),
    advanced: false,
    template: templates[0]
}
*/


io.on('connection', (socket) => {
    io.emit('templates', templates);
    io.emit('currentMeeting', meeting);

    socket.on('editMeeting', (editedMeeting) => {
        meeting = editedMeeting;
        io.emit('currentMeeting', meeting);
    });

    socket.on('endMeeting', () => {
        meeting = null;
        io.emit('currentMeeting', meeting);
    });
});

io.listen(8000);

// Description:
//   Misc
// Commands:
//   hubot hello {member} - hello {member}

module.exports = (robot) => {
    robot.respond(/hello$/i, (msg) => {
        msg.send('hello!');
    });
};

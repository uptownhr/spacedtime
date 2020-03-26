const prompt = function (prompt) {
    console.log(prompt)
    return new Promise((resolve) => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        //process.stdin.on('data', process.exit.bind(process, 0));
        process.stdin.on('data', resolve);
    })
}

exports.prompt = prompt
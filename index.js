#!/usr/bin/env node
const os = require('os')

const actions = require('./actions')
const { program } = require('commander');

const SpacedTime = require('./lib/SpacedTime');

const main = function () {
    const homeDir = os.homedir()
    const spacedTimeConfigFilePath = homeDir + '/.spacedTime'

    const spacedTime = new SpacedTime(spacedTimeConfigFilePath);
    spacedTime.init()

    program.version('0.0.1');

    program
        .command('add <question> <answer>')
        .description('add a question and answer that you want to remember')
        .action(actions.add.bind(null, {spacedTime}));

    program
        .command('recall')
        .description('will display a question for you to recall')
        .action(actions.recall.bind(null, {spacedTime}))

    program.parse(process.argv);
}

main()
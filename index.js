#!/usr/bin/env node
const spacedTime = require('./lib/SpacedTime')
const actions = require('./actions')
const { program } = require('commander');

const main = function () {
    spacedTime.init()

    program.version('0.0.1');

    program
        .command('add <question> <answer>')
        .description('add a question and answer that you want to remember')
        .action(actions.add);

    program
        .command('recall')
        .description('will display a question for you to recall')
        .action(actions.recall)

    program.parse(process.argv);
}

main()
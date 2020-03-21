#!/usr/bin/env node

const { program } = require('commander');
program.version('0.0.1');

program
    .command('add <question> [answer]')
    .description('clone a repository into a newly created directory')
    .action((question, answer) => {
        console.log('clone command called', question, answer);
    });

program.parse(process.argv);
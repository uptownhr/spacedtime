const { prompt } = require('./lib/utils');
const promptly = require('promptly');
const chalk = require('chalk');

exports.recall = async function({ spacedTime }) {
  const qna = spacedTime.getSingleQuestion();

  if (!qna)
    return console.log(
      chalk.yellow(
        'No questions to be recalled at this time. Try again later.'
      ),
      '\n'
    );

  console.log(chalk.bold(qna.question, '\n'));
  await prompt(chalk.yellow('Press any key to reveal the answer', '\n'));

  console.log(chalk.bold(qna.answer, '\n'));

  const remembered = await promptly.choose(
    chalk.yellow('Did you remember successfully? yes(y) or no(n)'),
    ['y', 'n']
  );

  spacedTime.recallAnswer(qna, remembered === 'y');
};

exports.add = async function({ spacedTime }, question, answer) {
  const qna = spacedTime.createQNA(question, answer);
  console.log(chalk.yellow('added'), chalk.yellow(qna.question));
};

exports.list = async function({ spacedTime }) {
  const list = spacedTime.list();

  console.table(list);
};

exports.remove = async function({ spacedTime }, index) {
  const question = spacedTime.data[index];
  spacedTime.remove(index);

  console.log(chalk.yellow('removed', question.question));
};

exports.update = async function({ spacedTime }, index, { question, answer }) {
  const q = spacedTime.data[index];
  const updated = spacedTime.update(index, question, answer);

  console.log(chalk.yellow('updated to'));
  console.table(updated)
};

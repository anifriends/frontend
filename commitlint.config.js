module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'design',
        'comment',
        'style',
        'test',
        'chore',
        'init',
        'rename',
        'remove',
        'docs',
      ],
    ],
  },
};

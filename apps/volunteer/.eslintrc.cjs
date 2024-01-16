module.exports = {
  root: true,
  extends: ['anifriends'],
  overrides: [
    {
      files: ['__mocks__/**.ts', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
      rules: {
        'vitest/expect-expect': 'off',
      },
      globals: {
        globalThis: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        afterEach: true,
        beforeAll: true,
        afterAll: true,
        vi: true,
      },
    },
  ],
};

module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['simple-import-sort', 'import', 'unused-imports', 'react-refresh'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    /* import order */
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    /* unused import */
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 금지
    'react/self-closing-comp': 'error',
    curly: 'error',
    'react-refresh/only-export-components': ['error'], // jsx에서 export default 하나만 가능
    eqeqeq: 'error', // 일치 연산자 사용 필수
    'dot-notation': 'error', // 가능하다면 dot notation 사용
    'react/destructuring-assignment': 'error', // state, prop 등에 구조분해 할당 적용
    'react/jsx-pascal-case': 'error', // 컴포넌트 이름은 PascalCase로
    'react/no-direct-mutation-state': 'error', // state 직접 수정 금지
    'react/jsx-no-useless-fragment': 'error', // 불필요한 fragment 금지
    'react/no-unused-state': 'error', // 사용되지 않는 state
    'react/jsx-key': 'error', // 반복문으로 생성하는 요소에 key 강제
    'react/jsx-curly-brace-presence': 'error', // jsx 내 불필요한 중괄호 금지
    'react/no-unescaped-entities': 'off', // 특수문자 허용
    'react/react-in-jsx-scope': 'off', // import React 검사 끄기
    'react/prop-types': 'off',

    // typescript
    '@typescript-eslint/no-empty-function': 'off',
  },
};

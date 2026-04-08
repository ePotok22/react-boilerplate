const MAX_HEADER_LENGTH = 120;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'custom-format': (parsed) => {
          const { header } = parsed;
          if (!header) {
            return [false, 'Header is required'];
          }

          // Format: <type>(<scope>): <short summary>)
          const typePattern = /^(build|ci|docs|feat|fix|perf|refactor|test)/;
          const scopePattern = /\([^)]+\):/;
          const summaryPattern = /[a-z][\s&+a-z-]*/;

          const fullPattern = new RegExp(
            String.raw`^${typePattern.source}${scopePattern.source}\s+${summaryPattern.source}`,
          );

          if (!fullPattern.test(String(header))) {
            return [
              false,
              'Header must follow format: <type>(<scope>): <short summary>\n' +
                'Examples:\n' +
                '- feat(core): add initial project setup',
            ];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-format': [2, 'always'],
    'header-max-length': [2, 'always', MAX_HEADER_LENGTH],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', ['lower-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'test'],
    ],
  },
};

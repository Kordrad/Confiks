export const CONFIG: string = JSON.stringify(
  {
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    semi: true,
    bracketSpacing: true,
    arrowParens: 'avoid',
    trailingComma: 'es5',
    bracketSameLine: true,
    printWidth: 80,
  },
  undefined,
  2
);

export const IGNORE = `# Add files here to ignore them from prettier formatting
/dist
/coverage
.angular
node_modules
`;

export const ESLINT_SCRIPTS = {
  eslint: 'eslint **/*',
  'eslint:fix': 'eslint **/* --fix',
};

export const PRETTIER_SCRIPTS = {
  prettier: 'prettier --ignore-unknown **/*',
  'prettier:write': 'prettier --write --ignore-unknown **/*',
};

export const STYLELINT_SCRIPTS = {
  stylelint: 'stylelint **/*.{css,scss}',
  'stylelint:fix': 'stylelint **/*.{css,scss} --fix',
};

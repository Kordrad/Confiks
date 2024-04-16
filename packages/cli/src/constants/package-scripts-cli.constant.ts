export const ESLINT_SCRIPTS = {
  'eslint:all': 'eslint **/*',
  'eslint:all::fix': 'eslint **/* --fix',
};

export const PRETTIER_SCRIPTS = {
  'prettier:all': 'prettier --ignore-unknown **/*',
  'prettier:all::write': 'prettier --write --ignore-unknown **/*',
};

export const STYLELINT_SCRIPTS = {
  'stylelint:all': 'stylelint **/*.{css,scss}',
  'stylelint:all::fix': 'stylelint **/*.{css,scss} --fix',
};

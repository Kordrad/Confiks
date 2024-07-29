import { EslintConfigExtensions } from '../../../type/enums/eslint-config-extensions.enum.js';
import { fileSystem } from '../../node/file-system.service.js';

export class EslintService {
  readonly localFileName = fileSystem.queryFileName('eslint.config');

  writeConfig(
    fileName: `${string}.${EslintConfigExtensions}`,
    config: string
  ): void {
    fileSystem.writeFile(fileName, config);
  }

  addExtensions(): void {
    const eslintConfigPath = this.localFileName;
    console.log(eslintConfigPath);
    /*

    if (!eslintConfigPath) {
      throw new Error('Configuration file not found.');
    }

    // Read the current ESLint configuration as a string
    const eslintConfigContent = fileSystem.readFileSync(eslintConfigPath);

    // Generate the code to import the additional configuration
    const additionalConfigImport = `import confiksConfig from './.eslintrc.confiks.js';\n`;
    const additionalConfigRequire = `const confiksConfig = require('./.eslintrc.confiks.js');\n`;

    // Generate the code to add the additional configuration to the existing configuration
    const mergeConfigCode = `{
      ...confiksConfig
    }`;

    let updatedEslintConfigContent;

    if (eslintConfigContent.includes('module.exports')) {
      // Handle CommonJS module syntax
      updatedEslintConfigContent =
        additionalConfigRequire +
        eslintConfigContent.replace(
          'module.exports = [',
          `module.exports = [
    // Extend with configurations from .eslintrc.confiks.js
    ${mergeConfigCode},`
        );
    } else if (eslintConfigContent.includes('export default')) {
      // Handle ES6 module syntax
      updatedEslintConfigContent =
        additionalConfigImport +
        eslintConfigContent.replace(
          'export default [',
          `export default [
    // Extend with configurations from .eslintrc.confiks.js
    ${mergeConfigCode},`
        );
    } else {
      throw new Error('Unsupported ESLint configuration format.');
    }

    // Save the updated ESLint configuration back to the file
    fileSystem.writeFile(eslintConfigPath, updatedEslintConfigContent);

    console.log('ESLint configuration has been updated successfully.');*/
  }
}

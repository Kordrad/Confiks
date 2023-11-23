import { getJestProjects } from '@nx/jest';
import { Config } from 'jest';

export default {
  projects: getJestProjects(),
} satisfies Config;

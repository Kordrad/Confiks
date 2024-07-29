import { PackageChoice } from '../components/choices/package.choice.js';
import { MultiSelect } from '../components/prompts/multiselect.prompt.js';
import type { PackageInterface } from '../type/interfaces/package.interface.js';

export async function selectPackageGroup({
  prefix,
  message,
  choices,
}: {
  prefix: string;
  message: string;
  choices: PackageInterface[];
}): Promise<PackageInterface[]> {
  const result = await MultiSelect<
    { group: PackageInterface[] },
    PackageInterface
  >({
    prefix,
    message,
    choices: choices.map(choice => new PackageChoice(choice)),
    name: 'group',
    result() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore workaround, selected is "private" member of enquirer
      return this.selected.map(({ value }) => value);
    },
  });
  return result.group;
}

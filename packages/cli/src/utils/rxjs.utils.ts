import { Observable, tap } from 'rxjs';

export function getQestion(
  name: string,
  callback: (...arguments_: unknown[]) => void
) {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      tap((value: unknown) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (value?.name === name) {
          callback(value);
        }
      })
    );
  };
}

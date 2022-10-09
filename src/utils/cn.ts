type CnPropsType = (string | Record<string, boolean> | undefined)[];

export function cn(...args: CnPropsType) {
  const classesArray = args.reduce((acc, item) => {
    if (!item) {
      return acc;
    }

    if (typeof item === 'string') {
      acc.push(item);
    } else {
      Object.entries(item).forEach(([key, value]) => {
        if (value) {
          acc.push(key);
        }
      });
    }

    return acc;
  }, [] as string[]);

  return classesArray.join(' ');
}

export const parseParams = (params: Record<string, unknown>) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (!value) {
        return null;
      }
      if (typeof value === 'string') {
        return `${key}: "${value}"`;
      }
      if (value instanceof Array) {
        if (typeof value[0] === 'string') {
          return `${key}: [${value.map((v) => `"${v}"`).join(', ')}]`;
        }
        return `${key}: [${value.join(', ')}]`;
      }
      return `${key}: ${value}`;
    })
    .filter((t) => t)
    .join(', ');
};

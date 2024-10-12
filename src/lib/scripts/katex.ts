import katex from 'katex';

export function k(x: string) {
  return katex.renderToString(x, { throwOnError: false });
}
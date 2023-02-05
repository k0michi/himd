import * as hipt from 'hipt';

interface CompileOptions {
  emitSection: boolean;
}

export function compile(source: string, options: CompileOptions = { emitSection: true }) {
  const tree = hipt.parse(source, { deepenIf: value => value.startsWith('#') });
  return flatten(tree.children[0], options).trimEnd();
}

function appendTwoBreaks(text: string) {
  const breaksExp = /\n*$/;

  const result = breaksExp.exec(text)!;
  const breaks = result[0].length;

  if (breaks < 2) {
    return text + '\n'.repeat(2 - breaks);
  }

  return text;
}

function flatten(node: hipt.Node, options: CompileOptions, depth = 0): string {
  let content = '#'.repeat(Math.min(depth, 5)) + node.value! + '\n';

  for (const c of node.children) {
    if (c.value!.startsWith('#')) {
      if (options.emitSection) {
        content = appendTwoBreaks(content);
        content += '<section>\n\n';
      }

      content += flatten(c, options, depth + 1);

      if (options.emitSection) {
        content = appendTwoBreaks(content);
        content += '</section>\n\n';
      }
    } else {
      content += c.value! + '\n';
    }
  }

  return content;
}
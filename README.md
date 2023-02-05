# Himd (Hierarchically Indented Markdown)

Himd is basically Markdown, but it is outlined with indentations. Himd clarifies the sections of text and helps you organize the document structure. This library provides functions to convert Himd text into Markdown.

The following example shows how Himd text looks like:

```
# Heading 1
  Paragraphs...

  # Heading 2
    Paragraphs...

    # Heading 3
      Paragraphs...

  # heading 2
    Paragraphs...
```

The example above is converted into Markdown like this:

```
# Heading 1
Paragraphs...

<section>

## Heading 2
Paragraphs...

<section>

### Heading 3
Paragraphs...

</section>

</section>

<section>

## heading 2
Paragraphs...

</section>
```

You can optionally prevent the emission of `<section></section>`.

## Installation

```bash
$ npm i himd
$ yarn add himd
```

## Usage

```js
import * as himd from 'himd';

const markdown = himd.compile(`# Heading 1
  Paragraphs...

  # Heading 2
    Paragraphs...`);

/*
markdown == `# Heading 1
Paragraphs...

<section>

## Heading 2
Paragraphs...

</section>`
*/
```

## Known issues

- Lines starting with `#` within code blocks may not be handled correctly.

## License
MIT License
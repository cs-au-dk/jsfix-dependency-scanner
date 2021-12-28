# JSFIX Dependency Scanner

[![@latest](https://img.shields.io/npm/v/@jsfix/dependency-scanner)](https://www.npmjs.com/package/@jsfix/dependency-scanner)

The JSFIX dependency scanner is a small tool for uploading package dependencies
to https://jsfix.live/, to enable JSFIX to check whether any package upgrades
are available.

By registering your package dependencies with JSFIX, you will be notified when 
major updates are available and JSFIX can help you upgrade your code.

## Usage

First, sign up at https://jsfix.live/dependency-scanner. 

You can then register your dependencies by running 

```
npx @jsfix/dependency-scanner -p <ID>
```

in your project directory (containing package.json and package-lock.json)
where `<ID>` is the project ID you obtained when signing up.

## Installation as postinstall hook

To make sure the dependency scanner is run each time your dependencies change, 
add this in your package.json file:

```
"scripts": {
  "postinstall": "npx @jsfix/dependency-scanner -p <ID>"
},
```
where `<ID>` is the project ID you obtained when signing up.

## License

Copyright (c) 2022 Coana.tech

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
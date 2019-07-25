# Source Attribution

Summary TODO

## Features
-

## Dependencies

1. Lodash merge function.

## Usage

### Install

```shell
npm install @informatix8/source-attribution --save-dev
```

### CDN

```html
<script src="https://unpkg.com/@informatix8/source-attribution/dist/source-attribution.all.umd.js"></script>
```

### Vanilla Javascript

```javascript
new SourceAttribution({
  foo: 'foo',
  bar: 'bar'
});
```

## Development

```shell
npm run dev
```

## Build

```shell
npm run build
```

## Release

```shell
npm run build
git tag -a vX.Y.Z
git push origin master
git push origin --tags
npm publish --access=public .
```

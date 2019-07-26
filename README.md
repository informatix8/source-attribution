# Source Attribution

Append content to copied clipboard text.

## Features
- Append your product name and source URL to copied text from your web page
- Custom copied character count threshold for addiing the content
- Tag copy events in Google Analytics

## Dependencies

- Lodash merge function

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
  productName: 'My Product'
});
```

### Add Google Analytics

Google Analytics instructs that you add their javascript to the `<head>` of your document.

```html
<head>
    <script async="async" src="https://www.googletagmanager.com/gtag/js?id=UA-xxxxxxxxx-x"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-xxxxxxxxx-x');
    </script>
</head>
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

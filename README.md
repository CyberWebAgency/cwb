# CWB Website

A modern, responsive website for CWB featuring a beautiful design and optimal performance.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Optimized performance with lazy loading
- SEO-friendly structure
- Browser caching and GZIP compression
- Optimized images with WebP and AVIF formats
- Custom fonts with optimized loading

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Deploy to your web server

## Performance Optimizations

The website includes several performance optimizations:

- Browser caching for static assets
- GZIP compression for text-based files
- Lazy loading for images
- Optimized image formats (WebP, AVIF)
- Minified CSS and JavaScript
- Custom font optimization
- Disabled ETags for better caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Development

To start the development server:

```bash
npm run dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

## Deployment

1. Upload the contents of the `dist` directory to your web server
2. Ensure your server has the following modules enabled:
   - mod_deflate (for GZIP compression)
   - mod_expires (for browser caching)
   - mod_headers (for HTTP headers)

## License

All rights reserved. 
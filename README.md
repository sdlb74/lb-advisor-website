# LB Advisor Website

This is the revamped website for LB Advisor, built with Next.js, Tailwind CSS, and Framer Motion.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the project:

```bash
npm run build
```

## Deploying to GitHub Pages

This project is configured for static export compatibility (images unoptimized).

To deploy to GitHub Pages:

1. Update `next.config.ts` to include `output: 'export'`:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. Run `npm run build`.
3. The static files will be in the `out` directory.
4. Push the contents of the `out` directory to your GitHub Pages branch (usually `gh-pages`).

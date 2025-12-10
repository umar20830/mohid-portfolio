# Mohid Ali - SEO Specialist Portfolio

A modern, production-ready SEO portfolio website built with Next.js 16, Tailwind CSS v4, Framer Motion, GSAP, and Lenis smooth scroll. Features scroll-based 3D parallax effects, dark mode, and a strict 8px spacing system.

## Features

- **Next.js 16 App Router** - Latest React Server Components
- **Tailwind CSS v4** - Modern utility-first styling
- **Framer Motion + GSAP** - Smooth animations and transitions
- **Lenis** - Buttery smooth scrolling
- **3D Parallax Effects** - Depth-based scroll animations
- **Dark Mode** - System preference + manual toggle
- **8px Spacing System** - Pixel-perfect layouts
- **SEO Optimized** - Meta tags, Open Graph, structured data
- **Fully Responsive** - Mobile-first design
- **Accessible** - WCAG compliant, keyboard navigation

## Quick Start

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & CSS variables
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── projects/           # Case studies page
│   └── services/           # Services page
├── components/
│   ├── layout/             # Navbar, Footer, Providers
│   ├── sections/           # Page sections (Hero, etc.)
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── constants.ts        # Site config, services, case studies
│   └── utils.ts            # Utility functions (cn, formatters)
└── public/                 # Static assets
```

## Spacing System

The project uses a strict 8px base spacing system. All spacing values are multiples of 8px.

### CSS Variables

```css
:root {
  --space-1: 8px;    /* 8px */
  --space-2: 16px;   /* 16px */
  --space-3: 24px;   /* 24px */
  --space-4: 32px;   /* 32px */
  --space-5: 48px;   /* 48px */
  --space-6: 64px;   /* 64px */
  --space-7: 80px;   /* 80px */
  --space-8: 96px;   /* 96px */
}
```

### Tailwind Usage

```jsx
// Using standard Tailwind (which maps to 4px base)
<div className="p-4">    {/* 16px */}
<div className="p-8">    {/* 32px */}
<div className="gap-6">  {/* 24px */}

// Using custom CSS variables
<div style={{ padding: 'var(--space-4)' }}>
```

### Modifying Spacing

Edit `app/globals.css` to adjust the spacing scale:

```css
:root {
  --space-1: 10px;  /* Change base unit to 10px */
  --space-2: 20px;
  /* ... */
}
```

## Typography

### Font Sizes (Scale)

```css
:root {
  --base-size: 16px;
  --scale-xs: 12px;
  --scale-sm: 14px;
  --scale-base: 16px;
  --scale-1: 20px;
  --scale-2: 24px;
  --scale-3: 30px;
  --scale-4: 36px;
  --scale-5: 48px;
  --scale-6: 60px;
  --scale-7: 72px;
}
```

### Line Heights

```css
:root {
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 1.75;
}
```

## Container Widths

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;   /* Default content width */
  --container-xl: 1280px;   /* Wide sections */
  --container-2xl: 1536px;  /* Full-width sections */
}
```

### Usage

```jsx
<Container size="content">  {/* max-w-screen-lg (1024px) */}
<Container size="wide">     {/* max-w-screen-xl (1280px) */}
<Container size="full">     {/* max-w-screen-2xl (1536px) */}
```

## Section Heights

Minimum heights ensure sections never collapse:

```css
:root {
  --section-hero: 100vh;      /* Full viewport hero */
  --section-hero-min: 60vh;   /* Minimum hero height */
  --section-major: 40vh;      /* Major content sections */
  --section-minor: 30vh;      /* Minor sections */
}
```

### Usage

```jsx
<Section size="hero">   {/* min-h-[60vh] md:min-h-screen */}
<Section size="major">  {/* min-h-[40vh] */}
<Section size="minor">  {/* min-h-[30vh] */}
<Section size="auto">   {/* No minimum height */}
```

## Touch Targets & Buttons

All interactive elements meet the 44x44px minimum touch target:

```css
:root {
  --touch-target: 44px;
  --button-height: 44px;
  --button-height-lg: 52px;
  --button-height-sm: 36px;
}
```

### Button Variants

```jsx
<Button variant="primary">   {/* Blue background */}
<Button variant="secondary"> {/* Gray background */}
<Button variant="outline">   {/* Border only */}
<Button variant="ghost">     {/* No background */}

<Button size="sm">  {/* 36px height */}
<Button size="md">  {/* 44px height (default) */}
<Button size="lg">  {/* 52px height */}
```

## Parallax Settings

The 3D parallax effect uses depth layers for scroll-based animations:

```css
:root {
  --parallax-depth-1: 0.1;  /* Slowest (background) */
  --parallax-depth-2: 0.2;
  --parallax-depth-3: 0.3;
  --parallax-depth-4: 0.5;
  --parallax-depth-5: 0.8;  /* Fastest (foreground) */
}
```

### Adjusting Parallax Intensity

To reduce parallax intensity (for better performance or preference):

```css
:root {
  --parallax-depth-1: 0.05;
  --parallax-depth-2: 0.1;
  --parallax-depth-3: 0.15;
  /* ... */
}
```

### Disabling Parallax

Parallax is automatically disabled when:
- User has `prefers-reduced-motion: reduce` enabled
- On mobile devices (configurable in components)

## Dark Mode

Dark mode supports:
1. **System preference** - Automatically matches OS setting
2. **Manual toggle** - Click the sun/moon icon in navbar

### Colors

Colors are defined with CSS variables that switch automatically:

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #2563eb;
  /* ... */
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --primary: #3b82f6;
  /* ... */
}
```

## Reduced Motion Support

For users with `prefers-reduced-motion`:
- All animations are disabled or minimized
- Parallax effects are turned off
- Transitions use minimal duration

## Customization

### Site Configuration

Edit `lib/constants.ts`:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your description',
  url: 'https://yourdomain.com',
  email: 'your@email.com',
  location: 'Your Location',
  // ...
};
```

### Services

```typescript
export const services = [
  {
    id: 'service-id',
    title: 'Service Name',
    description: 'Service description',
    icon: 'IconName',  // See Icons.tsx for options
    features: ['Feature 1', 'Feature 2'],
  },
  // ...
];
```

### Case Studies

```typescript
export const caseStudies = [
  {
    id: 'case-study-id',
    title: 'Project Title',
    client: 'Client Name',
    industry: 'Industry',
    results: [
      { metric: 'Traffic', before: '10K', after: '100K', change: '+900%' },
    ],
    // ...
  },
];
```

## Performance Optimization

### Mobile Fallbacks

- Heavy 3D effects use simplified versions on mobile
- Parallax intensity reduced on touch devices
- Animations simplified for lower-end devices

### Image Optimization

- All images use Next.js Image component
- Lazy loading enabled by default
- Placeholder blur effects

### Code Splitting

- Each page is automatically code-split
- Heavy animations loaded only when needed
- Lenis and GSAP are tree-shaken

## SEO Features

- **Meta Tags** - Title, description, keywords
- **Open Graph** - Facebook, LinkedIn sharing
- **Twitter Cards** - Twitter preview
- **Structured Data** - JSON-LD (add as needed)
- **Sitemap** - Add via next-sitemap package
- **Robots.txt** - Crawling instructions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use for personal or commercial projects.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://greensock.com/)
- Smooth scroll by [Lenis](https://lenis.studiofreight.com/)

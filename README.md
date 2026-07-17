# Cosmos

![App Preview](https://imgix.cosmicjs.com/0e7bf200-8204-11f1-af68-e50dff7bef1c-autopilot-photo-1543722530-d2c3201371e7-1784308935889.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, science-museum-inspired blog exploring physics, gravity, time, space, and the cosmos. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🌌 **Museum-inspired design** — elegant serif headings, generous whitespace, and exhibit-style layouts
- 📝 **Article pages** with rich content, featured images, reading time, tags, author, and category
- 🏷️ **Category exhibits** — browse posts grouped by topic with accent-colored theming
- 👤 **Author profiles** — meet the curators behind the cosmos
- 🖼️ **Optimized imagery** via imgix
- 📱 **Fully responsive** across all devices
- ⚡ **Server Components** for fast, SEO-friendly rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6a5a646065e864ae5ea3f38a&clone_repository=6a5a657deaa94fad67649381)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog about space with posts, authors, and categories. Compelling and fascinating articles about physics, gravity, time, space, and the cosmos.
>
> The user is rebuilding an existing website and provided these design notes: Styled like a science museum. Factor these preferences into the content structure."

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Cosmos". The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A blog about space with posts, authors, and categories. Compelling and fascinating articles about physics, gravity, time, space, and the cosmos. Styled like a science museum.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `categories`, `authors`, and `posts`

### Installation

```bash
bun install
```

Create environment variables (these are provided automatically in the Cosmic dashboard):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with author + category resolved
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app reads from three object types:

- **posts** — title, excerpt, content, featured_image, tags, reading_time, publish_date, author (object), category (object)
- **authors** — name, role, bio, profile_photo
- **categories** — name, description, cover_image, accent_color

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel** — import the repo and add environment variables
- **Netlify** — set the build command to `bun run build`

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting dashboard.
<!-- README_END -->
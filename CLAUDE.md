# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 digital garden (数字花园) - a personal knowledge management and blogging platform with MDX-based content, featuring custom interactive components and a built-in glossary system.

**Tech Stack**: Next.js 14 (App Router), React 18, TypeScript 5, Tailwind CSS, Velite (MDX processing), Radix UI

**Package Manager**: pnpm (required - version 10.7.1+)

## Development Commands

```bash
# Development server (Velite runs via webpack plugin)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Architecture

### Content System with Velite

The site uses **Velite** to process MDX content from `content/` directory. This is NOT a typical CMS - content is authored as `.mdx` files and compiled at build time.

**Key Files**:
- `velite.config.ts` - Content collections schema and MDX processing pipeline
- `next.config.mjs` - Custom VeliteWebpackPlugin integrates Velite into Next.js build
- `.velite/` - Generated content (DO NOT edit)

**Content Collections**:
- `content/blog/**/*.mdx` - Blog posts and articles
- `content/dict/glossary.ts` - Glossary terms for dictionary system

**Post Schema** (defined in velite.config.ts):
```typescript
{
  slug: string,        // Auto-generated from path
  title: string,       // Max 99 chars
  description?: string, // Max 999 chars
  date: Date,          // ISO date string
  published: boolean,  // Default true
  tags?: string[],     // Array of tag strings
  status: enum,        // "seedling" | "growing" | "evergreen"
  body: MDX content
}
```

### Custom MDX Components

MDX content is rendered with custom components defined in `components/mdx-components.tsx`:

**Custom Components**:
- `Callout` - Styled callout boxes with type variants (info/warning/danger)
- `QuizBar` - Interactive quiz components
- `Dialogue` / `SpeechBubble` - Chat-like dialogue displays
- `SplitLayout` / `SplitImage` - Split-screen layouts
- `BookCard` - Book display cards
- `AlgorithmVisualizer` - Algorithm visualization with D3.js
- `DatabaseTable` / `DatabaseData` - Database schema visualization
- `Accordion` / `Tabs` - Radix UI-based interactive containers
- `DictTooltip` - Glossary term tooltips (auto-injected)
- `LinkCard` - Styled link cards
- `Sidenote` - Side notes

**Image Handling**: Images use `react-photo-view` for zoom functionality. Use `<img />` (not Next.js `<Image />`) in MDX for automatic PhotoView wrapping.

### Dictionary/Glossary System

**This is a custom feature unique to this project**:

1. **Glossary Data**: `content/dict/glossary.ts` defines terms with definitions, aliases, and links
2. **Rehype Plugin**: `lib/rehype-dict/index.ts` automatically wraps glossary terms in MDX with `<DictTooltip>` components
3. **Disabling**: Add `<!-- dict: false -->` comment to any MDX file to disable auto-linking

**Glossary Entry Structure**:
```typescript
{
  term: string,         // Primary term
  type: string,         // Category/type label
  definition: string,   // Term definition
  contributors: string, // Contributor attribution
  aliases?: string[],   // Alternative terms that also trigger tooltip
  links?: Array<{name: string, url: string}>
}
```

### Path Aliases

```typescript
"@/*" → root directory
"#site/content" → .velite directory (generated content)
```

### Styling System

**Tailwind Configuration** (`tailwind.config.ts`):
- Custom CSS variables in `:root` for theming (defined in `app/globals.css`)
- Semantic color tokens: `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `callout-*`, `graph-*`
- Custom `dropShadow` utilities: `icon-bg-light`, `icon-bg-dark` for icon backgrounds
- Custom animations: `accordion-down`, `accordion-up`

**Dark Mode**: Uses `next-themes` with class-based strategy (`dark` class on `<html>`)

**Component Styling**:
- `components/ui/` - Radix UI primitives with Tailwind styles (headless UI)
- Custom components use `cn()` utility (`lib/utils.ts`) for className merging

### Routing Structure

```
app/
├── blog/[...slug]/page.tsx     # Dynamic blog post routes
├── blog/page.tsx               # Blog listing
├── tags/[tag]/page.tsx         # Tag-filtered posts
├── archive/page.tsx            # Archive by date
├── search/page.tsx             # Search page
├── editor/page.tsx             # MDX editor (preview)
├── moments/page.tsx            # Micro-posts
├── gallery/page.tsx            # Photo gallery
├── map/page.tsx                # Knowledge graph visualization
└── journeys/page.tsx           # Learning journeys
```

**Dynamic Routes**:
- Blog posts use catch-all route `[...slug]` for nested paths (e.g., `blog/reading-notes/post-title`)
- Tags use `github-slugger` for URL-safe tag names (supports Chinese characters via decoding)

### Utility Functions (`lib/utils.ts`)

- `cn()` - Merge Tailwind classes with `clsx` + `tailwind-merge`
- `formatDate()` - Format dates to "Month DD, YYYY"
- `sortPosts()` - Sort posts by date descending
- `getAllTags()` - Extract all tags with counts from posts
- `sortTagsByCount()` - Sort tags by frequency
- `getPostsByTagSlug()` - Filter posts by tag slug (handles Chinese decoding)

### Key Components Architecture

**`components/mdx-components.tsx`**: Central MDX component registry
- Uses `React.memo()` to prevent unnecessary re-renders
- Creates MDX components via `new Function()` pattern for runtime compilation
- Passes components to MDX via `components` prop

**`components/site-header.tsx`**: Main navigation with:
- Main navigation links
- Search trigger (opens Command Palette)
- Theme toggle
- Mobile navigation menu

**`components/command-palette.tsx`**: Global search (Cmd+K) with:
- Fuzzy search across posts
- Keyboard navigation
- Tag filtering

**`components/dict-tooltip.tsx`**: Glossary term tooltip with:
- Hover card display
- Keyboard accessibility (Enter/Space to open, Escape to close)
- Analytics tracking

### API Routes

```
app/api/
├── search/route.ts      # Post search API
├── tags/route.ts        # All tags API
├── og/route.ts          # OG image generation
└── mdx/route.ts         # MDX compilation endpoint
```

## Content Authoring Guidelines

### Creating New Blog Posts

1. Create `.mdx` file in `content/blog/` (can use subdirectories for organization)
2. Add frontmatter with required fields: `title`, `date`, `published`, `tags`, `status`
3. File path becomes URL slug (e.g., `content/blog/react/hooks.mdx` → `/blog/react/hooks`)

### Using Custom MDX Components

```mdx
<Callout type="warning">Important note</Callout>

<QuizBar question="What is 2+2?" options={["3", "4", "5"]} answer="4" />

<Dialogue>
  <SpeechBubble speaker="Alice">Hello!</SpeechBubble>
  <SpeechBubble speaker="Bob">Hi there!</SpeechBubble>
</Dialogue>

<SplitLayout>
  <div>Left content</div>
  <SplitImage src="/image.jpg" alt="Description" />
</SplitLayout>
```

### Adding Glossary Terms

Edit `content/dict/glossary.ts`:
```typescript
export const glossary = [
  {
    term: "React",
    type: "Framework",
    definition: "A JavaScript library for building user interfaces",
    contributors: "猫颜",
    aliases: ["React.js"],
    links: [
      { name: "Official Docs", url: "https://react.dev" }
    ]
  }
]
```

Terms will be auto-linked in all MDX content (unless disabled with `<!-- dict: false -->`)

## Important Patterns

### Content Build Process

Velite is integrated via custom webpack plugin in `next.config.mjs`:
- Runs on `next dev` in watch mode
- Runs on `next build` for production
- Generates type-safe content in `.velite/` directory
- Access via `#site/content` import alias

### MDX Processing Pipeline

Defined in `velite.config.ts`:
1. Parse MDX files from `content/blog/**/*.mdx`
2. Apply `remark` plugins (currently none)
3. Apply `rehype` plugins:
   - `rehype-dict` (custom - inject glossary tooltips)
   - `rehype-slug` (add IDs to headings)
   - `rehype-pretty-code` (syntax highlighting)
   - `rehype-autolink-headings` (anchor links to headings)
4. Output compiled content to `.velite/`

### Tag Handling

Tags support both English and Chinese:
- `github-slugger` converts tags to URL-safe slugs
- `getPostsByTagSlug()` handles decoding for proper matching
- Tag pages at `/tags/[slug]` filter posts by tag

## Configuration Files

- `config/site.ts` - Site metadata (name, URL, author, social links)
- `config/timeline.ts` - Timeline data for journeys page
- `velite.config.ts` - Content schema and MDX processing
- `next.config.mjs` - Next.js config + Velite webpack plugin
- `tailwind.config.ts` - Tailwind theme extension
- `tsconfig.json` - TypeScript config with path aliases

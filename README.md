# Next.js Blog with microCMS

A minimalist blog application built with Next.js, Tailwind CSS, and microCMS.

## Features

- Blog post listing with pagination
- Individual blog post pages
- Search functionality
- Dark/light mode toggle
- Responsive design

## Getting Started

### Prerequisites

- Node.js
- microCMS account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### microCMS Setup

1. Create a microCMS account at [https://microcms.io/](https://microcms.io/)
2. Create a new service
3. Create an API named "blogs" with the following fields:
   - title (Text field)
   - content (Rich text field)
   - eyecatch (Image field)
   - tags (List field)

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

This project is licensed under the MIT License.
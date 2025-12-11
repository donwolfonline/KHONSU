#  <img width="286" height="275" alt="Screenshot 2025-12-12 at 1 13 48 AM" src="https://github.com/user-attachments/assets/5ebb91f8-87fe-4341-9e83-d426b7707993" />
KHONSU

> **One link to rule your digital universe under the moon's glow**

Khonsu is a premium Egyptian-themed link-in-bio platform featuring a mystical dark granite aesthetic with glassmorphism UI. Create your personalized profile page with links, stories, and places - all styled with the elegance of ancient Egypt.

![Khonsu Banner](https://img.shields.io/badge/Status-Production%20Ready-gold?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript) ![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)

---

## ✨ Features

### � **Egyptian Pharaoh Theme**
- **Dark Granite Aesthetic** - Deep stone backgrounds with gold accents
- **Glassmorphism UI** - Liquid glass effects with backdrop blur
- **Hieroglyphic Borders** - Authentic Egyptian decorative patterns
- **Gold Gradients** - Royal Egyptian gold (#d4af37) throughout
- **Cinzel Typography** - Classical serif font for that ancient elegance

### 👑 **Core Features**
- **Custom Profile Links** - Unlimited social and website links
- **Instagram-Style Stories** - 24-hour story highlights with viewer
- **Places Collection** - Showcase special locations with maps
- **Theme Customization** - 13+ premium themes including exclusive Pharaoh
- **Video Embeds** - YouTube integration with autoplay support
- **Real-time Preview** - Live mobile preview while editing

### 🔐 **Authentication & Security**
- Secure email/password authentication
- JWT session management
- Protected routes and API endpoints
- Password change functionality

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Smooth animations across all devices

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SQLite (included)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/donwolfonline/KHONSU.git
cd KHONSU
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

---

## 📂 Project Structure

```
KHONSU/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── [username]/      # Public profile pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── demo/           # Demo showcase page
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Auth endpoints
│   │   │   ├── links/      # Links management
│   │   │   ├── stories/    # Stories management
│   │   │   ├── places/     # Places management
│   │   │   └── profile/    # Profile data
│   │   └── globals.css     # Egyptian theme styles
│   ├── components/
│   │   ├── Navbar.tsx      # Main navigation
│   │   └── StoryViewer.tsx # Story viewer modal
│   └── lib/
│       └── prisma.ts       # Database client
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
└── public/
    ├── khonsu-logo.png     # Egyptian falcon logo
    └── uploads/            # User uploaded files
```

---

## 🎯 Features Guide

### Dashboard

Navigate to `/dashboard` after login to access:

- **Profile Tab** - Edit name, bio, profile image
- **Links Tab** - Add/edit/delete links with drag-to-reorder
- **Stories Tab** - Upload 24-hour stories with preview
- **Places Tab** - Add locations with images, descriptions, ratings
- **Appearance Tab** - Choose from 13+ themes including Pharaoh
- **Settings Tab** - Change password, view stats

### Themes

**Pharaoh Theme (Default)** - Egyptian design with:
- Dark granite backgrounds
- Gold accents and borders
- Glassmorphism effects
- Hieroglyphic patterns
- Cinzel typography

**Other Themes**: Purple Gradient, Pink Sunset, Ocean Blue, Dark Mode, Sunrise, Northern Lights, Cherry Blossom, Tropical, Sunset Beach, Galaxy, Forest, Fire

### Public Profile

Access any profile at `/{username}`:
- View all visible links
- Browse stories with swipe viewer
- Explore places on interactive map
- Share profile with one click
- Mobile optimized layout

### Demo Page

Visit `/demo` to see all features in action with sample data.

---

## 🛠️ Development

### Environment Setup

Create `.env` file in root:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
```

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Development Scripts

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

### Code Style

- **TypeScript** for type safety
- **CSS Modules** for scoped styling
- **Client Components** for interactivity (`"use client"`)
- **Server Components** for data fetching (default)
- **API Routes** in `app/api/`

---

## 🐛 Troubleshooting

### Common Issues

**Problem**: Database connection errors
```bash
# Solution: Reset and regenerate database
npx prisma generate
npx prisma db push
```

**Problem**: Port 3000 already in use
```bash
# Solution: Kill process or use different port
lsof -ti:3000 | xargs kill
# OR
npm run dev -- -p 3001
```

**Problem**: Images not uploading
```bash
# Solution: Ensure uploads directory exists
mkdir -p public/uploads
chmod 755 public/uploads
```

**Problem**: Authentication not working
```bash
# Solution: Check JWT_SECRET is set
echo $JWT_SECRET
# Add to .env if missing
```

**Problem**: Styles not applying
```bash
# Solution: Clear Next.js cache
rm -rf .next
npm run dev
```

**Problem**: Prisma client errors
```bash
# Solution: Regenerate Prisma client
npx prisma generate
```

### Build Issues

**CSS Module errors**: Ensure imports use `.module.css` extension

**Type errors**: Run `npx tsc --noEmit` to check TypeScript errors

**Missing dependencies**: Run `npm install` to ensure all packages installed

---

## 📊 Database Schema

### User
- id, email, password, name, username, bio, image
- themeId, customBackground, fontColor, fontFamily
- createdAt, updatedAt

### Link
- id, userId, title, url, type, order
- isVisible, autoplay
- createdAt, updatedAt

### Story
- id, userId, imageUrl
- createdAt, updatedAt

### Place
- id, userId, title, description
- imageUrl, locationLink, rating
- createdAt, updatedAt

---

## 🎨 Design System

### Colors
```css
/* Egyptian Palette */
--background: #0d0d0d;        /* Deep black stone */
--foreground: #f5f5dc;        /* Papyrus white */
--primary: #d4af37;           /* Egyptian gold */
--secondary: #1a1614;         /* Dark granite */
--accent: #8b4513;            /* Terracotta */
--border: #2a2420;            /* Granite border */
```

### Typography
- **Headings**: Cinzel (serif, Egyptian-inspired)
- **Body**: Inter/Geist Sans (modern, readable)
- **Buttons**: Cinzel uppercase with wide letter-spacing

### Spacing
- Base unit: 1rem (16px)
- Padding: 0.875rem - 2rem
- Gaps: 0.75rem - 2rem
- Border radius: 0.25rem (sharp Egyptian edges)

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-secure-jwt-secret"
NEXTAUTH_URL="https://yourdomain.com"
```

### Database Migration
```bash
# Apply migrations in production
npx prisma migrate deploy
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Links
- `GET /api/links` - Get user links
- `POST /api/links` - Create link
- `PUT /api/links` - Update link
- `DELETE /api/links` - Delete link

### Stories
- `GET /api/stories` - Get user stories
- `POST /api/stories` - Upload story
- `DELETE /api/stories` - Delete story

### Places
- `GET /api/places` - Get user places
- `POST /api/places` - Create place
- `PUT /api/places` - Update place
- `DELETE /api/places` - Delete place

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Prisma** - Database ORM
- **Cinzel** - Egyptian-inspired font
- **Unsplash** - Demo images

---

## 📧 Contact

- **Repository**: https://github.com/donwolfonline/KHONSU
- **Issues**: https://github.com/donwolfonline/KHONSU/issues

---

<div align="center">

**Built with 🏛️ by the light of the moon**

*Khonsu - Egyptian god of the moon, time, and travelers*

</div>

# <img width="50" height="50" alt="Thatch" src="public/thatch-logo.png" /> Thatch

> **Curate Your Journey**

Thatch is a premium link-in-bio platform designed for travelers and creators. Featuring a clean, light aesthetic with vibrant coral accents, Thatch helps you showcase your links, stories, and favorite places in a unified, beautiful profile.

![Thatch Banner](https://img.shields.io/badge/Status-Production%20Ready-FF6B4A?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript) ![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)

---

## ✨ Features

### 🌺 **Thatch Design System**
- **Clean Light Aesthetic** - Fresh white backgrounds with soft shadows.
- **Coral Accents** - Vibrant `#FF6B4A` primary color for energy.
- **Creative Circle Tabs** - Unique, playful navigation design.
- **Modern Typography** - Uses **Outfit** and **Inter** for modern readability.

### 👑 **Core Features**
- **Smart Auto-Save** - No more "Save" buttons. Changes sync automatically.
- **Mobile Arc Menu** - Interactive "Fan Out" navigation for mobile devices.
- **Story Ring** - Instagram-style story highlights around your profile picture.
- **Custom Links** - Unlimited links with drag-and-drop reordering.
- **Places Collection** - Share your favorite travel spots with images and ratings.
- **Theme Engine** - Choose from curated themes like Coral, Ocean, and Sunset.
- **Live Preview** - See your changes in real-time as you edit.

### 🔐 **Authentication & Security**
- Secure email/password authentication
- JWT session management
- Protected dashboard routes
- Smart session handling

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes.
- **Interactive UI**: Floating action buttons (FAB) and creative interactions.
- **Touch-Friendly**: Large touch targets and swipe gestures.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SQLite (included)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/donwolfonline/TravLink.git
cd TravLink
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

## 🎯 Features Guide

### Dashboard
Navigate to `/dashboard` to curate your profile:

- **Profile 👤**: Edit bio, upload profile pick (with Story Ring support).
- **Links 🔗**: Manage your links. Click to expand/collapse.
- **Stories 📸**: Upload photo stories.
- **Places 🌍**: Add travel recommendations.
- **Appearance 🎨**: Switch themes, customize fonts and buttons.
- **Settings ⚙️**: Account management.

### Mobile Experience
On mobile, the dashboard uses a unique **"Arc Fan" Menu**. Click the button in the bottom-right corner to fan out your navigation options!

### Public Profile
Access your profile at `/{username}`:
- Clean, list-based link layout.
- Interactive Story Viewer.
- Places grid with ratings.
- "Save Contact" vCard support (coming soon).

---

## 🛠️ Development

### Environment Setup
Create `.env` file in root:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
```

### Key Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Manage Database
npx prisma studio
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

## 🎨 Design Tokens

### Colors
```css
--primary: #FF6B4A;       /* Thatch Coral */
--background: #FFFFFF;    /* Clean White */
--foreground: #1A1A1A;    /* Dark Gray Text */
--secondary: #F5F5F5;     /* Light Gray BG */
--border: #E5E5E5;        /* Subtle Borders */
```

### Typography
- **Headings**: Outfit
- **Body**: Inter

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

**Current Version: 2.0 (Thatch Rebrand)**

*Adventure Awaits.*

</div>

# ReadJourney Frontend

## Project Overview

This project is the frontend part of **ReadJourney**, a web application for book lovers that helps track reading progress, discover new books, and manage personal reading library.

The application allows users to browse recommended books, add them to their personal library, track reading progress with detailed statistics, and receive insights on reading speed and time estimates.

Built with **Next.js**, **TypeScript**, **Zustand**, **TanStack Query**, and **Axios**.

## Author

**Viktor Liulchyk**

- GitHub: [@Viktor-Lyulchik](https://github.com/Viktor-Lyulchik)
- LinkedIn: [linkedin.com/in/viktorliulchyk](https://www.linkedin.com/in/viktorliulchyk/)
- Email: viktor.lyulchik@gmail.com

## Live Demo

- [Live site on Vercel](https://readjourney-khaki.vercel.app)

## Pages

### Home (`/`)

- Redirects to registration page for new users.

### Authentication

#### Register (`/register`)

- User registration with form validation.
- Name, email, and password fields.
- Redirect to login after successful registration.

#### Login (`/login`)

- User authentication.
- Email and password fields.
- Redirect to recommended books page after successful login.

### Recommended Books (`/recommended`)

- Displays catalog of recommended books.
- Backend filtering by:
  - Title (text input)
  - Author (text input)
- Pagination with "Load More" functionality.
- Add books to personal library.
- Book cards showing:
  - Cover image
  - Title and author
  - Total pages

### My Library (`/library`)

- Personal book collection.
- Three status categories:
  - Unread books
  - In-progress books
  - Completed books
- Remove books from library.
- Start reading functionality.
- Navigate to reading page for in-progress books.

### Reading (`/reading/:bookId`)

- Detailed reading interface for a specific book.
- Reading progress tracker:
  - Start reading session
  - Log page progress
  - Complete reading session
- Reading statistics:
  - Reading speed (pages per minute)
  - Time left to finish book
  - Progress visualization
- Reading history with all sessions.
- Book details and cover.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens.
- **Book Discovery**: Browse recommended books with filtering options.
- **Personal Library**: Manage books in three categories (unread, in-progress, done).
- **Reading Tracker**: 
  - Start and stop reading sessions
  - Track page progress
  - Calculate reading speed
  - Estimate time to completion
- **Reading Statistics**: Visual representation of reading habits and progress.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Form Validation**: Real-time validation with React Hook Form and Yup.
- **Toast Notifications**: User feedback with Sonner toast library.

## Technologies Used

- **Next.js 16** (App Router with Server and Client Components)
- **TypeScript** (Type safety)
- **Zustand** (Lightweight state management)
- **TanStack Query** (Server state management and caching)
- **Axios** (HTTP requests)
- **React Hook Form** (Form management)
- **Yup** (Schema validation)
- **Tailwind CSS** (Styling)
- **Radix UI** (Accessible components)
- **Lucide React** (Icons)
- **Sonner** (Toast notifications)

## API

Uses the backend API with the following main endpoints:

**Authentication:**
- `POST /users/signup` - User registration
- `POST /users/signin` - User login
- `POST /users/signout` - User logout
- `GET /users/current` - Get current user info

**Books:**
- `GET /books/recommend` - Get recommended books with filtering and pagination
- `POST /books/add` - Add book to personal library
- `DELETE /books/remove/:bookId` - Remove book from library
- `GET /books/own` - Get user's library books
- `POST /books/reading/start` - Start reading a book
- `POST /books/reading/finish` - Finish reading session
- `DELETE /books/reading/delete` - Delete reading session

## State Management

- **Zustand Store**: 
  - User authentication state
  - Auth token management
  - User profile data
- **TanStack Query**: 
  - Server state caching
  - Automatic refetching
  - Optimistic updates
  - Request deduplication

## Project Structure

```
/app
  /(auth)          # Authentication routes
    /login         # Login page
    /register      # Registration page
  /(private)       # Protected routes
    /recommended   # Recommended books catalog
    /library       # Personal library
    /reading       # Reading progress tracker
  /api             # API integration layer
/components        # Reusable UI components
  /AuthForm        # Authentication forms
  /Books           # Book-related components
  /Dashboard       # Dashboard widgets
  /Header          # Navigation header
  /Modals          # Modal dialogs
  /MyLibrary       # Library components
  /ui              # Base UI components
/lib               # Utilities and helpers
  /api             # API client functions
  /styles          # Style utilities
/stores            # Zustand stores
/types             # TypeScript type definitions
```

## Installation

```bash
# Clone the repository
git clone https://github.com/Viktor-Lyulchik/readjourney.git
cd readjourney

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_API_URL=your_backend_api_url
```

## Key Features Implementation

### Authentication Flow
- JWT token stored in HTTP-only cookies
- Automatic token refresh
- Protected routes with middleware
- Persistent authentication state

### Reading Progress Tracking
- Session-based tracking
- Real-time speed calculation
- Progress visualization
- Historical data preservation

### Data Fetching Strategy
- Server-side rendering for initial data
- Client-side caching with TanStack Query
- Optimistic UI updates
- Background refetching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

---

**Note**: This is a learning project demonstrating modern web development practices with Next.js, TypeScript, and React ecosystem tools.

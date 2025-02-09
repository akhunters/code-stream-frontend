# 🚀 Code Stream Blog

A **modern blog application** built with **Next.js App Router**. This project demonstrates authentication, server actions, atomic design principles, and seamless user experience with a rich-text editor.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, React Server Components (RSC)
- **UI Framework:** ShadCN (Radix UI), Tailwind CSS
- **Authentication:** NextAuth.js (Google & Facebook OAuth)
- **State Management:** React Hooks & Context API
- **Rich Text Editing:** TipTap Editor
- **API Calls:** Axios & Server Actions
- **Middleware:** Next.js Middleware for route protection
- **Deployment:** Docker (Future plans for Terraform & AWS)

---

## 🔐 Authentication Flow

1. Users can **sign in with Google or Facebook** via NextAuth.js.
2. The OAuth token is sent to the backend for **JWT token generation**.
3. The frontend uses this JWT for all **authenticated API requests**.

---

## 🏗️ Project Structure

```
src/
 ├── components/  
 │   ├── ui/           # Pre-built components from ShadCN  
 │   ├── atoms/        # Smallest UI elements (buttons, icons)  
 │   ├── molecules/    # Combinations of atoms (input fields, cards)  
 │   ├── organisms/    # Complex UI elements (navbars, modals)  
 │   ├── templates/    # Page-level layouts  
 │   ├── skeletons/    # Skeleton loaders for UI elements  
 │
 ├── app/ # Only add routing pages here
 │   ├── example/        # Example routing page
 │   │   ├── page.tsx
 │   ├── layout.tsx       # Root layout with global styles and authentication
 │   ├── page.tsx         # Home page (displays blog posts)
 │   ├── error.tsx        # Custom error page  
 │   ├── global-error.tsx # Global error handling  
 │   ├── not-found.tsx    # 404 Page  
 │
 ├── actions/
 │   ├── example.action.ts
 │
 ├── providers/ # Define API context providers
 │   ├── example.provider.tsx
 ├── middleware.ts    # Protects private routes (can also add CSP and CORS policies)
```

---

## 🌍 Routes

| Route                  | Type     | Description |
|------------------------|---------|-------------|
| `/`                    | Public  | Home page displaying blog posts |
| `/signin`              | Public  | Sign-in page (Google/Facebook OAuth) |
| `/signout`             | Public  | Logs user out and redirects to `/signin` |
| `/dashboard`           | Private | User dashboard (view & manage posts) |
| `/dashboard/write`     | Private | Post creation page (TipTap editor) |
| `/blog/[id]`          | Public  | Single blog post view |

**🔒 Private routes** are protected using **Next.js Middleware**.

---

## 🖼️ Image Upload (Planned Feature)

- When a user **attaches a thumbnail image** in a blog post:
  1. The frontend **requests a pre-signed URL** from the backend (AWS S3).
  2. The image is **uploaded directly to S3** using a `PUT` request.
  3. The image **URL is sent along with the post data** and stored in the database.

---

## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/akhunters/code-stream-frontend.git
cd code-stream-frontend
```

### **2️⃣ Install Dependencies**
```sh
nvm use
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env.local` file in the root directory:

```sh
AUTH_SECRET=your_secret
AUTH_URL=http://localhost:3000
AUTH_REDIRECT_PROXY_URL=http://localhost:3000/api/auth

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

AUTH_FACEBOOK_ID=your_facebook_client_id
AUTH_FACEBOOK_SECRET=your_facebook_client_secret

CODE_STREAM_BACKEND_BASE_URL=http://localhost:5000
```

### **4️⃣ Run the Development Server**
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Unit Testing

This project uses **Jest** and **React Testing Library** for unit testing.

### **Running Tests**
```sh
npm run test
```

### **Test File Structure**
Test files should follow the `.spec.ts` naming convention and be placed in the same directory as the component they test.

Example:
```
src/components/molecules/
 ├── blog-post.tsx  # Component file
 ├── blog-post.spec.ts  # Test file
```

---

## 📖 Documentation & References

- **Next.js App Router** → [Next.js Docs](https://nextjs.org/docs/app)
- **NextAuth.js** → [NextAuth Docs](https://authjs.dev/getting-started)
- **TipTap Editor** → [TipTap Docs](https://tiptap.dev/docs/editor/getting-started/install/nextjs)
- **ShadCN (UI Components)** → [ShadCN Docs](https://ui.shadcn.com/docs)

---

## 🚀 Future Enhancements

- ✅ **Post Image Upload** (AWS S3 + Pre-signed URLs)
- ✅ **SEO Optimization** (Meta tags, Open Graph)
- ✅ **Dark Mode Support**
- ✅ **Improved API Error Handling**
- ✅ **Responsive Design**

---


# Bookstore CRUD (Frontend-only)

This is a lightweight frontend-only Bookstore CRUD application built with React (via CDN) and plain JavaScript. It persists data in the browser's localStorage so you can add, edit, delete, and search books without a backend.

Files added/changed:

- `index.html` — Loads React and the app, contains basic styles and a `#root` element.
- `script.js` — React single-file application implementing Book CRUD and localStorage persistence.

How to run

1. Open `index.html` in your browser (double-click or use "Open with" from your file manager).
2. The app runs entirely in the browser. No server or build step required.

Features

- Add new books (title, author, price)
- Edit existing books
- Delete individual books
- Clear all books
- Search by title or author
- Data is saved in `localStorage` under key `books`

Notes and next steps

- For a production app, bundle React with a build tool and add a backend API to persist data on a server.
- To turn this into a multi-file React project (create-react-app or Vite), I can scaffold that for you.

// Bookstore CRUD React app (single-file) - uses React 18 via CDN loaded in index.html
const e = React.createElement;

function useLocalStorageState(key, initial) {
  const [state, setState] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (err) {
      console.error("localStorage read error", err);
      return initial;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error("localStorage write error", err);
    }
  }, [key, state]);
  return [state, setState];
}

function BookForm({ onSave, editing, onCancel }) {
  const [title, setTitle] = React.useState(editing ? editing.title : "");
  const [author, setAuthor] = React.useState(editing ? editing.author : "");
  const [price, setPrice] = React.useState(editing ? editing.price : "");

  React.useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAuthor(editing.author);
      setPrice(editing.price);
    } else {
      setTitle("");
      setAuthor("");
      setPrice("");
    }
  }, [editing]);

  function handleSubmit(eve) {
    eve.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert("Title and Author are required");
      return;
    }
    const book = {
      id: editing ? editing.id : Date.now().toString(),
      title: title.trim(),
      author: author.trim(),
      price: price ? parseFloat(price) : 0,
    };
    onSave(book);
    if (!editing) {
      setTitle("");
      setAuthor("");
      setPrice("");
    }
  }

  return e(
    "form",
    { onSubmit: handleSubmit },
    e("input", {
      placeholder: "Book title",
      value: title,
      onChange: (e) => setTitle(e.target.value),
    }),
    e("input", {
      placeholder: "Price (optional)",
      value: price,
      onChange: (e) => setPrice(e.target.value),
      type: "number",
      step: "0.01",
    }),
    e("input", {
      placeholder: "Author",
      value: author,
      onChange: (e) => setAuthor(e.target.value),
    }),
    e(
      "div",
      {
        style: { gridColumn: "1 / -1", display: "flex", gap: 8, marginTop: 8 },
      },
      e("button", { type: "submit" }, editing ? "Update Book" : "Add Book"),
      editing
        ? e(
            "button",
            { type: "button", className: "secondary", onClick: onCancel },
            "Cancel"
          )
        : null
    )
  );
}

function BooksTable({ books, onEdit, onDelete }) {
  if (!books || books.length === 0)
    return e(
      "div",
      { className: "empty" },
      "No books yet. Add one using the form above."
    );
  return e(
    "table",
    null,
    e(
      "thead",
      null,
      e(
        "tr",
        null,
        e("th", null, "Title"),
        e("th", null, "Author"),
        e("th", null, "Price"),
        e("th", null, "Actions")
      )
    ),
    e(
      "tbody",
      null,
      books.map((b) =>
        e(
          "tr",
          { key: b.id },
          e("td", null, b.title),
          e("td", null, b.author),
          e("td", null, b.price ? "$" + Number(b.price).toFixed(2) : "-"),
          e(
            "td",
            { className: "actions" },
            e("button", { onClick: () => onEdit(b) }, "Edit"),
            e(
              "button",
              {
                onClick: () => {
                  if (confirm("Delete this book?")) onDelete(b.id);
                },
                className: "secondary",
              },
              "Delete"
            )
          )
        )
      )
    )
  );
}

function App() {
  const [books, setBooks] = useLocalStorageState("books", []);
  const [query, setQuery] = React.useState("");
  const [editing, setEditing] = React.useState(null);

  function addOrUpdate(book) {
    setBooks((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) {
        return prev.map((b) => (b.id === book.id ? book : b));
      }
      return [book, ...prev];
    });
    setEditing(null);
  }

  function editBook(book) {
    setEditing(book);
  }
  function cancelEdit() {
    setEditing(null);
  }
  function deleteBook(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }
  function clearAll() {
    if (confirm("Clear all books?")) setBooks([]);
  }

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
  );

  return e(
    "div",
    { className: "app" },
    e("h1", null, "Bookstore CRUD"),
    e(
      "div",
      { className: "controls" },
      e(
        "div",
        { style: { flex: 1 } },
        e(BookForm, {
          onSave: addOrUpdate,
          editing: editing,
          onCancel: cancelEdit,
        })
      ),
      e(
        "div",
        {
          style: {
            width: 220,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          },
        },
        e("input", {
          className: "search",
          placeholder: "Search title or author",
          value: query,
          onChange: (e) => setQuery(e.target.value),
        }),
        e("button", { onClick: clearAll, className: "secondary" }, "Clear all")
      )
    ),
    e(BooksTable, { books: filtered, onEdit: editBook, onDelete: deleteBook }),
    e(
      "p",
      { style: { marginTop: 12, color: "#666" } },
      `${filtered.length} of ${books.length} books shown`
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));

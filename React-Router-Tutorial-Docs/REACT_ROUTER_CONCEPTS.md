# React Router v6 - Concepts & Implementation Guide

This document outlines all React Router concepts implemented in this tutorial project.

## Table of Contents
- [Core Routing Setup](#core-routing-setup)
- [Hooks Reference](#hooks-reference)
- [Components & APIs](#components--apis)
- [Advanced Features](#advanced-features)
- [Data Patterns](#data-patterns)
- [Implementation Examples](#implementation-examples)

---

## Core Routing Setup

### Router Configuration (`main.jsx`)
```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
    ],
  },
]);

<RouterProvider router={router} />
```

**Key Concepts:**
- `createBrowserRouter`: Object-based route configuration
- `path`: URL pattern (use `:paramName` for dynamic segments)
- `element`: Component to render for this route
- `loader`: Async function to fetch data before rendering
- `action`: Async function to handle form submissions
- `children`: Nested routes
- `errorElement`: Error boundary component
- `index: true`: Default child route

---

## Hooks Reference

### 1. `useLoaderData()`
Access data returned by the route's loader function.

**Location:** `root.jsx`, `contact.jsx`, `edit.jsx`

```jsx
export async function loader({ params, request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  // Use contacts and q in your component
}
```

**Use Cases:**
- Display fetched data
- Access query parameters
- Pre-populate forms

---

### 2. `useNavigation()`
Track the global navigation state for loading indicators.

**Location:** `root.jsx`

```jsx
import { useNavigation } from "react-router-dom";

const navigation = useNavigation();

// navigation.state values: "idle" | "loading" | "submitting"
<div className={navigation.state === "loading" ? "loading" : ""}>
  <Outlet />
</div>

// Check if searching
const searching = 
  navigation.location &&
  new URLSearchParams(navigation.location.search).has("q");
```

**Properties:**
- `navigation.state`: Current navigation state
- `navigation.location`: Pending navigation location
- `navigation.formData`: Data being submitted

**Use Cases:**
- Show loading spinners
- Add loading CSS classes
- Display search indicators

---

### 3. `useNavigate()`
Programmatically navigate to different routes.

**Location:** `edit.jsx`

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Navigate back
<button onClick={() => navigate(-1)}>Cancel</button>

// Navigate to specific route
<button onClick={() => navigate("/contacts")}>Go to Contacts</button>
```

**Use Cases:**
- Cancel buttons
- Redirect after custom logic
- Navigate without form submission

---

### 4. `useSubmit()`
Programmatically submit forms without user interaction.

**Location:** `root.jsx` (search-as-you-type)

```jsx
import { useSubmit } from "react-router-dom";

const submit = useSubmit();

<input
  onChange={(event) => {
    const isFirstSearch = q == null;
    submit(event.currentTarget.form, {
      replace: !isFirstSearch,  // Don't add to history
    });
  }}
/>
```

**Options:**
- `replace: true`: Replace current history entry
- `method: "post"`: Specify HTTP method

**Use Cases:**
- Search-as-you-type
- Auto-save forms
- Trigger actions on events

---

### 5. `useRouteError()`
Access errors thrown during rendering, data loading, or actions.

**Location:** `error-page.jsx`

```jsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
```

**Error Properties:**
- `error.status`: HTTP status code
- `error.statusText`: Status message
- `error.message`: Error message
- `error.data`: Additional error data

**Use Cases:**
- Display 404 pages
- Show error messages
- Log errors for debugging

---

### 6. `useFetcher()`
Submit forms and load data without navigation (optimistic UI).

**Location:** `contact.jsx` (Favorite button)

```jsx
import { useFetcher } from "react-router-dom";

function Favorite({ contact }) {
  const fetcher = useFetcher();
  
  // Optimistic UI: show pending state immediately
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button name="favorite" value={favorite ? "false" : "true"}>
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

**Properties:**
- `fetcher.Form`: Form that doesn't navigate
- `fetcher.formData`: Pending form data
- `fetcher.state`: "idle" | "submitting" | "loading"
- `fetcher.data`: Response data

**Use Cases:**
- Toggle favorites
- Like buttons
- Quick actions without page change
- Optimistic UI updates

---

## Components & APIs

### 1. `<Link>` - Basic Navigation
```jsx
import { Link } from "react-router-dom";

<Link to="/contacts">Contacts</Link>
<Link to={`/contacts/${contact.id}`}>View Contact</Link>
```

---

### 2. `<NavLink>` - Navigation with Active State
**Location:** `root.jsx`

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to={`contacts/${contact.id}`}
  className={({ isActive, isPending }) =>
    isActive ? "active" : isPending ? "pending" : ""
  }
>
  {contact.first} {contact.last}
</NavLink>
```

**Props:**
- `className`: Function or string
- `style`: Function or object
- `isActive`: Boolean (current route matches)
- `isPending`: Boolean (navigation in progress)

**Use Cases:**
- Highlight current page in navigation
- Show loading state on links

---

### 3. `<Form>` - Enhanced Form with Routing
**Location:** `root.jsx`, `contact.jsx`, `edit.jsx`

```jsx
import { Form } from "react-router-dom";

// POST to current route's action
<Form method="post">
  <button type="submit">New</button>
</Form>

// POST to relative action
<Form method="post" action="destroy">
  <button type="submit">Delete</button>
</Form>

// GET for search (submits to loader)
<Form id="search-form" role="search">
  <input type="search" name="q" />
</Form>
```

**Props:**
- `method`: "get" | "post" (default: "get")
- `action`: Relative or absolute path
- `replace`: Replace history entry
- `onSubmit`: Custom submit handler

**Differences from `<form>`:**
- Prevents full page reload
- Uses client-side routing
- Calls route actions instead of server endpoints

---

### 4. `<Outlet>` - Render Child Routes
**Location:** `root.jsx`

```jsx
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">{/* Navigation */}</div>
      <div id="detail">
        <Outlet />  {/* Child routes render here */}
      </div>
    </>
  );
}
```

**Use Cases:**
- Layout routes
- Nested navigation
- Shared layouts (header, sidebar, footer)

---

## Advanced Features

### 1. Loader Functions
Fetch data before route renders.

**Location:** `root.jsx`, `contact.jsx`

```jsx
export async function loader({ params, request }) {
  // Access URL params
  const contactId = params.contactId;
  
  // Access search params
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  
  // Fetch data
  const contact = await getContact(contactId);
  
  // Throw for 404
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return { contact };
}
```

**Parameters:**
- `params`: URL parameters (`:contactId`)
- `request`: Full Request object

**Best Practices:**
- Export as named export: `export async function loader`
- Import with alias: `import { loader as contactLoader }`
- Return serializable data (JSON)
- Throw Responses for errors

---

### 2. Action Functions
Handle form submissions and data mutations.

**Location:** `root.jsx`, `contact.jsx`, `edit.jsx`, `destroy.jsx`

```jsx
import { redirect } from "react-router-dom";

export async function action({ request, params }) {
  // Get form data
  const formData = await request.formData();
  
  // Convert to object
  const updates = Object.fromEntries(formData);
  
  // Or get specific field
  const favorite = formData.get("favorite") === "true";
  
  // Update data
  await updateContact(params.contactId, updates);
  
  // Redirect after success
  return redirect(`/contacts/${params.contactId}`);
}
```

**Parameters:**
- `request`: Contains form data
- `params`: URL parameters

**Return Values:**
- `redirect(path)`: Navigate to new route
- `null`: Stay on current route
- `{ ... }`: Return data to component

---

### 3. Nested Routing with Error Boundaries

**Location:** `main.jsx`

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,  // Top-level errors
    children: [
      {
        errorElement: <ErrorPage />,  // Child route errors
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteAction,
            errorElement: <div>Oops! Delete failed.</div>,
          },
        ],
      },
    ],
  },
]);
```

**Benefits:**
- Granular error handling
- Parent layout stays intact on child errors
- Custom error messages per route

---

### 4. Search Parameters & Synchronization

**Location:** `root.jsx`

```jsx
// Loader: Read from URL
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

// Component: Sync with input
export default function Root() {
  const { q } = useLoaderData();
  
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  
  return (
    <Form>
      <input name="q" defaultValue={q} />
    </Form>
  );
}
```

**Pattern:**
1. Read query from `request.url` in loader
2. Return query value
3. Use `defaultValue` in input
4. Sync with `useEffect` for browser back/forward

---

### 5. Index Routes (Default Child)

**Location:** `main.jsx`

```jsx
children: [
  { index: true, element: <Index /> },  // Renders at parent path
  { path: "contacts/:contactId", element: <Contact /> },
]
```

**When to Use:**
- Empty state for list views
- Dashboard home page
- Default tab in tabbed interface

---

### 6. Action-Only Routes

**Location:** `destroy.jsx`

```jsx
export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}

// No default export (no component)
```

**Route Config:**
```jsx
{
  path: "contacts/:contactId/destroy",
  action: deleteAction,
  // No element - just handles POST requests
}
```

**Use Cases:**
- Delete operations
- API endpoints
- Webhook handlers

---

## Data Patterns

### Local Storage Integration

**Location:** `contacts.js`

```jsx
import localforage from "localforage";

export async function getContacts(query) {
  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await localforage.setItem("contacts", contacts);
  return contact;
}
```

**Libraries Used:**
- `localforage`: IndexedDB wrapper for persistent storage
- `match-sorter`: Fuzzy search
- `sort-by`: Multi-field sorting

---

### Fake Network Delays (Development)

**Location:** `contacts.js`

```jsx
let fakeCache = {};

async function fakeNetwork(key) {
  if (fakeCache[key]) return;  // Already loaded
  
  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
```

**Purpose:**
- Simulate API latency
- Test loading states
- Demonstrate caching

---

## Implementation Examples

### Complete CRUD Example (Contacts)

#### 1. List View with Search (`root.jsx`)
```jsx
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  return (
    <>
      <Form id="search-form">
        <input
          name="q"
          defaultValue={q}
          onChange={(e) => submit(e.currentTarget.form)}
        />
      </Form>
      
      <Form method="post">
        <button type="submit">New</button>
      </Form>
      
      <nav>
        {contacts.map((contact) => (
          <NavLink key={contact.id} to={`contacts/${contact.id}`}>
            {contact.first} {contact.last}
          </NavLink>
        ))}
      </nav>
      
      <div className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}
```

#### 2. Detail View (`contact.jsx`)
```jsx
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div>
      <h1>{contact.first} {contact.last}</h1>
      
      <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
      
      <Form
        method="post"
        action="destroy"
        onSubmit={(e) => {
          if (!confirm("Delete?")) e.preventDefault();
        }}
      >
        <button type="submit">Delete</button>
      </Form>
      
      <Favorite contact={contact} />
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button name="favorite" value={favorite ? "false" : "true"}>
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
```

#### 3. Edit Form (`edit.jsx`)
```jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post">
      <input name="first" defaultValue={contact?.first} />
      <input name="last" defaultValue={contact?.last} />
      <input name="twitter" defaultValue={contact?.twitter} />
      <input name="avatar" defaultValue={contact?.avatar} />
      <textarea name="notes" defaultValue={contact?.notes} />
      
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate(-1)}>
        Cancel
      </button>
    </Form>
  );
}
```

#### 4. Delete Action (`destroy.jsx`)
```jsx
export async function action({ params }) {
  await deleteContact(params.contactId);
  return redirect("/");
}
```

---

## Common Patterns & Best Practices

### 1. Import Aliases for Loaders/Actions
```jsx
import Contact, { loader as contactLoader } from "./routes/contact";
import { action as deleteAction } from "./routes/destroy";
```

### 2. Confirm Before Destructive Actions
```jsx
<Form
  onSubmit={(event) => {
    if (!confirm("Are you sure?")) {
      event.preventDefault();
    }
  }}
>
  <button type="submit">Delete</button>
</Form>
```

### 3. Loading State Management
```jsx
const navigation = useNavigation();
const isLoading = navigation.state === "loading";
const isSubmitting = navigation.state === "submitting";
```

### 4. Optimistic UI Updates
```jsx
const fetcher = useFetcher();
const optimisticValue = fetcher.formData
  ? fetcher.formData.get("field")
  : actualValue;
```

### 5. Form Data Handling
```jsx
// Get all fields as object
const data = Object.fromEntries(await request.formData());

// Get specific field
const formData = await request.formData();
const value = formData.get("fieldName");
```

---

## Key Takeaways

1. **Loaders fetch data** - Actions handle mutations
2. **Use `<Form>`** instead of `<form>` for routing integration
3. **Export loaders/actions** as named exports from route files
4. **Throw Responses** for errors (404, 500, etc.)
5. **Use `useFetcher`** for actions without navigation
6. **`<NavLink>`** for active link styling
7. **`<Outlet>`** renders child routes in layouts
8. **`useNavigation()`** for global loading states
9. **Search params** via `request.url` in loaders
10. **`redirect()`** after successful mutations

---

## Resources

- [React Router Docs](https://reactrouter.com)
- [Tutorial Source](https://reactrouter.com/6.30.2/start/tutorial)
- [API Reference](https://reactrouter.com/6.30.2/api)

---

**Project Structure Reference:**
```
src/
├── main.jsx              # Router configuration
├── contacts.js           # Data layer (API/storage)
├── routes/
│   ├── root.jsx          # Layout + list (loader + action)
│   ├── index.jsx         # Default home view
│   ├── contact.jsx       # Detail view (loader + action)
│   ├── edit.jsx          # Edit form (action)
│   └── destroy.jsx       # Delete (action only)
└── error-page.jsx        # Error boundary
```

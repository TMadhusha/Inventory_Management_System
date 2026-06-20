# Inventory_Management_System
It is a simple Inventory Management System that helps track products, manage stock levels,  and view inventory statistics.  This is a frontend-only project — no backend or database is 
used. Just used localStorage to store and persist all data.

# Tech Stack

- **Frontend**: React.js, JavaScript  
- **Styling**: Tailwind CSS
- **Validation**: Formik + Yup
- **Local Storage**: For data persistence

---
# How to run the project locally
- cd Frontend/inventory_management
- npm install
- npm run dev

### Open your browser and navigate to the local server address provided in your terminal output (typically http://localhost:5173).
---
# Features

* **Welcome Page:** Clean introductory landing screen experience.
* **Complete Product CRUD:**
    * Add new items with an **automatic SKU generator** (`PRD-XXXXXX`).
    * Edit existing product details
    * Remove products 
* **Stock Management:** Accurate increment (`+`) and decrement (`-`) inventory steps with responsive "Out of Stock" alerts.
* **Categorization:** Create and track custom asset categories.
    * Deleting categories cleanly manages connected data.
* **Data Filtering:**
   * Filtering by matching product name or SKU
   * Filtering by categories or stock availability status using the dropdown.
* **Dynamic Theme Toggling:** Full application switching support between Dark Mode and Light Mode setups.

---


 

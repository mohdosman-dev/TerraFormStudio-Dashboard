# Terra Form Studio — Admin Dashboard Requirements

## Purpose

The Terra Form Studio Admin Dashboard is a web-based management console for curators operating the marketplace. It translates the consumer-facing premium gallery aesthetic into an internal system for managing artisans, customers, products, collections, orders, and platform settings.

The admin experience should feel refined and editorial while still being efficient for operational work. It must support fast decision-making, clear oversight, and high-confidence management of a curated ceramics marketplace.

Initial scope includes admin authentication, dashboard overview, artisan management, customer management, product management, collection management, order management, and system settings.

## What Is the Admin Dashboard

The admin dashboard is the internal control layer of Terra Form Studio. It is used by curators and operators to manage the gallery ecosystem, not by customers.

The system should support the following primary admin jobs:
- monitor marketplace health
- manage artisans and their profiles
- manage products and curated collections
- oversee customer relationships
- track and update order lifecycle
- configure platform-wide operational settings

### Admin Roles

The system may support multiple internal roles over time:
- **Curator** — manages artisans, products, collections, and editorial presentation
- **Operations Admin** — manages orders, settings, and transactional workflows
- **Super Admin** — full access across all modules, permissions, and system controls

### Admin Capabilities

Admins should be able to:
- authenticate securely
- navigate across all management modules from a persistent side navigation
- search across core entities quickly
- review KPIs and recent activity
- create, edit, publish, archive, and update domain records
- receive status visibility for pending or exceptional states

## Screens

### 1. Admin Login

The login screen is the secure entry point to the admin ecosystem. It should preserve brand immersion rather than feeling like a generic utility login page.

**Layout:**
- Split or balanced layout with a refined authentication panel and a large visual area
- Branded title and supporting copy introducing the console
- Email and password fields
- Primary sign-in CTA
- Optional password recovery link
- Large-scale visual of a ceramic or artisanal object to maintain gallery identity

**Visual tone:**
- premium and minimal
- warm neutral palette
- strong typography with Noto Serif for brand expression
- clean form hierarchy with high clarity

**Interactions:**
- Enter email and password
- Submit sign-in form
- Navigate to password recovery if supported

**Validation:**
- email is required
- password is required
- invalid credentials show a clear inline error

### 2. Dashboard Overview

The dashboard overview is the curator's command center. It should present key performance indicators first, then operational context and recent activity.

**Layout:**
- Dashboard TopAppBar at top with global search, notifications, and curator profile access
- Curator SideNavBar fixed on the left for primary navigation
- KPI summary row with cards for:
  - Total Revenue
  - Active Artisans
  - Total Collections
  - Pending Orders
- Revenue trend visualization below KPI cards
- Recent activity section showing notable system events
- Generous whitespace and clear sectional hierarchy

**Data emphasis:**
- high-level business health first
- trend visibility second
- operational events third

**Interactions:**
- Tap a KPI card to navigate to the relevant module or filtered view
- Adjust date range for revenue trend if supported
- Open recent activity items for details when relevant
- Use global search to jump to artisans, products, orders, or customers

**Empty state:**
- If activity is limited, show zero-state KPI values and a simple message such as: "No recent activity yet"
- Charts should still render a stable empty or zero-data state

### 3. Artisan Management

The artisan management screen is a visual directory of the maker community. It should support both relationship oversight and performance review.

**Layout:**
- Page title and optional subtitle
- Search and filter controls at top
- Card-based or row-based artisan directory
- Each artisan item shows:
  - profile image or placeholder
  - artisan name
  - product count
  - sales performance summary
  - commission structure indicator
  - publishing or activity status
- Action controls for edit, view, or archive-related flows

**Filtering:**
- by status
- by performance tier
- by product volume
- by featured or non-featured state

**Interactions:**
- Open artisan detail or edit view
- Search by artisan name
- Filter by status or performance indicators

**Empty state:**
- Show a clear message such as: "No artisans match the current filters"
- Provide a reset filters action

### 4. Edit Artisan

The edit artisan screen is a specialized storytelling and profile management form. It should feel structured enough for data entry while still supporting editorial craftsmanship.

**Layout:**
- Top bar with back action and page title
- Profile basics section, including display name, brand name, and slug where applicable
- Storytelling section for biography, philosophy, and studio narrative
- Portfolio or gallery media section
- Descriptive tags and taxonomy section
- Publishing controls and status area
- Primary save CTA and secondary cancel action

**Editable fields:**
- display name
- short bio
- long bio
- philosophy or studio statement
- materials and techniques
- hero image and gallery assets
- tags
- publish state

**Interactions:**
- Upload or manage media
- Edit text-rich profile content
- Save changes
- Return to artisan management

**Validation:**
- required public identity fields cannot be empty
- invalid media or unsupported formats should be rejected cleanly
- slug or unique identifier should remain unique if editable

### 5. Customer Management

The customer management screen is the CRM layer of the admin console. It should help curators understand collector value and relationship depth.

**Layout:**
- Page title and summary controls
- Search bar and filters
- Customer list or table view
- Each customer entry shows:
  - customer name
  - tier label such as Platinum Tier or Legacy Patron
  - order count
  - total contribution or spend
  - recent activity or last order date
- Optional detail drawer or profile entry point

**Use cases:**
- identify high-value collectors
- review patron contribution history
- support premium customer care

**Interactions:**
- Search by name or email
- Filter by loyalty tier
- Open customer details or order history

**Empty state:**
- If no customers match filters, show a neutral empty state with reset option

### 6. Product Management

The product management screen is the ceramic inventory registry. It should combine strong visual identification with precise operational status.

**Layout:**
- Page title and action area
- Search, filter, and sort controls
- Product list, table, or card-grid hybrid depending on density
- Each product entry shows:
  - thumbnail image
  - product title
  - artisan name
  - collection assignment
  - price
  - inventory or stock state
  - publish state
- Batch or per-row actions for edit, archive, publish, or inspect

**Filtering:**
- by artisan
- by collection
- by inventory status
- by publish state
- by material or technique if needed later

**Status indicators:**
- available
- low stock
- sold
- draft
- archived
- made-to-order

**Interactions:**
- Create new product
- Edit existing product
- Filter and sort inventory
- Open full product record

**Empty state:**
- When no products match filters, show a clear filtered empty state
- When catalog is empty, show a CTA to create the first product

### 7. Collection Management

The collection management screen organizes products into editorial groupings called curated archives. It should support both visual curation and structural management.

**Layout:**
- Page title with create collection CTA
- Search and filtering controls
- Visual collection cards or structured list
- Each collection entry shows:
  - cover image
  - collection name
  - short description
  - product count
  - publish state
- Reorder or edit actions when applicable

**Use cases:**
- build seasonal edits
- group artifacts by visual narrative
- manage homepage-ready curated collections

**Interactions:**
- Create collection
- Edit collection metadata
- Add or remove products from a collection
- Publish or archive a collection

**Empty state:**
- Show a message such as: "No collections created yet"
- Include a clear create action

### 8. Order Management

The order management screen is the operational registry for the lifecycle of purchased pieces. It should provide status clarity, tracking readiness, and artisan cycle visibility.

**Layout:**
- Page title and status filters
- Search by order number, customer, or artisan
- Order table or list with strong status hierarchy
- Each order entry shows:
  - order number
  - customer name
  - order date
  - item count
  - payment status
  - fulfillment status
  - artisan cycle or production context where relevant
  - total value
- Detail view access for deeper inspection

**Primary statuses:**
- Pending
- Shipped
- Completed

**Extended operational statuses:**
- payment pending
- processing
- packed
- cancelled
- refunded

**Interactions:**
- Open order details
- Filter by status
- Update fulfillment state
- Search by identifier or customer

**Empty state:**
- If no orders match the selected view, show a stable empty table state with filter reset support

### 9. System Settings

The system settings screen is the configuration core of the admin console. It should feel controlled, structured, and low-risk.

**Layout:**
- Settings category navigation or grouped panels
- Currency defaults section
- Payment gateway configuration section
- Legal and policy management section
- Transactional email template section
- Save and audit-aware actions

**Managed settings:**
- default currency
- payment gateways such as Stripe, PayPal, and Apple Pay
- legal agreements and policy content
- transactional email templates
- global operational defaults

**Interactions:**
- Update configuration values
- Save changes
- Review active integration states
- Edit email communication templates

**Validation:**
- required settings must not be left in invalid states
- payment gateway credentials should be validated safely
- legal content changes should preserve version history if possible

## Shared Admin Components

### Curator SideNavBar

A persistent navigation rail used across the admin console.

**Behavior:**
- fixed placement on desktop layouts
- clear active-item state
- fast switching between modules
- high contrast for readability and orientation

**Primary destinations:**
- Dashboard
- Artisans
- Customers
- Products
- Collections
- Orders
- Settings

### Dashboard TopAppBar

A global header component that supports cross-module utility actions.

**Contents:**
- global search
- notifications access
- current curator profile access
- page-level context support when needed

## Navigation

- **Login -> Dashboard Overview**: successful admin sign-in
- **Dashboard -> Artisan Management**: tap navigation item or KPI-related shortcut
- **Dashboard -> Product Management**: tap navigation item or recent activity shortcut
- **Dashboard -> Order Management**: tap Pending Orders KPI or nav item
- **Artisan Management -> Edit Artisan**: select an artisan record
- **Product Management -> Collection Management**: navigate via side navigation
- **Any Screen -> Settings**: use persistent side navigation
- **Any Screen -> Search Result**: use TopAppBar global search

Navigation should feel fast and persistent, with the side navigation acting as the primary structural anchor.

## Design System

The admin console must align with **The Tactile Gallery** design system while adapting it for data-heavy interfaces.

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Background | #F7F3EE | Main dashboard canvas |
| Surface | #FFFFFF | Cards, tables, panels |
| Surface Warm | #EFE7DD | Highlight sections, secondary panels |
| Primary | #8D775F | Primary actions, active states, focused controls |
| Primary Dark | #6F5D49 | Hover and pressed states |
| Text Primary | #1F1A17 | Headings, main values, primary labels |
| Text Secondary | #6E6258 | Metadata, support text, secondary labels |
| Border | #D8CDC1 | Dividers, table outlines, input borders |
| Success | #4F7A5A | Positive metrics, completed statuses |
| Warning | #B07A3F | Pending states, caution indicators |
| Error | #A35C4B | Destructive actions, failed states |
| Info | #6F7C8F | Neutral operational indicators |

### Visual Direction

- editorial layout with strong whitespace
- serif-led premium personality balanced with clean data presentation
- restrained accent usage for status and navigation focus
- clear distinction between insight zones and management zones
- polished tables, cards, and filter controls rather than harsh enterprise styling

### Data Presentation Principles

- high-level KPI cards should be easy to scan first
- filters must be visible and predictable
- visual status indicators should be consistent across modules
- tables should prioritize readability over density
- actions should be obvious but not visually noisy

## Typography

The console should retain **Noto Serif** as the premium brand expression while pairing it with a practical UI sans-serif for operational clarity.

| Style | Font | Weight | Size |
|-------|------|--------|------|
| Display Metric | Noto Serif | 700 | 28-34px |
| Page Heading | Noto Serif | 600 | 24-30px |
| Section Heading | Noto Serif | 600 | 18-22px |
| Table / Body | Supporting sans-serif | 400-500 | 14-15px |
| Label | Supporting sans-serif | 500 | 12-13px |
| Button | Supporting sans-serif | 600 | 14-15px |
| Caption / Meta | Supporting sans-serif | 400 | 12px |

Typography should preserve a premium tone without reducing readability in data-heavy workflows.

## Functional Areas

### Reporting and Metrics

The dashboard should expose operational and business visibility through:
- total revenue
- active artisans
- total collections
- pending orders
- revenue trends over time
- recent operational activity

### Entity Management

The console should support CRUD-style management for:
- artisans
- products
- collections
- selected system settings

### Operations

Operational workflows should include:
- order lookup
- fulfillment tracking
- status updates
- customer support context

### Configuration

Global platform controls should include:
- currency defaults
- payment gateway controls
- legal content management
- transactional email template configuration

## Future Extensions

The admin dashboard should be designed to support future modules without structural redesign.

Potential future modules:
- journal content management
- homepage curation builder
- recommendation control panel
- analytics deep dive
- commission reporting
- artisan payout management
- role and permission management
- audit logs

## Edge Cases

- no KPI data available yet: dashboard should render stable zero-state cards and empty charts
- large artisan or product datasets: filters, search, and pagination should prevent overload
- failed settings validation: preserve entered values and show field-specific errors
- order status conflicts: warn before applying destructive or irreversible changes
- unpublished artisan with live products: show a clear admin warning state
- sold product still assigned to a featured collection: allow display with explicit archived or sold context if desired
- missing media assets: show graceful placeholders instead of broken image blocks
- limited permissions: hide or disable modules the current admin cannot access

## Implementation Notes

This document should be used as the design and product spec for the admin UI layer. It pairs with the backend design by mapping visible admin modules to backend-managed entities such as artisans, products, collections, customers, orders, and settings.

The admin console should be web-first, optimized for desktop workflows, and structured so AI coding tools can map each screen to clear components, routes, and data models.

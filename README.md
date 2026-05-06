# Terra Form Studio - Admin Dashboard

React-based management interface for the Terra Form Studio platform.

## Features

- **Dashboard Overview**: Visualization of sales statistics, revenue charts, and recent orders using Recharts.
- **Artisan Management**: Tools to review and manage artisan profiles.
- **Homepage Editor**: Dynamic configuration of the customer-facing homepage sections.
- **System Settings**: Global configuration for payments, legal documents, and communication templates.
- **Responsive Design**: Modern UI built with Tailwind CSS.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Recharts

## Setup and Installation

### Prerequisites
- Node.js (v18+)

### Installation
1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
- **Development**:
  ```bash
  npm run dev
  ```
- **Build**:
  ```bash
  npm run build
  ```

## Configuration
Ensure the `VITE_API_URL` environment variable is set to point to your running backend instance.

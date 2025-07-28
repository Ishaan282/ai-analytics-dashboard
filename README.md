# ADmyBRAND Insights – AI-Powered Analytics Dashboard

An AI-powered analytics dashboard built with **Next.js 14**, **React**, and **ShadCN UI**, designed for  agencies to monitor performance across revenue, users, conversions, and more.

---

## 🚀 Features

### 📊 Core Dashboard
- ✅ **Key Metrics Cards**: Revenue, Users, Conversion Rate, Growth %
- ✅ **Interactive Charts**:
  - Line Chart: User activity over time
  - Bar Chart: Revenue by channel
  - Pie/Donut Chart: Traffic source distribution
- ✅ **Transaction Table**:
  - Sorting, Filtering, Search
  - Status filters: All, Completed, Pending, Failed
  - Pagination

### 🎨 UI/UX
- ✅ **Modern Design** with consistent spacing, colors, and typography
- ✅ **Dark/Light Mode Toggle**
- ✅ **Responsive Layout**: Desktop, Tablet, Mobile
- ✅ **Beautiful Loading Skeletons** and micro-interactions

### ⚡ Advanced Functionality
- ✅ **Advanced Filters**: Date ranges (Last 7 days, 30 days, etc.)
- ✅ **Search Transactions**
- ✅ **Export Data**:
  - CSV download for all datasets
  - ZIP support (using `JSZip` + `FileSaver`)
- ✅ Modular, Reusable Component Architecture

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: `recharts`
- **Icons**: `lucide-react`
- **Styling**: Tailwind CSS
- **CSV/ZIP Export**: `jszip`, `file-saver`

---

## 🧪 Setup & Run Locally

```bash
git clone https://github.com/Ishaan282/ai-analytics-dashboard
cd admybrand-dashboard
npm install
npm run dev

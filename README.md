<div align="center">
  <h1>Praxis AI 🩺✨</h1>
  <p><strong>An intelligent, futuristic medical appointment scheduler designed to automate booking and enhance the patient experience.</strong></p>
  <br/>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

---

<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#data-model">Data Model</a></li>
  </ol>
</details>

---

## About The Project

**Praxis AI** is a full-stack web application built to modernize the medical appointment process. It directly addresses the administrative overhead in clinics by automating patient booking, sending intelligent reminders, and providing a seamless, futuristic user experience.

> The entire project is a single, runnable Next.js application, optimized for one-click deployment on Vercel.

## Key Features 🚀

* **🧠 Smart Scheduling:** Dynamically allocates 30 or 60-minute appointment slots based on whether a patient is new or returning.
* **📅 Seamless Calendly Integration:** Fetches real-time availability and books appointments directly via the Calendly API.
* **📝 Digital Intake Forms:** Presents new patients with a complete digital replica of the clinic's intake form immediately after booking.
* **📲 Automated Confirmations & Reminders:** A multi-step communication sequence using SendGrid (Email) and Twilio (SMS) keeps patients informed and engaged at 72, 48, and 24-hour intervals.
* **📊 Admin Export Functionality:** A password-protected `/admin` route allows staff to export all upcoming appointment data and confirmation statuses to an `.xlsx` file.
* **✨ Futuristic UI/UX:** A sleek, mandatory dark-mode interface featuring glassmorphism, smooth animations powered by Framer Motion, and a professional aesthetic.

## Built With 🛠️

This project leverages a modern, powerful tech stack to deliver a high-quality user experience.

| Category      | Technology & Libraries                                     |
|---------------|------------------------------------------------------------|
| **Framework** | Next.js 14+ (App Router)                                   |
| **Language** | TypeScript                                                 |
| **Styling** | Tailwind CSS, Framer Motion, `clsx`, `tailwind-merge`      |
| **Database** | Vercel Postgres                                            |
| **APIs** | SendGrid (Email), Twilio (SMS), Calendly (Scheduling)      |
| **Utilities** | `axios` (HTTP Requests), `xlsx` (Excel Export)             |

## Getting Started ⚙️

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (v18 or later) and npm installed on your machine.
* `npm install npm@latest -g`

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/sakshamparasher1200/PraxisAI-Medical-Scheduling-Agent.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd praxis-ai
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up your environment variables:**
    * Create a new file named `.env.local` in the root of your project.
    * Copy the contents of `.env.example` into `.env.local`.
    * Fill in the required API keys and secrets for each service:
    ```env
    # SendGrid
    SENDGRID_API_KEY=...

    # Twilio
    TWILIO_ACCOUNT_SID=...
    TWILIO_AUTH_TOKEN=...
    TWILIO_PHONE_NUMBER=... # Your Twilio phone number

    # Calendly
    CALENDLY_PAT_TOKEN=... # Your Personal Access Token

    # Database
    POSTGRES_URL=... # From Vercel Postgres

    # Admin
    ADMIN_PASSWORD=... # A secure password for the /admin page
    ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Data Model 🗂️

The application uses a synthetic data model for testing and development purposes.

* **Patients (50 total):** `id`, `firstName`, `lastName`, `dob`, `email`, `phone`
* **Doctors (3 total):** `id`, `name`, `specialty`, `calendlyLink`
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

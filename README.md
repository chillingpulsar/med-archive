# MedArchive

**A Patient-Centric Digital Repository for Medical Abstracts and Health History to Ensure Diagnostic Continuity**

## Overview

MedArchive is a secure, web-based repository that empowers patients to digitize and manage their own medical history. Built with SvelteKit and Supabase, it addresses the critical problem of fragmented medical records in developing healthcare ecosystems.

## 1. The Problem Statement

In many developing healthcare ecosystems, patient medical records (abstracts, lab results, and prescriptions) are primarily handled in physical paper formats. This decentralized and manual storage method leads to frequent data fragmentation, where patients lose their medical history due to physical damage, misplacement, or lack of a unified storage system.

Consequently, healthcare providers often face "information gaps," leading to redundant testing, delayed treatments, and complicated or inaccurate diagnoses due to an incomplete clinical picture of the patient's past medical history.

## 2. Research Objectives

### Primary Objective

To develop a secure, web-based repository using SvelteKit and Supabase that empowers patients to digitize and manage their own medical history.

### Specific Objectives

- To implement a secure authentication system to protect sensitive Personal Health Information (PHI).
- To create a categorical filing system (OCR-enabled or manual) for organizing medical abstracts, imaging, and lab reports.
- To design a "Quick-Access" mechanism (like QR codes or time-limited tokens) for seamless data sharing between patients and clinicians during consultations.
- To assess the usability of the platform in improving the retrieval speed of medical records compared to traditional physical filing.

## 3. Significance of the Study

This study/project is significant for three major stakeholders:

- **For Patients**: It provides autonomy over their data, ensuring that their medical history travels with them regardless of which hospital or doctor they visit.
- **For Healthcare Providers**: It reduces the time spent on "diagnostic guesswork" by providing a structured, chronological view of the patient's health.
- **For the Healthcare System**: It minimizes redundant costs (re-running tests) and improves the overall quality of care by facilitating Evidence-Based Medicine (EBM).

## 4. Technical Framework

The project utilizes a BaaS (Backend as a Service) architecture:

- **Frontend Framework**: SvelteKit (for high-performance, server-side rendering)
- **Styling & UI**: Tailwind CSS v4 and Shadcn Svelte (for a clean, accessible, and professional medical interface)
- **Database & Auth**: Supabase (utilizing PostgreSQL for relational data and Row Level Security for HIPAA-compliant-style privacy)
- **File Storage**: Supabase Storage (for encrypted hosting of medical PDFs and images)
- **Runtime**: Bun

## 5. Theoretical Flow (Conceptual Framework)

1. **Input Phase**: User registers and uploads a digital copy (photo/PDF) of a medical abstract.
2. **Processing Phase**: Data is categorized by date, specialty (e.g., Cardiology, Pediatrics), and provider.
3. **Output Phase**: When a diagnosis is needed, the system generates a summary or a view-only link for the physician, bridging the information gap.

## Development

### Prerequisites

Install dependencies:

```sh
bun install
```

### Running the Development Server

Start a development server:

```sh
bun dev

# or start the server and open the app in a new browser tab
bun dev -- --open
```

### Building

To create a production version of your app:

```sh
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

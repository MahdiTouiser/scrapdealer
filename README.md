🌟 ScrapDealer
ScrapDealer is a modern app for efficient scrap management, featuring:

Admin Web CMS: A sleek, React-powered dashboard for administrators.<br>
User Mobile App: A cross-platform React Native app for seamless user interaction.


🚀 Features

Admin CMS: Intuitive web interface for managing scrap data.<br>
Mobile App: User-friendly app for iOS and Android.<br>
Shared Design: Consistent UI/UX with shared design tokens.<br>
Monorepo: Streamlined development with Turborepo.


📂 Project Structure

@scrapdealer/admin: Next.js-based admin CMS.<br>
@scrapdealer/mobile: React Native mobile app.<br>
@scrapdealer/utils: Shared utilities.<br>
@scrapdealer/tokens: Shared design tokens.


🛠️ Prerequisites

Node.js (v20+)<br>
pnpm (v10.15.1+)<br>
Expo CLI (for mobile)<br>
Optional: Android Studio (Android) or Xcode (iOS, macOS only)


⚙️ Installation

Clone the repo:
git clone https://github.com/MahdiTouiser/scrapdealer.git
cd scrapdealer


Install dependencies:
pnpm install




🏃 Running the Project
Run Both Apps
pnpm dev

Run Admin CMS
pnpm dev:admin

Run Mobile App
pnpm dev:mobile

Then select: pnpm android, pnpm ios, or pnpm web.

📜 Scripts

pnpm dev: Run all apps in development.<br>
pnpm build: Build for production.<br>
pnpm lint: Lint all packages.<br>
pnpm dev:admin: Start admin CMS.<br>
pnpm dev:mobile: Start mobile app.


📦 Key Dependencies
Web CMS

Next.js, React 19
Material-UI, Emotion
TypeScript, ESLint

Mobile App

React Native, Expo
React Native Paper, Vector Icons
TypeScript, Babel

Root

Turborepo, ESLint, Prettier

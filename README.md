# Secure Password Generator

A modern, secure password generator built with Next.js 14, TypeScript, and Tailwind CSS. Generate strong, customizable passwords with various character options.

## Features

- Customizable password length (8-32 characters)
- Toggle between uppercase, lowercase, numbers, and symbols
- One-click copy to clipboard
- Clean, responsive UI
- Built with security in mind using Web Crypto API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Adjust the password length using the slider
2. Select which character types to include
3. Click "Generate Password" to create a new password
4. Click "Copy" to copy the password to your clipboard

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Web Crypto API** - Secure random number generation

## Project Structure

```
├── app/
│   ├── api/ping/
│   │   └── route.ts          # Health check endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   └── ui/
│       ├── Button.tsx        # Reusable button component
│       └── Checkbox.tsx      # Reusable checkbox component
├── lib/
│   └── generator.ts          # Password generation logic
└── README.md
```

## Security Considerations

- Passwords are generated using the Web Crypto API's `getRandomValues()` method
- No passwords are stored or transmitted
- All generation happens client-side
- No external dependencies for core functionality

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.
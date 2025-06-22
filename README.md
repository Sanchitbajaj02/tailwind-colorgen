# Tailwind Colorgen

Tailwind Colorgen is a web-based tool for generating and customizing color palettes for Tailwind CSS projects. It allows users to create, preview, and export color configurations seamlessly.

## Features

- **Color Palette Generation:** Generate Tailwind-compatible color palettes.

- **Customization:** Modify colors and preview changes in real-time.

- **Export:** Export color configurations for integration into Tailwind CSS projects.

- **Responsive UI:** Built with Next.js and Tailwind CSS for a smooth user experience.

## Getting Started

1. Install Dependencies:

```bash
npm install
```

2. Run Development Server:

```bash
npm run dev
```

3. Build for Production:

```bash
npm run build
```

4. Start Production Server:

```bash
npm start
```

## Folder Structure

```
tailwind-colorgen/
├── public/                # Static assets (images, icons, etc.)
│   ├── favicon.ico
│   ├── logo.svg
│   └── ...
├── src/                   # Source code
│   ├── app/               # Main application logic
│   │   ├── pages/         # Next.js pages
│   │   ├── styles/        # Global styles
│   │   └── ...
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── lib/               # Utility functions and helpers
│   │   ├── colorUtils.js
│   │   └── ...
│   └── ...
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── tailwind.config.js     # Tailwind CSS configuration
```

## License
This project is licensed under the MIT License.
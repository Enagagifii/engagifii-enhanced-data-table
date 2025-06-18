# Quick Repository Setup Commands

This guide provides copy-paste commands for creating new repositories and npm packages in the Engagifii organization.

## 📋 Prerequisites Checklist

- [ ] SSH key configured for GitHub (check `~/.ssh/config` for `github-engagifii` host)
- [ ] GitHub CLI installed (`gh --version`)
- [ ] Node.js 22+ installed (`node --version`)
- [ ] npm configured (`npm whoami`)

## 🚀 Step-by-Step Commands

### 1. Create Local Project Structure

```bash
# Navigate to workspace
cd /Users/ashish/Work/Engagifii/frontend

# Create new package directory
mkdir your-package-name
cd your-package-name

# Initialize npm package
npm init -y
```

### 2. Setup Basic Package Structure

```bash
# Create directory structure
mkdir -p src/{components/ui,hooks,lib}
mkdir -p .github/workflows
mkdir -p dist

# Create essential files
touch src/index.ts
touch README.md
touch LICENSE
touch .gitignore
touch .npmrc
touch tsconfig.json
touch tailwind.config.js
touch tsup.config.ts
touch .eslintrc.cjs
```

### 3. Configure Package.json for GitHub Packages

```bash
# Edit package.json (replace YOUR_PACKAGE_NAME)
cat > package.json << 'EOF'
{
  "name": "@engagifii/YOUR_PACKAGE_NAME",
  "version": "1.0.0",
  "description": "Package description here",
  "private": false,
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsup",
    "build:watch": "tsup --watch",
    "dev": "tsup --watch",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "prepare": "npm run build"
  },
  "keywords": [
    "react",
    "typescript",
    "engagifii"
  ],
  "author": "Engagifii Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Enagagifii/YOUR_REPO_NAME.git"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^8.0.1",
    "@typescript-eslint/parser": "^8.0.1",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "tsup": "^8.2.4",
    "typescript": "^5.5.3"
  }
}
EOF
```

### 4. Create Configuration Files

```bash
# TypeScript config
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Build config
cat > tsup.config.ts << 'EOF'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: false,
  target: 'es2020',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  }
})
EOF

# npm registry config
cat > .npmrc << 'EOF'
@engagifii:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF

# Git ignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Build outputs
dist
dist-ssr
*.local
build/
out/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# TypeScript
*.tsbuildinfo

# Coverage directory
coverage/

# Temporary folders
tmp/
temp/
EOF

# ESLint config
cat > .eslintrc.cjs << 'EOF'
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
EOF

# MIT License
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Engagifii

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

### 5. Create GitHub Actions Workflows

```bash
# CI workflow
cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
EOF

# Publish workflow
cat > .github/workflows/publish.yml << 'EOF'
name: Publish Package

on:
  release:
    types: [published]
  push:
    branches: [main]
    tags: ['v*']

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@engagifii'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build package
        run: npm run build
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Publish package
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
EOF
```

### 6. Create Basic Source Files

```bash
# Main export file
cat > src/index.ts << 'EOF'
// Main component exports
export { default as YourMainComponent } from './components/ui/your-main-component';

// Utility exports
export { cn } from './lib/utils';

// Type exports
export type { YourMainComponentProps } from './components/ui/your-main-component';
EOF

# Utils file
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

# Basic component file (replace with your actual component)
cat > src/components/ui/your-main-component.tsx << 'EOF'
import React from 'react';

export interface YourMainComponentProps {
  children?: React.ReactNode;
  className?: string;
}

const YourMainComponent: React.FC<YourMainComponentProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={className}>
      {children || 'Your component content here'}
    </div>
  );
};

export default YourMainComponent;
EOF
```

### 7. Initialize Git and Create GitHub Repository

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Package setup"

# Create GitHub repository (replace YOUR_REPO_NAME)
gh repo create Enagagifii/YOUR_REPO_NAME --private --source=.

# Set remote with SSH config
git remote set-url origin github-engagifii:Enagagifii/YOUR_REPO_NAME.git

# Push to repository
git push -u origin main
```

### 8. Install Dependencies and Test Build

```bash
# Use Node.js 22
nvm use v22

# Install dependencies
npm install

# Add common dependencies (adjust based on your needs)
npm install clsx tailwind-merge class-variance-authority
npm install --save-dev @types/react @types/react-dom

# Test build
npm run build
npm run type-check
npm run lint
```

### 9. Create First Release

```bash
# Create and push a tag for first release
git tag v1.0.0
git push origin v1.0.0

# Or create a GitHub release
gh release create v1.0.0 --title "v1.0.0" --notes "Initial release"
```

## 🔄 Quick Template Variables to Replace

When using these commands, replace these variables:

- `YOUR_PACKAGE_NAME` → actual package name (e.g., `enhanced-data-table`)
- `YOUR_REPO_NAME` → GitHub repository name (e.g., `engagifii-enhanced-data-table`)
- Update the description in package.json
- Update the main component name and exports in src/index.ts
- Update the component file names and content

## 🚀 One-Command Setup Script

For even faster setup, you can create a script:

```bash
# Create setup script
cat > ~/setup-engagifii-package.sh << 'EOF'
#!/bin/bash
set -e

if [ $# -ne 2 ]; then
    echo "Usage: $0 <package-name> <repo-name>"
    echo "Example: $0 enhanced-data-table engagifii-enhanced-data-table"
    exit 1
fi

PACKAGE_NAME=$1
REPO_NAME=$2

echo "🚀 Setting up package: @engagifii/$PACKAGE_NAME"
echo "📦 Repository: Enagagifii/$REPO_NAME"

# Navigate and create directory
cd /Users/ashish/Work/Engagifii/frontend
mkdir $PACKAGE_NAME
cd $PACKAGE_NAME

# Initialize and setup (run all the commands above automatically)
# ... (you can paste all the commands from above here)

echo "✅ Package setup complete!"
echo "📁 Location: $(pwd)"
echo "🌐 Repository: https://github.com/Enagagifii/$REPO_NAME"
EOF

# Make executable
chmod +x ~/setup-engagifii-package.sh

# Usage:
# ~/setup-engagifii-package.sh enhanced-data-table engagifii-enhanced-data-table
```

## 📝 Quick Reference

```bash
# Quick package creation
~/setup-engagifii-package.sh my-component engagifii-my-component

# Quick build and publish
npm run build && git add . && git commit -m "Update" && git push

# Quick release
git tag v1.0.1 && git push origin v1.0.1
```

This command list will save you significant time when creating new packages! 🎉

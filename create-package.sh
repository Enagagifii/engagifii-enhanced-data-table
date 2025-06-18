#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    # Check GitHub CLI
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI is not installed. Please install it: brew install gh"
        exit 1
    fi
    
    # Check if logged into GitHub CLI
    if ! gh auth status &> /dev/null; then
        print_error "Please login to GitHub CLI: gh auth login"
        exit 1
    fi
    
    print_success "All prerequisites met!"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 <package-name> <description> [--skip-repo]"
    echo ""
    echo "Examples:"
    echo "  $0 enhanced-data-table 'Advanced data table with sorting and filtering'"
    echo "  $0 ui-components 'Reusable UI components library' --skip-repo"
    echo ""
    echo "Options:"
    echo "  --skip-repo    Skip GitHub repository creation"
    echo ""
}

# Parse arguments
if [ $# -lt 2 ]; then
    show_usage
    exit 1
fi

PACKAGE_NAME=$1
DESCRIPTION=$2
SKIP_REPO=false

# Check for --skip-repo flag
if [ "$3" = "--skip-repo" ]; then
    SKIP_REPO=true
fi

REPO_NAME="engagifii-$PACKAGE_NAME"
WORKSPACE_DIR="/Users/ashish/Work/Engagifii/frontend"
PACKAGE_DIR="$WORKSPACE_DIR/$PACKAGE_NAME"

print_status "Creating package: @engagifii/$PACKAGE_NAME"
print_status "Description: $DESCRIPTION"
print_status "Repository: Enagagifii/$REPO_NAME"

# Check prerequisites
check_prerequisites

# Create package directory
print_status "Creating package directory..."
if [ -d "$PACKAGE_DIR" ]; then
    print_error "Directory $PACKAGE_DIR already exists!"
    exit 1
fi

mkdir -p "$PACKAGE_DIR"
cd "$PACKAGE_DIR"

# Create directory structure
print_status "Creating directory structure..."
mkdir -p src/{components/ui,hooks,lib}
mkdir -p .github/workflows
mkdir -p dist

# Create package.json
print_status "Creating package.json..."
cat > package.json << EOF
{
  "name": "@engagifii/$PACKAGE_NAME",
  "version": "1.0.0",
  "description": "$DESCRIPTION",
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
    "engagifii",
    "component"
  ],
  "author": "Engagifii Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Enagagifii/$REPO_NAME.git"
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
  },
  "dependencies": {
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
EOF

# Create TypeScript config
print_status "Creating TypeScript configuration..."
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

# Create build config
print_status "Creating build configuration..."
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

# Create .npmrc
print_status "Creating npm configuration..."
cat > .npmrc << 'EOF'
@engagifii:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF

# Create .gitignore
print_status "Creating .gitignore..."
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

# Create ESLint config
print_status "Creating ESLint configuration..."
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

# Create LICENSE
print_status "Creating LICENSE..."
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

# Create GitHub workflows
print_status "Creating GitHub Actions workflows..."
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

# Create source files
print_status "Creating source files..."
COMPONENT_NAME=$(echo "$PACKAGE_NAME" | sed 's/-/ /g' | sed 's/\b\w/\U&/g' | sed 's/ //g')

cat > src/index.ts << EOF
// Main component exports
export { default as ${COMPONENT_NAME} } from './components/ui/${PACKAGE_NAME}';

// Utility exports
export { cn } from './lib/utils';

// Type exports
export type { ${COMPONENT_NAME}Props } from './components/ui/${PACKAGE_NAME}';
EOF

cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

cat > "src/components/ui/${PACKAGE_NAME}.tsx" << EOF
import React from 'react';
import { cn } from '../../lib/utils';

export interface ${COMPONENT_NAME}Props {
  children?: React.ReactNode;
  className?: string;
}

const ${COMPONENT_NAME}: React.FC<${COMPONENT_NAME}Props> = ({
  children,
  className
}) => {
  return (
    <div className={cn('engagifii-${PACKAGE_NAME}', className)}>
      {children || 'Replace this with your component implementation'}
    </div>
  );
};

export default ${COMPONENT_NAME};
EOF

# Create README
print_status "Creating README..."
cat > README.md << EOF
# @engagifii/$PACKAGE_NAME

$DESCRIPTION

## Installation

\`\`\`bash
npm install @engagifii/$PACKAGE_NAME
\`\`\`

## Usage

\`\`\`typescript
import { $COMPONENT_NAME } from '@engagifii/$PACKAGE_NAME';

function App() {
  return (
    <$COMPONENT_NAME>
      Your content here
    </$COMPONENT_NAME>
  );
}
\`\`\`

## Development

\`\`\`bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

## License

MIT © Engagifii Team
EOF

# Initialize git
print_status "Initializing git repository..."
git init
git add .
git commit -m "Initial commit: $PACKAGE_NAME package setup"

# Create GitHub repository if not skipped
if [ "$SKIP_REPO" = false ]; then
    print_status "Creating GitHub repository..."
    if gh repo create "Enagagifii/$REPO_NAME" --private --source=. --description "$DESCRIPTION"; then
        print_success "GitHub repository created successfully!"
        
        # Set up SSH remote
        print_status "Setting up SSH remote..."
        git remote set-url origin "github-engagifii:Enagagifii/$REPO_NAME.git"
        
        # Push to repository
        print_status "Pushing to repository..."
        git push -u origin main
        
        print_success "Code pushed to repository!"
    else
        print_warning "Failed to create GitHub repository. You can create it manually later."
    fi
else
    print_warning "Skipping GitHub repository creation as requested."
fi

# Install dependencies
print_status "Installing dependencies..."
if command -v nvm &> /dev/null; then
    nvm use v22 2>/dev/null || print_warning "Node.js v22 not found, using current version"
fi

npm install

# Test build
print_status "Testing build..."
npm run build
npm run type-check

print_success "Package created successfully!"
echo ""
echo "📦 Package: @engagifii/$PACKAGE_NAME"
echo "📁 Location: $PACKAGE_DIR"
echo "🌐 Repository: https://github.com/Enagagifii/$REPO_NAME"
echo ""
echo "Next steps:"
echo "1. cd $PACKAGE_NAME"
echo "2. Implement your component in src/components/ui/${PACKAGE_NAME}.tsx"
echo "3. Update exports in src/index.ts"
echo "4. Test your build: npm run build"
echo "5. Create a release: git tag v1.0.0 && git push origin v1.0.0"
echo ""
print_success "Happy coding! 🚀"

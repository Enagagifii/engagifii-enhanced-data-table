# GitHub Packages Setup Guide

## Initial Setup

### 1. Create GitHub Repository

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Enhanced Data Table package"

# Create GitHub repository (replace with actual Engagifii org)
gh repo create engagifii/enhanced-data-table --private --source=.
git push -u origin main
```

### 2. Generate GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with these scopes:
   - `write:packages` - To publish packages
   - `read:packages` - To download packages
   - `repo` - For private repositories

### 3. Configure npm for GitHub Packages

Create `.npmrc` in your project root:

```
@engagifii:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Publishing the Package

### Method 1: Manual Publishing

```bash
# Set environment variable
export GITHUB_TOKEN=your_github_token_here

# Build the package
npm run build

# Publish to GitHub Packages
npm publish
```

### Method 2: Automated with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
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
      
      - name: Publish package
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Using the Package in Lovable Projects

### 1. Configure Project .npmrc

In each Lovable project, add to `.npmrc`:

```
@engagifii:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Install the Package

```bash
# Set your GitHub token
export GITHUB_TOKEN=your_github_token_here

# Install the package
npm install @engagifii/enhanced-data-table
```

### 3. Environment Variables for Production

For production deployments, set the `GITHUB_TOKEN` environment variable in your deployment platform (Vercel, Netlify, etc.).

## Team Access Management

### Repository Access
- Add team members to the GitHub repository
- Set appropriate permissions (read/write)

### Package Access
- Package access follows repository access
- Private packages require authentication

## Version Management Strategy

### Semantic Versioning
- `1.0.0` - Major version (breaking changes)
- `1.1.0` - Minor version (new features)
- `1.1.1` - Patch version (bug fixes)

### Release Process
1. Update version in `package.json`
2. Create git tag: `git tag v1.0.1`
3. Push tag: `git push origin v1.0.1`
4. Create GitHub release (triggers automated publishing)

## Alternative: Local Package Development

For development and testing, you can also use local linking:

```bash
# In the package directory
npm link

# In the consuming project
npm link @engagifii/enhanced-data-table
```

## Recommended Workflow

1. **Development**: Use local linking for rapid iteration
2. **Testing**: Publish alpha/beta versions (`1.0.0-alpha.1`)
3. **Production**: Publish stable releases with proper versioning
4. **Updates**: Use automated GitHub Actions for consistent releases

This approach provides the best balance of security, accessibility, and maintainability for Lovable projects.

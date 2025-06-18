# 🚀 Engagifii Package Creation Automation

This directory contains powerful automation scripts to streamline the creation of new npm packages for the Engagifii organization.

## 📦 What's Included

- **`create-package.sh`** - Main automation script that creates a complete package setup
- **`quick-package.sh`** - Convenience wrapper for the main script
- **`install-globally.sh`** - Global installation script for system-wide access
- **`REPO_SETUP_COMMANDS.md`** - Detailed manual commands reference

## 🎯 Quick Start

### Option 1: Local Usage (Immediate)

```bash
# Navigate to this directory
cd /Users/ashish/Work/Engagifii/frontend/engagifii-enhanced-data-table

# Create a new package
./create-package.sh ui-components "Reusable UI components library"
```

### Option 2: Global Installation (Recommended)

```bash
# Install globally (run once)
./install-globally.sh

# Restart terminal or source your shell config
source ~/.zshrc

# Now use from anywhere
create-engagifii-package ui-components "Reusable UI components library"
```

### Option 3: Quick Alias Setup

```bash
# Add to your ~/.zshrc
echo 'alias create-pkg="/Users/ashish/Work/Engagifii/frontend/engagifii-enhanced-data-table/create-package.sh"' >> ~/.zshrc
source ~/.zshrc

# Use anywhere
create-pkg form-builder "Dynamic form builder with validation"
```

## 📋 Usage Examples

### Basic Package Creation

```bash
create-engagifii-package data-visualization "Charts and graphs components"
```

### Skip GitHub Repository Creation

```bash
create-engagifii-package local-package "Local development only" --skip-repo
```

### Real-world Examples

```bash
# UI Component Library
create-engagifii-package ui-components "Reusable UI components with Tailwind CSS"

# Form Components
create-engagifii-package form-builder "Dynamic form builder with validation and theming"

# Data Display
create-engagifii-package data-tables "Enhanced data tables with sorting, filtering, and pagination"

# Navigation
create-engagifii-package navigation-components "Navigation bars, sidebars, and breadcrumbs"

# Analytics
create-engagifii-package analytics-widgets "Dashboard widgets and analytics components"
```

## 🔧 What the Script Does

The automation script performs all these tasks automatically:

### 1. **Project Setup**
- ✅ Creates package directory structure
- ✅ Initializes npm package with proper naming (`@engagifii/package-name`)
- ✅ Sets up TypeScript configuration
- ✅ Configures build tools (tsup)
- ✅ Sets up linting (ESLint)

### 2. **GitHub Integration**
- ✅ Creates private GitHub repository
- ✅ Sets up SSH remote configuration
- ✅ Configures GitHub Packages publishing
- ✅ Adds CI/CD workflows

### 3. **Development Setup**
- ✅ Installs all dependencies
- ✅ Creates sample component files
- ✅ Sets up proper exports
- ✅ Tests the build process

### 4. **Documentation**
- ✅ Generates README with usage examples
- ✅ Includes MIT license
- ✅ Provides development instructions

## 📁 Generated Package Structure

```
your-package-name/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Continuous Integration
│       └── publish.yml      # Auto-publishing
├── src/
│   ├── components/
│   │   └── ui/
│   │       └── your-package-name.tsx
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   └── index.ts             # Main exports
├── dist/                    # Built package (auto-generated)
├── package.json             # Package configuration
├── tsconfig.json            # TypeScript config
├── tsup.config.ts           # Build configuration
├── .eslintrc.cjs            # Linting rules
├── .gitignore               # Git ignore rules
├── .npmrc                   # npm registry config
├── LICENSE                  # MIT license
└── README.md                # Documentation
```

## 🚀 After Package Creation

### 1. Implement Your Component
```bash
cd your-package-name
# Edit src/components/ui/your-package-name.tsx
# Update src/index.ts exports
```

### 2. Test Your Package
```bash
npm run build      # Build the package
npm run type-check # Check TypeScript
npm run lint       # Check code style
```

### 3. Create First Release
```bash
git tag v1.0.0
git push origin v1.0.0
# This automatically publishes to GitHub Packages
```

### 4. Use in Other Projects
```bash
# In any Lovable project
npm install @engagifii/your-package-name

# In your React code
import { YourComponent } from '@engagifii/your-package-name';
```

## 🔄 Workflow Integration

### For Team Members
1. **Create Package**: `create-engagifii-package my-component "Description"`
2. **Develop**: Implement components in `src/`
3. **Test**: `npm run build && npm run type-check`
4. **Release**: `git tag v1.0.0 && git push origin v1.0.0`
5. **Share**: Package is auto-published to GitHub Packages

### For Project Integration
1. **Install**: `npm install @engagifii/package-name`
2. **Import**: `import { Component } from '@engagifii/package-name'`
3. **Use**: Standard React component usage
4. **Update**: `npm update @engagifii/package-name`

## 🛠️ Customization

### Modify Default Settings
Edit `create-package.sh` to change:
- Default dependencies
- TypeScript configuration
- Build settings
- Linting rules
- GitHub workflows

### Add Custom Templates
Create template files in a `templates/` directory and modify the script to copy them.

## 🔍 Troubleshooting

### Common Issues

1. **GitHub CLI not authenticated**
   ```bash
   gh auth login
   ```

2. **SSH key not configured**
   ```bash
   # Check your ~/.ssh/config for github-engagifii host
   ```

3. **Node.js version issues**
   ```bash
   nvm use v22  # or install Node.js 22+
   ```

4. **Permission denied**
   ```bash
   chmod +x create-package.sh
   ```

### Getting Help
- Check the generated README in each package
- Review `REPO_SETUP_COMMANDS.md` for manual steps
- Ensure all prerequisites are met

## 📈 Benefits

### Time Savings
- **Manual setup**: ~30-45 minutes
- **With automation**: ~2-3 minutes

### Consistency
- Standardized package structure
- Consistent naming conventions
- Uniform CI/CD setup
- Shared best practices

### Quality
- Automated testing and linting
- TypeScript configuration
- Proper dependency management
- GitHub Packages integration

## 🎉 Next Steps

1. **Install globally** for easy access
2. **Create your first package** to test the workflow
3. **Share with your team** for consistent package creation
4. **Customize** the script for your specific needs

Happy package creating! 🚀

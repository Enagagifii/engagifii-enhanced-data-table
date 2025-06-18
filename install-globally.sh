#!/bin/bash
# Global Installation Script for Engagifii Package Creator
# Run this once to install the package creation tools globally

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
INSTALL_DIR="$HOME/.local/bin"
SCRIPT_NAME="create-engagifii-package"

print_status "Installing Engagifii Package Creator globally..."

# Create .local/bin if it doesn't exist
mkdir -p "$INSTALL_DIR"

# Copy the main script
cp "$SCRIPT_DIR/create-package.sh" "$INSTALL_DIR/$SCRIPT_NAME"
chmod +x "$INSTALL_DIR/$SCRIPT_NAME"

print_success "Installed to $INSTALL_DIR/$SCRIPT_NAME"

# Check if .local/bin is in PATH
if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
    print_status "Adding $INSTALL_DIR to PATH..."
    
    # Add to appropriate shell config file
    if [ -f "$HOME/.zshrc" ]; then
        echo "" >> "$HOME/.zshrc"
        echo "# Engagifii Package Creator" >> "$HOME/.zshrc"
        echo "export PATH=\"\$HOME/.local/bin:\$PATH\"" >> "$HOME/.zshrc"
        print_status "Added to ~/.zshrc"
    elif [ -f "$HOME/.bashrc" ]; then
        echo "" >> "$HOME/.bashrc"
        echo "# Engagifii Package Creator" >> "$HOME/.bashrc"
        echo "export PATH=\"\$HOME/.local/bin:\$PATH\"" >> "$HOME/.bashrc"
        print_status "Added to ~/.bashrc"
    fi
    
    print_status "Please restart your terminal or run: source ~/.zshrc"
fi

print_success "Installation complete!"
echo ""
echo "Usage:"
echo "  $SCRIPT_NAME <package-name> \"<description>\""
echo ""
echo "Examples:"
echo "  $SCRIPT_NAME ui-components \"Reusable UI components library\""
echo "  $SCRIPT_NAME data-visualization \"Charts and graphs components\""
echo "  $SCRIPT_NAME form-builder \"Dynamic form builder with validation\""
echo ""
print_success "Happy package creating! 🚀"

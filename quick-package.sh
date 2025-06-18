#!/bin/bash
# Quick Package Creator for Engagifii
# Usage: ./quick-package.sh <package-name> "<description>"

# Copy the main script to a global location for easy access
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
MAIN_SCRIPT="$SCRIPT_DIR/create-package.sh"

# Check if the main script exists
if [ ! -f "$MAIN_SCRIPT" ]; then
    echo "Error: create-package.sh not found in the same directory"
    exit 1
fi

# Run the main script with all arguments
"$MAIN_SCRIPT" "$@"

import subprocess
import os
import sys

def run_command(command):
    """
    Execute a git command and handle potential errors
    """
    try:
        result = subprocess.run(command, shell=True, check=True, 
                              capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {command}")
        print(f"Error message: {e.stderr}")
        sys.exit(1)

def copy_to_gh_pages():
    """
    Copy files from main branch to gh-pages branch
    """
    try:
        # Store current branch
        current_branch = run_command("git rev-parse --abbrev-ref HEAD").strip()
        
        # Ensure we're on main branch
        print("Checking out main branch...")
        run_command("git checkout main")
        
        # Pull latest changes
        print("Pulling latest changes from main...")
        run_command("git pull origin main")
        
        # Check if gh-pages branch exists
        branches = run_command("git branch")
        if "gh-pages" not in branches:
            print("Creating gh-pages branch...")
            run_command("git checkout --orphan gh-pages")
        else:
            print("Checking out gh-pages branch...")
            run_command("git checkout gh-pages")
            
        # Remove existing files in gh-pages
        print("Cleaning gh-pages branch...")
        run_command("git rm -rf .")
        
        # Copy files from main
        print("Copying files from main branch...")
        run_command("git checkout main -- .")
        
        # Add all files
        print("Adding files to gh-pages branch...")
        run_command("git add -A")
        
        # Commit changes
        print("Committing changes...")
        run_command('git commit -m "Update gh-pages with latest main content"')
        
        # Push to remote
        print("Pushing to remote repository...")
        run_command("git push origin gh-pages")
        
        # Return to original branch
        print(f"Returning to {current_branch} branch...")
        run_command(f"git checkout {current_branch}")
        
        print("Successfully copied files to gh-pages branch!")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        # Try to return to original branch
        if current_branch:
            print(f"Attempting to return to {current_branch} branch...")
            run_command(f"git checkout {current_branch}")
        sys.exit(1)

if __name__ == "__main__":
    copy_to_gh_pages()

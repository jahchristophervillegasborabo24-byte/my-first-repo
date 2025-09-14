# My First Repo (Follow-Along)

This folder is ready for the **Lab Activity 2 – Using Git in Visual Studio Code**.

## What you’ll do
1. Open this folder in VS Code.
2. Find **Source Control** (branch icon) → **Initialize Repository**.
3. Stage and commit `index.js` with the message **Initial commit**.
4. Create an empty GitHub repo (no README / .gitignore) and copy its **HTTPS** URL.
5. In VS Code **Terminal**:
   ```sh
   git remote add origin https://github.com/USERNAME/my-first-repo.git
   git branch -M main
   git push -u origin main
   ```
6. Create a branch: click the branch name in the bottom-left → **Create new branch** → name it `feature-login`.
   - Make a tiny change in `index.js`, commit, then push:
     ```sh
     git push -u origin feature-login
     ```
7. Switch back to **main** from the same branch menu.
8. Verify on GitHub: files on **main**, plus **feature-login** under *Branches*.

## Screenshots to capture
1) Source Control showing **Initialize Repository**  
2) Staging & committing with message “Initial commit”  
3) GitHub repository page showing uploaded files  
4) Branch creation & switching (status bar branch picker)

## Tip
- Open the terminal with **Ctrl + `** (backtick) or via **View → Terminal**.
- If **Initialize Repository** doesn’t appear, the folder may already be a repo. Run `git status`.

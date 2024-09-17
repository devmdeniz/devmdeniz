name: Update README tables

on:
  push:
    paths:
      - "projects.md"

jobs:
  update-readme:
    runs-on: ubuntu-latest

  steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Update README tables
        run: node update-readme.js
      - name: Commit and push changes
        run: |
          git config --local user.email "deniz@dikholding.com"
          git config --local user.name "github-actions[bot]"
          git add README.md
          git commit -m "Update tables in README.md" --author="github-actions[bot] <actions@github.com>" -m "Co-authored-by: devmdeniz <devmdeniz@example.com>"
          git push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

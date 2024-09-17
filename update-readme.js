const fs = require('fs');

const projectsFile = fs.readFileSync('projects.md', 'utf8');
const readmeFile = fs.readFileSync('README.md', 'utf8');

const tablesSectionRegex = /<!--START_SECTION:ProjectsList-->([\s\S]*?)<!--END_SECTION:ProjectsList-->/i;
const projectsTableMatch = projectsFile.match(tablesSectionRegex);
if (!projectsTableMatch) {
  console.error("Projects section not found in projects.md");
  process.exit(1);
}

const projectsTable = projectsTableMatch[1];

const rows = projectsTable
  .trim()
  .split('\n')
  .slice(2)
  .map(row => row.split('|').map(cell => cell.trim()))
  .filter(row => row.length > 1)
  .sort((a, b) => parseInt(b[3]) - parseInt(a[3]))
  .slice(0, 5);

// Yeni tabloyu oluştur
const updatedTable = ['| Project name | Description | Main Language or Technology | Commit Number | STATE | STATUS |', 
                      '| :--- | :----: | ---: | ---: | ---: | ---: |']
  .concat(rows.map(row => `| ${row.join(' | ')} |`))
  .join('\n');

const updatedReadme = readmeFile.replace(tablesSectionRegex, `<!--START_SECTION:ProjectsList-->\n${updatedTable}\n<!--END_SECTION:ProjectsList-->`);

fs.writeFileSync('README.md', updatedReadme, 'utf8');
console.log('README.md güncellendi.');

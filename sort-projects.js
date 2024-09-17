const fs = require('fs');


const projectsFile = fs.readFileSync('Projects.md', 'utf8');


const tablesSectionRegex = /<!--START_SECTION:ProjectsList-->([\s\S]*?)<!--END_SECTION:ProjectsList-->/i;
const projectsTableMatch = projectsFile.match(tablesSectionRegex);
if (!projectsTableMatch) {
  console.error("Projects section not found in Projects.md");
  process.exit(1);
}

const projectsTable = projectsTableMatch[1];


const rows = projectsTable
  .trim()
  .split('\n')
  .slice(2)
  .map(row => row.split('|').map(cell => cell.trim()))
  .filter(row => row.length > 1 && row[4] !== '')
  .sort((a, b) => parseInt(b[4], 10) - parseInt(a[4], 10));

const updatedTable = ['| Project name | Description | Main Language or Technology | Commit Number | STATE | STATUS |', 
                      '| :--- | :----: | ---: | ---: | ---: | ---: |']
  .concat(rows.map(row => `| ${row.slice(1).join(' | ')} |`))
  .join('\n');

const updatedProjects = projectsFile.replace(tablesSectionRegex, `<!--START_SECTION:ProjectsList-->\n${updatedTable}\n<!--END_SECTION:ProjectsList-->`);

fs.writeFileSync('Projects.md', updatedProjects, 'utf8');
console.log('Projects.md dosyası commit sayısına göre sıralandı.');

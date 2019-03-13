import { CodeLens, CodeLensProvider, Command, Range, TextDocument } from 'vscode';

class ApitestCodeLensProvider implements CodeLensProvider {
  public provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
    let requests : CodeLens[] = [];

    let lines: string[] = document.getText().split(/\r?\n/g);

    let isRequestsBlock = false
    let indent = 0
    let isFirstMatch = true

    for (let i = 0; i < lines.length; i++) {

      if (lines[i].trim() === 'requests:') {
        isRequestsBlock = true
      }

      if (isRequestsBlock) {
        const re = /([\s-]+)name:\s*(.+)/
        const matches = re.exec(lines[i])
  
        // we expect a valid matching request name to have 3 matches.
        if (matches && matches.length >= 3) {
          
          if (isFirstMatch) {
            indent = matches[1].length
            isFirstMatch = false
          }

          if (matches[1].length === indent) {
            let c: Command = {
              arguments: [[`-f`, `${document.fileName}`, `-t`, `"${matches[2]}"`]],
              command: 'apitest.request',
              title: 'Run request'
            }
        
            let codeLens = new CodeLens(new Range(i, 0, i, 0), c)
        
            requests.push(codeLens)
          }
        }
      }
    }

    return Promise.resolve(requests)
  }
}

export default ApitestCodeLensProvider;

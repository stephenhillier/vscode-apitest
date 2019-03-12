import { CodeLens, CodeLensProvider, Command, Range, TextDocument } from 'vscode';

class ApitestCodeLensProvider implements CodeLensProvider {
  public provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
    let requests : CodeLens[] = [];

    let top = new Range(0,0,0,0)

    let c: Command = {
      command: 'apitest.request',
      title: 'Run request'
    }

    let codeLens = new CodeLens(top, c)

    requests.push(codeLens)

    return Promise.resolve(requests)
  }
}

export default ApitestCodeLensProvider;

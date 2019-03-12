// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, languages, window } from 'vscode';
import ApitestCodeLensProvider from './apitestCodeLensProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let commandDisposable = commands.registerCommand('apitest.request', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		window.showInformationMessage('Hello World!');
	});

  let docSelector = {
		language: "apitest",
		scheme: "file"
	};

	let codeLensProviderDisposable = languages.registerCodeLensProvider(
    docSelector,
    new ApitestCodeLensProvider()
	);

	context.subscriptions.push(commandDisposable);
	context.subscriptions.push(codeLensProviderDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, languages, window, OutputChannel } from 'vscode';
import ApitestCodeLensProvider from './apitestCodeLensProvider';
import * as cp from 'child_process';


let _channel: OutputChannel;
function getOutputChannel(): OutputChannel {
	if (!_channel) {
		_channel = window.createOutputChannel('apitest output');
	}
	return _channel;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let commandDisposable = commands.registerCommand('apitest.request', (args: string[]) => {
		// The code you place here will be executed every time your command is executed

		let decoded = ''
		const childProcess = cp.spawn('apitest', [...args]);
		if (childProcess.pid) {
			childProcess.stdout.on('data', (data: Buffer) => {
				decoded += data.toString();
			});
			childProcess.stdout.on('end', () => {
				let channel = getOutputChannel();
				channel.appendLine(decoded)
				channel.show(true)
			})

			childProcess.stderr.on('data', (data: Buffer) => {
				decoded += data.toString();
			});
			childProcess.stderr.on('end', () => {
				let channel = getOutputChannel();
				channel.appendLine(decoded)
				channel.show(true)
			})

			console.log(args.join(' '))
		}
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

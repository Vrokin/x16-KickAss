const vscode = require("vscode");
const cp = require("child_process");
const fs = require("fs");
const path = require("path");

let configuration = vscode.workspace.getConfiguration("x16-kickAss");
let outputChannel = vscode.window.createOutputChannel("X16 KickAss");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let commandBuild = vscode.commands.registerCommand("x16-kickass.build", function () {
		buildPrg();
	});

	let commandRun = vscode.commands.registerCommand("x16-kickass.run", function () {
		runPrg(buildPrg()); // Build then run 
	});

	context.subscriptions.push(commandBuild);
	context.subscriptions.push(commandRun);
}

exports.activate = activate;
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

/**  	
This function will build a .prg file from the assembler source with Kick Assembler and return the path & name of the generated .prg file
*/
function buildPrg() {

	// Get settings from user configuration and check if they are correctly defined
	let java = configuration.get("java");
	let kickAssJar = configuration.get("kickAssJar");
	if (java == "") {
		vscode.window.showErrorMessage("JavaVM not defined! Set x16-kickAss.java in Extension Settings.");
		return;
	}

	if (kickAssJar == "") {
		vscode.window.showErrorMessage("Kick Assembler JAR path not defined! Set x16-kickAss.kickAssJar in Extension Settings.");
		return;
	}

	fs.stat(kickAssJar, function (err, stat) {
		if (err.code == "ENOENT") {
			vscode.window.showErrorMessage("Kick Assembler JAR not correctly defined! Set x16-kickAss.kickAssJar in Extension Settings.");
			return;
		}
	})

	// Set variables for Kick Assembler
	let outDir = "bin";
	let fileToCompile = vscode.window.activeTextEditor.document.fileName;
	let prg = path.basename(fileToCompile).replace(path.extname(fileToCompile), ".prg");
	let workDir = path.dirname(fileToCompile);
	let outputDir = path.join(workDir, outDir);
	let prgFile = path.join(outputDir, prg);

	vscode.window.showInformationMessage("Building Commander X16 .Prg file");

	outputChannel.clear;

	// Information messages
	outputChannel.appendLine("> JavaVM set to : " + java);
	outputChannel.appendLine("> Kick Assembler set to: " + kickAssJar);
	outputChannel.appendLine("> Building " + fileToCompile);

	// Create Bin Directory in working directory if it does not exist yet
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}
	fs.readdirSync(outputDir).map((file) => fs.unlinkSync(path.join(outputDir, file)));

	// Run Kick Assembler with arguments
	// The process is launched in syncrone mode, as the .prg file has to be build before launching the emulator
	const args = ["-jar", kickAssJar, "-debug", "-showmem", "-maxAddr", "131072", "-odir", outputDir, fileToCompile];
	let runjava = cp.spawnSync(java, args);

	outputChannel.appendLine(runjava.stdout.toString());
	outputChannel.appendLine("=> Source file " + path.basename(fileToCompile) + " has been compiled to " + path.basename(prgFile));
	outputChannel.show(0);

	// The Build() funtion returns the build .prg file
	return prgFile;

}

/**  	
This function runs the Commander X16 emulator with the .prg file build by Kick Assembler in the build() function
*/
function runPrg(prgFile) {

	// Get settings from user configuration and check if they are defined
	let x16emulator = configuration.get('x16emulator');
	if (x16emulator == "") {
		vscode.window.showErrorMessage('Commander X16 emulator not defined! Set x16-kickAss.x16emulator in Extension Settings.');
		return;
	}
	fs.stat(x16emulator, function (err, stat) {
		if (err.code == "ENOENT") {
			vscode.window.showErrorMessage("Kick Assembler JAR not correctly defined! Set x16-kickAss.kickAssJar in Extension Settings.");
			return;
		}
	})

	// Optional Commander X16 configuration
	let x16emuKeymap = configuration.get("x16emulatorKeymap");
	let x16emuScale = configuration.get("x16emulatorScale");
	let x16emuDebug = configuration.get("x16emulatorDebug");
	let x16emuRunPrg = configuration.get("x16emulatorRunPrg");

	// Launch Commander X16 emulator with arguments
	let args = ["-keymap", x16emuKeymap, "-scale", x16emuScale, "-prg", prgFile];
	if (x16emuDebug) {
		args.push("-debug");
	}
	if (x16emuRunPrg) {
		args.push("-run");
	}
	let runX16emulator = cp.spawn(x16emulator, args, { cwd: prgFile.dirname, detached: true });

	// Information messages
	vscode.window.showInformationMessage("Commander X16 emulator started.")
	outputChannel.appendLine("=> X16 emulator starting with PRG file " + prgFile);
	outputChannel.show(0);
}
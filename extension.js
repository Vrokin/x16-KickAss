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

	let outDir = "bin";
	let fileToCompile = vscode.window.activeTextEditor.document.fileName;
	let prg = path.basename(fileToCompile).replace(path.extname(fileToCompile), ".prg");
	let workDir = path.dirname(fileToCompile);
	let outputDir = path.join(workDir, outDir);
	let prgFile = path.join(outputDir, prg);
	// Get settings from user configuration and check if they are correctly defined
	let java = configuration.get("java");
	let kickAssJar = configuration.get("kickAssJar");

	outputChannel.clear;
	outputChannel.show(0);

	if (java == "") {
		vscode.window.showErrorMessage("JavaVM not defined!");
		outputChannel.appendLine("JavaVM not defined! Set x16-kickAss.java in Extension Settings.");
		return;
	}

	if (kickAssJar == "") {
		vscode.window.showErrorMessage("Kick Assembler JAR path not defined!");
		outputChannel.appendLine("Kick Assembler JAR path not defined! Set x16-kickAss.kickAssJar in Extension Settings.");
		return;
	}

	if (fs.existsSync(kickAssJar)) {
		//file exists
	} else {
		vscode.window.showErrorMessage("KickAss JAR file not correct.");
		outputChannel.appendLine("Incorrect KickAssembler Jar:" + kickAssJar + "! Check x16-kickAss.kickAssJar in Extension Settings.");
		return;
	}

	//Check if File to Compile is a file with one of the assembler extensions
	const assemblerExtensions = [".asm", ".a", ".s", ".lib", ".inc"];
	if (assemblerExtensions.includes(path.extname(fileToCompile))) {
		outputChannel.appendLine("Compiling " + fileToCompile);
	} else { // if not, stop the build
		outputChannel.appendLine("The file to compile does not appear to be an assembler file. Build process exited!");
		return;
	}

	// Create Bin Directory in working directory if it does not exist yet
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}
	// delete files in the bin directory
	fs.readdirSync(outputDir).map((file) => fs.unlinkSync(path.join(outputDir, file)));

	//  Kick Assembler with arguments
	const args = ["-jar", kickAssJar, "-debug", "-bytedump", "-symbolfile", "-symbolfiledir", outputDir, "-showmem", "-maxAddr", "131072", "-odir", outputDir, fileToCompile];

	//display the executed command in the output window
	outputChannel.append(java + " ");
	args.forEach(function (a) {
		outputChannel.append(a + " ");
	});

	// Execute Kick Assembler. The process is launched in syncrone mode as the .prg file has to be build before launching the emulator
	let runjava = cp.spawnSync(java, args);
	outputChannel.appendLine(runjava.stdout.toString());
	outputChannel.appendLine("> Source file " + path.basename(fileToCompile) + " has been compiled to " + path.basename(prgFile));

	// The Build() funtion returns the build .prg file
	return prgFile;

}

/**  	
This function runs the Commander X16 emulator with the .prg file build by Kick Assembler in the build() function
*/
function runPrg(prgFile) {

	outputChannel.appendLine("X16 emulator starting :");

	if (!prgFile) {		//if prgFile is not defined, do not execute this function
		outputChannel.appendLine("No .prg file. Emulator start aborded.");
		return;
	}

	// Get settings from user configuration and check if they are defined
	let x16emulator = configuration.get('x16emulator');
	if (x16emulator == "") {
		vscode.window.showErrorMessage('Commander X16 emulator error.');
		outputChannel.appendLine("Commander X16 emulator not defined! Check x16-kickAss.x16emulator in Extension Settings.");
		return;
	}
	if (fs.existsSync(x16emulator)) {
		//file exists
	} else {
		vscode.window.showErrorMessage("Commander X16 emulator error.");
		outputChannel.appendLine("Commander X16 emulator not correctly defined:" + x16emulator + "! Check x16-kickAss.x16emulator in Extension Settings.");
		return;
	}

	let x16emuKeymap = configuration.get("x16emulatorKeymap");
	let x16emuScale = configuration.get("x16emulatorScale");
	let x16emuDebug = configuration.get("x16emulatorDebug");
	let x16emuRunPrg = configuration.get("x16emulatorRunPrg");
	let x16emuWarp = configuration.get("x16emulatorWarp");
	let x16emuSDCard = configuration.get("x16emulatorSDCard");

	if (fs.existsSync(x16emuSDCard)) {
		//file exists
	} else {
		vscode.window.showErrorMessage("Commander X16 emulator error.");
		outputChannel.appendLine("Commander X16 sdcard path not correctly defined: " + x16emuSDCard + "! Check x16-kickAss.x16emulatorSDCard in Extension Settings.");
		return;
	}

	// If optional arguments are defined, add them to the arguments list
	let args = ["-scale", x16emuScale, "-prg", prgFile];
	if (x16emuKeymap) {
		args.push("-keymap");
		args.push(x16emuKeymap);
	}
	if (x16emuDebug) {
		args.push("-debug");
	}
	if (x16emuRunPrg) {
		args.push("-run");
	}
	if (x16emuSDCard) {
		args.push("-sdcard");
		args.push(x16emuSDCard);
	}
	if (x16emuWarp) {
		args.push("-warp");
	}

	// Display the command that will be executed 

	outputChannel.append(x16emulator + " ");
	args.forEach(function (a) {
		outputChannel.append(a + " ");
	});

	// start the emulator
	//let runX16emulator = cp.spawn(x16emulator, args, { cwd: prgFile.dirname, detached: true, stdio: "inherit", shell: true });
	let runX16emulator = cp.spawn(x16emulator, args, { cwd: prgFile.dirname, detached: true});

	runX16emulator.stdout.on("data", (data) => {
		outputChannel.appendLine("\nx16emulator output: \n" + data);
	});

	runX16emulator.stderr.on("data", (data) => {
		outputChannel.appendLine("\nx16emulator error output: \n" + data);
	});

	runX16emulator.on("error", (error) => {
		outputChannel.appendLine("\nx16emulator error: \n" + error);
	});

	runX16emulator.stderr.on("close", function () {
		outputChannel.appendLine("\nx16emulator halted.\n");
	});

	return;
}
# VSCode KickAss (C64)

Visual Studio Code language support for Commander X16 development with [Kick Assembler](http://www.theweb.dk/KickAssembler/Main.html#frontpage).

This is heavily inspired by :
- the [Sublime KickAssembler (C64)](https://github.com/Swoffa/SublimeKickAssemblerC64) package, 
- the [vscode-kickassembler](https://github.com/tomconte/vscode-kickassembler), made by [Thomas Conté](https://github.com/tomconte),
- the [vscode-kickass-c64](https://github.com/CaptainJiNX/vscode-kickass-c64), made by [Captain JiNX](https://github.com/CaptainJiNX/).
Thanks to all of you !

Thanks also to [JimJimPlays and his Youtube Channel](https://www.youtube.com/channel/UCVxS1_x-Ygd7O9Z-d0Kjk0A) and his "Beginning Assembly" tutorials. And finally thanks to [The 8-bit guy](http://www.the8bitguy.com) for his [Commander X16](https://www.commanderx16.com) "Dream computer" project.
His videos and his "neo-retro" computer project brought me back to the Commodore world of my childhood and the unfulfilled, until today, curiousity in how it worked behind the scenes.

Actually, my programming skills are pretty weak... (but improving now :) )
I started to learn 6502 C64 and X16 assemby summer 2020, discovered and liked the features of Kick Assembler and looked for an IDE. That lead me to Visual Studio Code and the Kick Assembler extensions. I wanted to adapt these to use the Commander X16 emulator but with no knowledge in JavaScript, Node.js, github, etc. and how to build a VSCode extension this was pretty harsh. 
Hence I took a step by step learning with lots of trials & errors that brought me to these results after a few nights.
The code can probably be improved and might look quite "BASIC" ;) and not in line with the best javascript & node.js guru standards. but at least I think it is easly understandable if you are also new into this. ... And moreover, it works ! (Isn't that the most important thing ?).
Comments & feedback are welcome!
Also, if you would like some options or features, let me know. 

## Features

- language configuration/syntax coloring,
- build and build & run commands,
- support for [Commander X16 Emulator](https://github.com/commanderx16/x16-emulator) with most usefull options (to me at least). Tested with r38 (Kyoto).
- outputs all build artifacts into a `bin/` folder that will be created in the same folder as the currently opened file.

## Requirements

- Java runtime (to be able to run KickAss.jar)
- [Download Kick Assembler](http://www.theweb.dk/KickAssembler/KickAssembler.zip) and extract it to a nice place.
- [Download Commander X16](https://www.commanderx16.com/forum/index.php?/files/file/25-commander-x16-emulator-winmaclinux/) and install it to a location of your choice.

## Extension Settings

This extension contributes the following settings:
- `x16-kickAss.kickAssJar`: Full path to KickAss.jar
- `x16-kickAss.java`: Full path to Java Virtual Machine binary
- `x16-kickAss.x16emulator` : Full path to Commander X16 emulator
- Check [here] (https://github.com/commanderx16/x16-emulator/blob/master/README.md) for more information on the emulator options below.
- `x16-kickAss.x16emulatorKeymap` : define  a specific keyboard layout for the emulator (optional, leave blank for default)
- `x16-kickAss.x16emulatorScale` : scales the video output of the emulator (optional)
- `x16-kickAss.x16emulatorRunPrg` : execute the build program at emulator start (on/off)
- `x16-kickAss.x16emulatorDebug` : enable the emulator debug function (on/off)
- `x16-kickAss.x16emulatorSDCard` : lets you specify and SD Card image that will be mounted at emulator start (optional)
- `x16-kickAss.x16emulatorWarp` : run the emulator as fast as possible (on/off)

## Known Issues

## How to contribute
The code is Open Source and aviable on GitHub.

### Prerequisites

## Release Notes

### [1.1]
- Added '-SDCard' option in the extensions settings for the Commander X16 emulator.
- Added '-Warp' option in the extensions settings for the Commander X16 emulator.
- Better management of the Commander X16 emulator outputs.

### [1.0.2]

- Better management of errors in extension settings.

### [1.0.1]

- Left keymap settings blank by default to use default keyboard layout and only use the Commander X16 emulator -keymap parameter when provided.

### [1.0.0]

- Build, Build & Run Commands.
- Commander X16 emululator with some options : -debug, -scale, -run, -keymap.
- Language support files.

**Enjoy!**

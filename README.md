# VSCode KickAss (C64)

Visual Studio Code language support for Commander X16 development with [Kick Assembler](http://www.theweb.dk/KickAssembler/Main.html#frontpage).

This is heavily inspired by :
- the [Sublime KickAssembler (C64)](https://github.com/Swoffa/SublimeKickAssemblerC64) package, 
- the [vscode-kickassembler](https://github.com/tomconte/vscode-kickassembler), made by [Thomas Conté](https://github.com/tomconte),
- the [vscode-kickass-c64](https://github.com/CaptainJiNX/vscode-kickass-c64), made by [Captain JiNX](https://github.com/CaptainJiNX/).
Thanks to all of you !

Thanks also to [JimJimPlays and his Youtube Channel](https://www.youtube.com/channel/UCVxS1_x-Ygd7O9Z-d0Kjk0A) and his "Beginning Assembly" tutorials. And finally thanks to [The 8-bit guy](http://www.the8bitguy.com) for his [Commander X16](https://www.commanderx16.com) "Dream computer" project.
His videos and his "neo-retro" computer project brought me back to the Commodore world of my childhood and the unfulfilled, until today, curiousity in how it worked behind the scenes.

Actually, my programming skills are pretty weak... 
I started to learn 6502 C64 and X16 assemby summer 2020, discovered and liked the features of Kick Assembler and looked for an IDE. That lead me to Visual Studio Code and the Kick Assembler extensions. I wanted to adapt these to use the Commander X16 emulator but with no knowledge in JavaScript, Node.js, github, and how to build a VSCode extension this was pretty harsh. 
Hence I took a step by step and trial & error approach that brought me to these results after a few nights.
There is certainly way for improvement ! Comments & feedback are welcome.

## Features

- language configuration/syntax coloring,
- build and build & run commands,
- support for [Commander X16 Emulator](https://github.com/commanderx16/x16-emulator),
- outputs all build artifacts into a `bin/` folder that will be created in the same folder as the currently opened file.

** Roadmap **
- add more Commander X16 emulator options,
- manage child process messages & errors,
- add more advanced debuging features.

## Requirements

- Java runtime (to be able to run KickAss.jar)
- [Download Kick Assembler](http://www.theweb.dk/KickAssembler/KickAssembler.zip) and extract it to a nice place.
- [Download Commander X16](https://www.commanderx16.com/forum/index.php?/files/file/25-commander-x16-emulator-winmaclinux/) and install it to a location of your choice.

## Extension Settings

This extension contributes the following settings:
- `x16-kickAss.kickAssJar`: Full path to KickAss.jar
- `x16-kickAss.java`: Full path to Java Virtual Machine binary
- `x16-kickAss.x16emulator` : Full path to Commander X16 emulator
- `x16-kickAss.keymap` : define  a specific keyboard layout for the emulator
- `x16-kickAss.scale` : scales the video output tof the emulator
- `x16-kickAss.runprg` : exectute the build program at emulator start
- `x16-kickAss.debug` : enable the emulator debug function 

## Known Issues

## How to contribute

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) (with `esbenp.prettier-vscode`, `dbaeumer.vscode-eslint` extensions installed)
- [nvm](https://github.com/creationix/nvm) (download and install)

## Release Notes

### 1.0.0

Initial release of X16-KickAss

### 1.0.1

Left keymap settings blank by default to use standard QWERTY keyboard layout and only use the Commander X16 emulator -keymap parameter when provided.


**Enjoy!**

import fs from 'fs'
import os from 'os'

export class LaunchPhases {

  getMinecraftFolder() : String {
    switch(os.platform()) {
      case 'win32':
        return `${os.userInfo().homedir}/AppData/.minecraft`
      case 'darwin':
        return `${os.userInfo().homedir}/Library/Application Support/minecraft`
      case 'linux':
        return `${os.userInfo().homedir}/.minecraft`
    }
    throw Error('Can not detect Minecraft Folder')
  }

  checkFolder() {
    fs.existsSync('')
  }
}

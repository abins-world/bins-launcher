export class LaunchPhases {

  getMinecraftFolder() : String {
    let osdir: String = ''
    const os = window.require('electron').remote.require('os')
    console.log(os.userInfo().homedir)
    switch(os.platform()) {
      case 'win32':
        osdir = `${os.userInfo().homedir}/AppData/.minecraft`
        break
      case 'darwin':
        osdir = `${os.userInfo().homedir}/Library/Application Support/minecraft`
        break
      case 'linux':
        osdir = `${os.userInfo().homedir}/.minecraft`
        break
    }
    return osdir
  }
}

import axios from 'axios'
import { promises } from 'dns'

export class LaunchPhases {

  getMinecraftFolder() : String {
    let osdir: String = ''
    const os = window.require('electron').remote.require('os')
    switch(os.platform()) {
      case 'win32':
        osdir = `${os.userInfo().homedir}/AppData/Roaming/.abinworld`
        break
      case 'darwin':
        osdir = `${os.userInfo().homedir}/Library/Application Support/abinworld`
        break
      case 'linux':
        osdir = `${os.userInfo().homedir}/.abinworld`
        break
    }
    return osdir
  }

  private getRequestedFile(firstAddr: string, address: string): Promise<any> {
      return new Promise ((resolve, reject) => {
        const https = window.require('electron').remote.require('https')
        let options = { 
          host               : firstAddr, 
          port               : 443,
          path               : address,
          method             : 'GET',
          rejectUnauthorized : false,
          requestCert        : true,
          agent              : false
      };
        console.log('DOWNLOAD: request')
        let req = https.get(options, (res: any) => {
            resolve(res)
        })
        req.end()
      })
  }

  async downloadFileGh(address: string, whereTo: string) {
    let response: any = await this.getRequestedFile('raw.githubusercontent.com', address)
    // https://github.com/abins-world/dist/raw/main/abinworld-mod-1.0-SNAPSHOT.jar.sha1
    const fs = window.require('electron').remote.require('fs')
    const file = fs.createWriteStream(whereTo)
    console.log('File WriteStream Created. Piping...')
    response.pipe(file)
    file.on('finish', () => {
      file.close()
    })
    console.log('Pipe Success')
  }

  async downloadFabric(whereTo: string) {
    let response: any = await this.getRequestedFile('maven.fabricmc.net', '/net/fabricmc/fabric-installer/0.6.1.51/fabric-installer-0.6.1.51.jar')
    // https://github.com/abins-world/dist/raw/main/abinworld-mod-1.0-SNAPSHOT.jar.sha1
    const fs = window.require('electron').remote.require('fs')
    const file = fs.createWriteStream(whereTo)
    console.log('File WriteStream Created. Piping...')
    response.pipe(file)
    file.on('finish', () => {
      file.close()
    })
    console.log('Pipe Success')
  }
  
  execPromise(command: String) {
    return new Promise((resolve, reject) => {
      const exec = window.require('electron').remote.require('child_process').exec
      exec(command, (err: any, stdout: any, stderr: any) => {
        if(err) {
          reject(err)
        } else {
          resolve(stdout)
        }
      })
    })
  }

  async downloadFileCf(address: string, whereTo: string) {
    let response: any = await this.getRequestedFile('media.forgecdn.net', address)
    const fs = window.require('electron').remote.require('fs')
    const file = fs.createWriteStream(whereTo)
    console.log('File WriteStream Created. Piping...')
    response.pipe(file)
    file.on('finish', () => {
      file.close()
    })
    console.log('Pipe Success')
  }

  /*
  private fsStatAsync(path: String) {
    return new Promise((resolve, reject) => {
      const fs = window.require('electron').remote.require('fs')
      fs.stat(path, (err: Error, stats: Stats) => {
        if(!err) {
          reject(err)
        } else {
          resolve(stats)
        }
      })
    })
  }
  */

  /**
   * @description Check files but not check checksum.
   */
  async checkFilesExistsAndEdited() {
    const fs = window.require('electron').remote.require('fs')
    let files = await fs.promises.readdir(this.getModFolder())
    let checkSuccess = false
    console.log(files)
    files.forEach(async (element: string) => {
      if(element !== 'fabricApi.jar' && element !== 'mod.jar') {
          checkSuccess = false
          await fs.promises.unlink(this.getModFolder() + '/' + element)
      }
    });
    if(fs.existsSync(this.getModFolder() + '/fabricApi.jar') && fs.existsSync(this.getModFolder() + '/mod.jar')) {
      checkSuccess = true
    }
    return checkSuccess
  }

  checkInitial() {
    const fs = window.require('electron').remote.require('fs')
    return fs.existsSync(this.getMinecraftFolder() + '/versions')
  }

  /**
   * @description Checksum check to promise
   */
  private dg(input: any, hash: any, rawSum: any) {
    return new Promise((resolve, reject) => {
      input.on('readable', () => {
        let data = input.read()
        let a: string = hash.update(data).digest('hex')
        console.log(a)
        console.log(rawSum)
        if(a === rawSum.replace(/\n/g, "")) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  private ccPromise(rawSum: String, path: String) {
    return new Promise((resolve, reject) => {
      const crypto = window.require('electron').remote.require('crypto')
      const fs = window.require('electron').remote.require('fs')
      const hash = crypto.createHash('sha1');
      const input = fs.createReadStream(path);
    
      input.on('error', console.error)
    
      input.on('data', function (chunk: any) {
        hash.update(chunk);
      })
    
      input.on('close', function () {
        let a = hash.digest('hex')
        console.log('resolvetrue')
        resolve(a === rawSum)
      })
      resolve(false)
    })
  }

  async checkChecksum(path: string, sha1sumAddress: string) {
    // crypto.createHash('sha1');
    // crypto.createHash('sha256');
    let rawSum = (await axios.get(sha1sumAddress)).data
    return await this.ccPromise(rawSum, path)
  }


  /**
   * @deprecated Deprecated
   */
  async checkChecksumLegacy(fileName: string, sha1sumAddress: string) {
    console.log('checksm check')
    const crypto = window.require('electron').remote.require('crypto')
    let rawSum = (await axios.get(sha1sumAddress)).data
    const fs = window.require('electron').remote.require('fs')
    console.log('input stream')
    let input = fs.createReadStream(fileName)
    let hash = crypto.createHash('sha1')
    return await this.dg(input, hash, rawSum)
    /*
    input.on('readable', () => {
      let data = input.read()
      console.log('updating hash')
      if(data) {
        hash.update(data)
      } else {
        let a = hash.digest('hex')
        console.log(a)
        console.log(rawSum)
        console.log('hu: ' + a.endsWith(rawSum))
        if(a === rawSum) {
          return true
        }
        return false
      }
    })
    */
  }

  getModFolder() {
    const fs = window.require('electron').remote.require('fs')
    if(!fs.existsSync(this.getMinecraftFolder())) {
      fs.mkdirSync(this.getMinecraftFolder())
    }
    if(!fs.existsSync(this.getMinecraftFolder() + '/mods')) {
      fs.mkdirSync(this.getMinecraftFolder() + '/mods')
    }
    return this.getMinecraftFolder() + '/mods'
  }
}

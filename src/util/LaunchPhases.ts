import axios from 'axios'
import crypto from 'crypto'
import { Stats } from 'fs-extra'

export class LaunchPhases {

  getMinecraftFolder() : String {
    let osdir: String = ''
    const os = window.require('electron').remote.require('os')
    console.log(os.userInfo().homedir)
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
    let response: any = await this.getRequestedFile('github.com', address)
    const fs = window.require('electron').remote.require('fs')
    const file = fs.createWriteStream(whereTo)
    console.log('File WriteStream Created. Piping...')
    response.pipe(file)
    file.on('finish', () => {
      file.close()
    })
    console.log('Pipe Success')
  }

  async downloadFileCf(address: string, whereTo: string) {
    let response: any = await this.getRequestedFile('www.curseforge.com', address)
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
    files.forEach((element: string) => {
      if(element !== 'fabricApi.jar' && element !== 'mod.jar') {
          checkSuccess = false
      }
    });
    if(fs.existsSync(this.getModFolder() + '/fabricApi.jar') && fs.existsSync(this.getModFolder() + '/mod.jar')) {
      checkSuccess = true
    }
    return checkSuccess
  }

  /**
   * @description Checksum check to promise
   */
  private dg(input: any, hash: any, rawSum: any) {
    return new Promise((resolve, reject) => {
      input.on('readable', () => {
        let data = input.read()
        console.log('updating hash(1)')
        if(data) {
          hash.update(data)
        } else {
          let a: string = hash.digest('hex')
          if(a === rawSum.replace(/\n/g, "")) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }

  async checkChecksum(fileName: string, sha1sumAddress: string) {
    console.log('checksm check')
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

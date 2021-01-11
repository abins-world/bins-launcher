import { app, BrowserWindow } from 'electron'
import * as isDev from 'electron-is-dev'
import { url } from 'inspector'
import * as path from 'path'
import { exit } from 'process'

// 1. GC가 일어나지 않도록 밖에 빼줌
function create_window() {
  
  let main_window = new BrowserWindow({
    // 이것들은 제가 사용하는 설정이니 각자 알아서 설정 하십시오.
    center: true,
    width: 1450,
    height: 800,
    autoHideMenuBar: true,
    kiosk: !isDev,
    icon: path.join(__dirname, "./icon/icon.png"),
    resizable: true,
    backgroundColor: '#f279be',
    minHeight: 640,
    minWidth: 1200,
    titleBarStyle: 'hidden',
    frame: false,
    show: false,
    webPreferences: {
      // 2.
      // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
      // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
      // true 해야 합니다.
      nodeIntegration: true,
    },
  })
  main_window.once('ready-to-show', () => {
    main_window.show()
})
 
  // 3. and load the index.html of the app.
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    main_window.loadURL('http://localhost:3000')
    main_window.webContents.openDevTools()
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근
    main_window.loadFile(path.join(__dirname, './build/index.html'))
  }
  // Emitted when the window is closed.
}

const remote = require('electron').remote
const currentWindow = remote.getCurrentWindow()


function window_close() {
  currentWindow.close()
}

function window_minimize() {
  currentWindow.minimize()
}

function window_Max_or_unMax() {
  if(currentWindow.isMaximized()){
    currentWindow.unmaximize();
    return;
  }
  currentWindow.maximize()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', create_window)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit()
})
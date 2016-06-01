:: Created by npm, please don't edit manually.
@IF EXIST "%~dp0\node.exe" (
  @IF EXIST "%~dp0\SetupLibs.js" (
    "%~dp0\node.exe"  "%~dp0\SetupLibs.js"
  )
  "%~dp0\node.exe"  "%~dp0\node_modules\grunt-cli\bin\grunt" %*
) ELSE (
  @IF EXIST "%~dp0\SetupLibs.js" (
    node  "%~dp0\SetupLibs.js"
  )
  node  "%~dp0\node_modules\grunt-cli\bin\grunt" %*
)
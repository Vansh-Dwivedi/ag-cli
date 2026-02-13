#!/usr/bin/env node
const { execFile } = require("child_process");

const cmd = process.argv[2];

if (cmd !== "corrupt") {
  console.log("Usage: ag corrupt");
  process.exit(0);
}

// PowerShell script
const psScript = `
Stop-Process -Name Antigravity -Force -ErrorAction SilentlyContinue

$agPath = "$env:LOCALAPPDATA\\Antigravity"
if (Test-Path $agPath) {
    Remove-Item -Recurse -Force $agPath
}

Start-Process "$env:LOCALAPPDATA\\Programs\\Antigravity\\Antigravity.exe"
`;

// Encode for PowerShell
const encoded = Buffer.from(psScript, "utf16le").toString("base64");

// Execute PowerShell safely
execFile(
  "powershell.exe",
  ["-NoProfile", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded],
  { windowsHide: true }
);

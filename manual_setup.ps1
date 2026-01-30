$ErrorActionPreference = "Stop"
try {
    New-Item -ItemType Directory -Force -Path car-rental-web | Out-Null
    Set-Location car-rental-web
    npm init -y > ../npm_init.log 2>&1
    npm install next react react-dom typescript @types/react @types/node @types/react-dom > ../npm_install.log 2>&1
    "Success" > ../setup_status.txt
} catch {
    $_ > ../setup_error.txt
}

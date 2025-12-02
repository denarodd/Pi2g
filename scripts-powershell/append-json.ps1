param(
  [string]$FilePath
)

# Lê o JSON enviado pelo Node (stdin)
$inputJson = [Console]::In.ReadToEnd()
$newItem = $inputJson | ConvertFrom-Json

# Se o arquivo existe, lemos ele; senão o array fica vazio
if (Test-Path $FilePath) {
    $current = Get-Content -Path $FilePath -Raw
    if ($current.Trim() -eq "") {
        $data = @()
    } else {
        $data = $current | ConvertFrom-Json
    }
} else {
    $data = @()
}

# Gerar ID automático
$newItem.id = [int][double]::Parse((Get-Date -UFormat %s))

# Adicionar ao array
$data += $newItem

# Salvar tudo no arquivo
$data | ConvertTo-Json -Depth 10 | Set-Content -Path $FilePath -Force

# Retornar SOMENTE o novo item
$newItem | ConvertTo-Json -Depth 10

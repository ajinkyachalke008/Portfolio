# Find the newest image in common locations
$searchPaths = @(
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\OneDrive\HistoryCal",
    "$env:USERPROFILE\Documents",
    "$env:USERPROFILE\Pictures",
    "$env:USERPROFILE\OneDrive\Pictures",
    "$env:USERPROFILE\Desktop"
)

$newest = Get-ChildItem -Path $searchPaths -Include *.jpg, *.jpeg, *.png -Recurse -ErrorAction SilentlyContinue |
Sort-Object LastWriteTime -Descending |
Select-Object -First 1

if ($newest) {
    Write-Output "Found newest image: $($newest.FullName) (Size: $($newest.Length), Modified: $($newest.LastWriteTime))"
    
    # Get the actual destination path using dir listing
    $destDir = Get-ChildItem "$env:USERPROFILE\OneDrive" -Recurse -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq 'images' -and $_.FullName -like '*porfolio*Portfolio*public*' } | Select-Object -First 1
    
    if ($destDir) {
        $destFile = Join-Path $destDir.FullName "hero.png"
        Copy-Item -LiteralPath $newest.FullName -Destination $destFile -Force
        Write-Output "SUCCESS: Copied to $destFile"
        Write-Output "New file size: $((Get-Item $destFile).Length)"
    }
    else {
        Write-Output "ERROR: Could not find destination directory"
    }
}
else {
    Write-Output "No images found"
}

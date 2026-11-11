# ---------------------------------------------------------------------------
#  bouw.ps1  -  zet alle beelden als base64 in de presentatie
#
#  Gebruik:  rechtsklik > "Uitvoeren met PowerShell", of in een terminal:
#            powershell -ExecutionPolicy Bypass -File .\bouw.ps1
#
#  Leg je eigen beelden (optioneel) in DEZE map, met precies deze namen:
#    overview.png    [A] luchtfoto Vinkel overzicht   (Google)
#    ingezoomd.png   [B] luchtfoto perceel dichterbij (Google)
#    streetview.png  [D] Street View Lindenlaan 12    (Google, wordt bijgesneden)
#    tzijl.png       [E] impressie nieuw 't Zijl, zelfde standpunt als [D]
#  Ontbreekt een bestand, dan wordt de versie uit .\bronnen gebruikt
#  (open PDOK-luchtfoto's / Gemini-impressie) of een getekende illustratie.
#
#  LET OP: vervang je ingezoomd.png of overview.png, stel dan in
#  sjabloon.html de perceelgrens en het blok "UITSNEDE_B_IN_A" bij.
#
#  Resultaat:  vinkel-presentatie.html  (één bestand, werkt offline)
# ---------------------------------------------------------------------------
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$hier = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $hier

# Bijsnijden Street View (fracties van breedte/hoogte). Haalt de Google-
# interface (zoekbalk, infopaneel, minikaart, 'Delen') en de vage onderrand weg.
# Pas aan als er nog interface-resten zichtbaar zijn.
# Ingesteld op de aangeleverde screenshot (1024 x 520): links valt het infopaneel,
# de werkbalk en de minikaart weg; de uitsnede is 16:9. De vage onderrand wordt in
# de presentatie afgedekt met een zachte verloopband (zie .svfade in sjabloon.html).
$SV_CROP = @{ x = 0.13; y = 0.025; w = 0.87; h = 0.95 }

function Get-DataUri([string]$pad, [int]$maxBreedte = 1920, [int]$kwaliteit = 80, $crop = $null) {
    $img = [System.Drawing.Image]::FromFile((Resolve-Path $pad))
    try {
        $sx = 0; $sy = 0; $sw = $img.Width; $sh = $img.Height
        if ($crop) {
            $sx = [int]($img.Width * $crop.x); $sy = [int]($img.Height * $crop.y)
            $sw = [int]($img.Width * $crop.w); $sh = [int]($img.Height * $crop.h)
        }
        $schaal = [math]::Min(1.0, $maxBreedte / $sw)
        $dw = [int]($sw * $schaal); $dh = [int]($sh * $schaal)
        $bmp = New-Object System.Drawing.Bitmap($dw, $dh)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = 'HighQualityBicubic'
        $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $dw, $dh)), (New-Object System.Drawing.Rectangle($sx, $sy, $sw, $sh)), [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $par = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $par.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$kwaliteit)
        $ms = New-Object System.IO.MemoryStream
        $bmp.Save($ms, $enc, $par); $bmp.Dispose()
        return 'data:image/jpeg;base64,' + [Convert]::ToBase64String($ms.ToArray())
    } finally { $img.Dispose() }
}

function Kies($eigen, $reserve) { if (Test-Path $eigen) { return $eigen } elseif ($reserve -and (Test-Path $reserve)) { return $reserve } else { return $null } }

$pdok = 'Luchtfoto: © Beeldmateriaal.nl / PDOK'
$goog = '© Google'

$a = Kies 'overview.png'   'bronnen\luchtfoto-overzicht-pdok.jpg'
$b = Kies 'ingezoomd.png'  'bronnen\luchtfoto-perceel-pdok.jpg'
$d = Kies 'streetview.png' $null
$e = Kies 'tzijl.png'      'bronnen\tzijl-lindenlaan.jpg'
$e2 = Kies 'tzijl-plein.png' 'bronnen\tzijl-plein.jpg'

$html = Get-Content 'sjabloon.html' -Raw -Encoding UTF8
$vervang = @{
    '__IMG_A__'   = (Get-DataUri $a 2400 78)
    '__IMG_B__'   = (Get-DataUri $b 2400 80)
    '__IMG_D__'   = $(if ($d) { Get-DataUri $d 1920 82 $SV_CROP } else { '' })
    '__IMG_E__'   = $(if ($e) { Get-DataUri $e 1920 84 } else { '' })
    '__IMG_E2__'  = $(if ($e2) { Get-DataUri $e2 1920 78 } else { '' })
    '__BRON_A__'  = $(if ($a -eq 'overview.png') { $goog } else { $pdok })
    '__BRON_B__'  = $(if ($b -eq 'ingezoomd.png') { $goog } else { $pdok })
    '__BRON_D__'  = $(if ($d) { $goog } else { 'Illustratie – [vervang door streetview.png]' })
}
foreach ($k in $vervang.Keys) { $html = $html.Replace($k, $vervang[$k]) }
[System.IO.File]::WriteAllText((Join-Path $hier 'vinkel-presentatie.html'), $html, (New-Object System.Text.UTF8Encoding($false)))

Write-Host "Klaar: vinkel-presentatie.html ($([math]::Round((Get-Item 'vinkel-presentatie.html').Length/1MB,1)) MB)"
Write-Host "  A: $a"; Write-Host "  B: $b"; Write-Host "  D: $(if($d){$d}else{'(illustratie)'})"; Write-Host "  E: $e"

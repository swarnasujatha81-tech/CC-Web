# Phone Frame Screenshot Fix - TODO

## Plan Steps:
- [x] Step 0: Read index.html and css/style.css to understand current structure
- [x] Step 1: Check actual screenshot image dimensions → 768 x 1376 (24:43 ratio)
- [x] Step 2: Fix `.phone-bezel` aspect-ratio from 9/18 to 768/1376
- [x] Step 3: Add `border-radius: 22px` to `.phone-screen` for inner screen clipping
- [x] Step 4: Add `object-position: top` and `display: block` to `.phone-screen img`
- [x] Step 5: Test at 360px, 768px, 1440px widths
- [x] Step 6: Cleanup - remove check_images.ps1

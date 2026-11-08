import type { ToolDefinition } from '@/data/tools'

const related = [
  { href: '/en/tools/image/image-resizer', title: 'Image Resizer', description: 'Change pixel dimensions or scale by a percentage.' },
  { href: '/en/tools/image/image-compressor', title: 'Image Compressor', description: 'Adjust quality and compare file sizes. PNG input produces WebP output.' },
  { href: '/en/tools/image/image-converter', title: 'Image Converter', description: 'Convert between JPG, PNG and WebP.' },
]

export const englishImageTools: ToolDefinition[] = [
  {
    id: 'image-resizer', name: 'Image Resizer', title: 'Image Resizer — Change image dimensions online | JSTools',
    description: 'Resize JPG, PNG and WebP images by pixels or percentage in your browser. Keep proportions or set an exact width and height, then download your results.',
    path: related[0].href, categoryName: 'Image tools', categoryPath: '/en#image-tools', keywords: ['image resizer', 'resize image', 'change image dimensions'],
    content: {
      introHeading: 'Resize images by pixels or percentage',
      description: ['Change the width and height of JPG, JPEG, PNG and WebP images without uploading them for image processing. Add several files and compare original and output dimensions before downloading.', 'Pixel mode accepts dimensions from 1 to 8,000 per side, with a 32-million-pixel output limit. Percentage mode accepts 1–500% and provides 25%, 50% and 75% presets. Enlarging an image does not restore missing detail.'],
      howTo: ['Choose files or drag them into the drop area. Added files are processed automatically using the current settings. On the first pixel-mode batch, empty dimensions are filled from the first readable image.', 'Select Pixels or Percentage. In pixel mode, Keep aspect ratio uses the width or height you changed last and calculates the other dimension for each image.', 'To set an exact 160 × 200 result regardless of the original ratio, turn off Keep aspect ratio and enter both values. This stretches the whole image if its proportions differ.', 'Select Apply size after changing settings. Check the result dimensions, then use the individual download button or Download all as ZIP.'],
      faq: [
        { question: 'Can I keep proportions and force both dimensions?', answer: 'Only when the target ratio matches the original. Otherwise one dimension is recalculated. Crop to the desired ratio first if you need to avoid distortion.' },
        { question: 'Will resizing produce exactly 100 KB?', answer: 'No. Pixel dimensions and file size are different. Check the downloaded size and use Image Compressor if needed. There is no automatic target-KB setting.' },
        { question: 'Does this tool add a pixelation effect?', answer: 'No. It changes the number of pixels across and down; it does not add mosaic or pixel-art effects.' },
        { question: 'How are files and ZIP names handled?', answer: 'Images are processed in the browser. Downloaded files stay on your device. The resizer currently uses each generated name as its ZIP entry name; duplicate output names can overwrite earlier entries. Use distinct base names or individual downloads for those files.' },
      ],
    }, relatedTools: related.filter(item => item.href !== related[0].href),
  },
  {
    id: 'image-compressor', name: 'Image Compressor', title: 'Image Compressor — Reduce JPG, PNG and WebP file size | JSTools',
    description: 'Adjust image compression quality in your browser and compare results. Compress multiple JPG, PNG or WebP files; PNG results are saved as WebP.',
    path: related[1].href, categoryName: 'Image tools', categoryPath: '/en#image-tools', keywords: ['image compressor', 'reduce image file size', 'PNG to WebP'],
    content: {
      introHeading: 'Reduce file size with quality settings',
      description: ['File size in KB or MB is different from width and height in pixels. This tool adjusts encoding quality while keeping pixel dimensions. PNG inputs are encoded as WebP; JPG and WebP keep their format.', 'Quality ranges from 40% to 100%, in 5-point steps, starting at 75%. Lower quality can lose detail. A smaller file is not guaranteed; compare the output with the original. For JPG and WebP, the original file is kept if re-encoding is not smaller. PNG-to-WebP results may be larger and are flagged for review.'],
      howTo: ['Choose one or more JPG, JPEG, PNG or WebP images. Each added file is processed automatically at the current quality.', 'Adjust Compression quality, then select Apply quality to update files already in the list.', 'Compare original and output file sizes and review any warning. If the file is still too large, resize its pixel dimensions first or try a different format.', 'Download a result individually or select Download all as ZIP. Duplicate ZIP names receive numeric suffixes; existing numbered names are reserved so no completed result is overwritten.'],
      faq: [
        { question: 'Can I set exactly 100 KB or 500 KB?', answer: 'No. There is no automatic target-file-size control. Adjust quality, download and check the file against your upload requirements.' },
        { question: 'Why did my PNG become WebP?', answer: 'The compressor uses WebP to apply quality compression to PNG input. If you must submit a PNG, use Image Converter afterward and check the new file size. Download the file and select it again in the next tool.' },
        { question: 'Are image files uploaded?', answer: 'Compression, previews and ZIP creation run in your browser. This does not mean the site makes no network requests: hosting, analytics and advertising are described in the Privacy Policy.' },
      ],
    }, relatedTools: related.filter(item => item.href !== related[1].href),
  },
  {
    id: 'image-converter', name: 'Image Converter', title: 'Image Converter — Convert JPG, PNG and WebP online | JSTools',
    description: 'Convert images between JPG, PNG and WebP in your browser. Choose a JPG background color or preserve transparency in PNG and WebP output.',
    path: related[2].href, categoryName: 'Image tools', categoryPath: '/en#image-tools', keywords: ['image converter', 'PNG to JPG', 'WebP to PNG'],
    content: {
      introHeading: 'Choose an image format for your next step',
      description: ['Convert JPG, JPEG, PNG and WebP files to a different JPG, PNG or WebP format while keeping their pixel dimensions. The converter accepts up to 30 files and images up to 32 million pixels. Empty files and GIF, SVG, HEIC and AVIF are not supported.', 'JPG has no alpha channel: transparent areas are filled with white by default, or with black or a custom color you select. PNG and WebP output retain transparent areas when the input has them. Conversion does not recover lost image detail or guarantee a smaller file.'],
      howTo: ['Choose files or drop them into the page. Added images are converted automatically to the selected output format (WebP initially).', 'Select JPG, PNG or WebP. Changing the format automatically reprocesses existing files. A file already in that format reports an error; select a different output format.', 'For JPG output, choose White, Black or Custom for transparent areas. Background changes also reprocess JPG results. Apply conversion lets you run the current settings again.', 'Check the result and download individually or as a ZIP. Ordinary duplicate output names receive numeric suffixes. Existing numbered base names can still collide in the converter ZIP; use distinct base names or download individually in that case.'],
      faq: [
        { question: 'Which format should I use for a submission site?', answer: 'Follow its accepted formats. If it only accepts JPG, choose JPG and inspect the background and file size before submitting.' },
        { question: 'Can I turn a JPG back into a transparent PNG?', answer: 'Choosing PNG creates a PNG file, but it cannot restore transparency or detail already removed from the original. Use a transparent source image when transparency matters.' },
        { question: 'Does conversion preserve animation or metadata?', answer: 'This tool draws an image onto a canvas and exports a new image. It is not an animation or metadata-preservation tool. Keep your original file if those properties matter.' },
      ],
    }, relatedTools: related.filter(item => item.href !== related[2].href),
  },
]

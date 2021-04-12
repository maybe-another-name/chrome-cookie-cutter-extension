chromium cookie cutter
===============

A completely local copy of a popular cookie editor extension.

From the chromium extensions menu, enable developer mode, then 'load unpacked' and pick this directory.

'Permissions' and entry points are defined in the manifest.  
Of particular note is the "\u003Call_urls>" permission:
 * doesn't appear isn't listed here: https://support.google.com/chrome/a/answer/7515036?hl=en
 * nor is it listed here: https://developer.chrome.com/docs/extensions/mv2/declare_permissions/
 * does appear to be malformed, with the leading unicode
 * is required verbatim to actually read cookies...

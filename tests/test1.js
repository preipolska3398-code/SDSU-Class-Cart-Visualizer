// Import Node.js' built-in test framework, assertion library and file system module
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

// Test related to REQ-1: The system shall show relevant course data.
// At this stage, this test first only checks that the extension has a working popup
test("REQ-1: course information UI is available through the extension popup", () => {

  // Read and parse the Chrome extension manifest
  const manifest = JSON.parse(
    fs.readFileSync("manifest.json", "utf8")
  );

  // Get the popup file defined in the manifest
  const popupFile = manifest.action.default_popup;

  // Check that a popup file is configured
  assert.ok(
    popupFile,
    "A popup page should be configured"
  );

  // Check that the configured popup file actually exists
  assert.ok(
    fs.existsSync(popupFile),
    "The configured popup page should exist"
  );

  // Read the popup HTML file
  const html = fs.readFileSync(popupFile, "utf8");

  // Check that the popup contains the application title
  // Confirms that the correct user interface is loaded
  assert.ok(
    html.includes("Aztec Schedule Sync"),
    "The course schedule interface should load"
  );
});

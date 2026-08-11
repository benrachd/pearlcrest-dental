/**
 * Builds a static export for GitHub Pages (project site).
 * Temporarily disables middleware (incompatible with `output: "export"`),
 * then restores it so local dev/server builds stay unchanged.
 */
import { spawnSync } from "node:child_process";
import { existsSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const middlewarePath = join(root, "src", "middleware.ts");
const middlewareBackup = join(root, "src", "middleware.gh-pages.bak");

const repoName = process.env.GH_PAGES_REPO ?? "pearlcrest-dental";
const githubUser = process.env.GH_PAGES_USER ?? "benrachd";
const basePath = `/${repoName}`;
const siteOrigin = `https://${githubUser}.github.io`;

const env = {
  ...process.env,
  GITHUB_PAGES: "true",
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? siteOrigin,
};

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function disableMiddleware() {
  if (!existsSync(middlewarePath)) return;
  renameSync(middlewarePath, middlewareBackup);
}

function restoreMiddleware() {
  if (existsSync(middlewareBackup)) {
    renameSync(middlewareBackup, middlewarePath);
  }
}

function writeGhPagesRootFiles() {
  const outDir = join(root, "out");
  const demoUrl = `${siteOrigin}${basePath}`;

  if (!existsSync(outDir)) {
    console.error("Expected static export at ./out but directory was not created.");
    process.exit(1);
  }

  writeFileSync(join(outDir, ".nojekyll"), "");

  // GitHub Pages project root -> default English locale (no middleware on static host).
  writeFileSync(
    join(outDir, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./en/" />
    <link rel="canonical" href="${demoUrl}/en/" />
    <script>location.replace("./en/");</script>
    <title>Pearlcrest Dental</title>
  </head>
  <body>
    <p><a href="./en/">Continue to Pearlcrest Dental</a></p>
  </body>
</html>
`,
  );
}

disableMiddleware();

try {
  console.log(`Building GitHub Pages export for ${siteOrigin}${basePath} (basePath: ${basePath})`);
  run("npm", ["run", "build"]);
  writeGhPagesRootFiles();
  console.log("\nStatic export ready in ./out");
} finally {
  restoreMiddleware();
}

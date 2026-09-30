
Action: execute_bash({"command":"tail -n 100 /var/log/supervisor/nextjs.*.log","cwd":"/app","timeout":30})
Observation: }
Error: Cannot find module './vendor-chunks/@tanstack.js'
Require stack:
- /app/.next/server/webpack-runtime.js
- /app/.next/server/pages/_document.js
- /app/node_modules/next/dist/server/require.js
- /app/node_modules/next/dist/server/load-components.js
- /app/node_modules/next/dist/build/utils.js
- /app/node_modules/next/dist/build/swc/options.js
- /app/node_modules/next/dist/build/swc/index.js
- /app/node_modules/next/dist/build/analysis/parse-module.js
- /app/node_modules/next/dist/build/analysis/get-page-static-info.js
- /app/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js
- /app/node_modules/next/dist/server/lib/router-server.js
- /app/node_modules/next/dist/server/lib/start-server.js
    at <unknown> (.next/server/app/page.js:324:47)
    at Object.<anonymous> (.next/server/app/page.js:327:3) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [Array],
  page: '/'
}
 ⨯ [Error: ENOENT: no such file or directory, open '/app/.next/routes-manifest.json'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/app/.next/routes-manifest.json'
}
 ⨯ Error: Cannot find module './vendor-chunks/@tanstack.js'
Require stack:
- /app/.next/server/webpack-runtime.js
- /app/.next/server/pages/_document.js
- /app/node_modules/next/dist/server/require.js
- /app/node_modules/next/dist/server/load-components.js
- /app/node_modules/next/dist/build/utils.js
- /app/node_modules/next/dist/build/swc/options.js
- /app/node_modules/next/dist/build/swc/index.js
- /app/node_modules/next/dist/build/analysis/parse-module.js
- /app/node_modules/next/dist/build/analysis/get-page-static-info.js
- /app/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js
- /app/node_modules/next/dist/server/lib/router-server.js
- /app/node_modules/next/dist/server/lib/start-server.js
    at <unknown> (.next/server/app/page.js:324:47)
    at Object.<anonymous> (.next/server/app/page.js:327:3) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [Array],
  page: '/'
}
[Error: ENOENT: no such file or directory, open '/app/.next/routes-manifest.json'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/app/.next/routes-manifest.json'
}
 ⚠ Server is approaching the used memory threshold, restarting...
Error: Cannot find module './vendor-chunks/@tanstack.js'
Require stack:
- /app/.next/server/webpack-runtime.js
- /app/.next/server/pages/_document.js
- /app/node_modules/next/dist/server/require.js
- /app/node_modules/next/dist/server/load-components.js
- /app/node_modules/next/dist/build/utils.js
- /app/node_modules/next/dist/build/swc/options.js
- /app/node_modules/next/dist/build/swc/index.js
- /app/node_modules/next/dist/build/analysis/parse-module.js
- /app/node_modules/next/dist/build/analysis/get-page-static-info.js
- /app/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js
- /app/node_modules/next/dist/server/lib/router-server.js
- /app/node_modules/next/dist/server/lib/start-server.js
    at <unknown> (.next/server/app/page.js:324:47)
    at Object.<anonymous> (.next/server/app/page.js:327:3) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [Array],
  page: '/'
}
   ▲ Next.js 15.5.18
   - Local:        http://localhost:3000
   - Network:      http://0.0.0.0:3000
   - Environments: .env

 ✓ Starting...
 ✓ Ready in 1321ms
 ○ Compiling / ...
 ✓ Compiled / in 2.7s (674 modules)
 GET / 200 in 1784ms
 GET / 200 in 3507ms
 ✓ Compiled in 443ms (295 modules)
 GET / 200 in 48ms
 GET / 200 in 51ms
 ⚠ Cross origin request detected from framer-scroll.cluster-3.preview.emergentcf.cloud to /_next/* resource. In a future major version of Next.js, you will need to explicitly configure "allowedDevOrigins" in next.config to allow this.
Read more: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
 ○ Compiling /api/[[...path]] ...
 ✓ Compiled /api/[[...path]] in 3.1s (703 modules)
 GET /api 200 in 1248ms
 GET /api 200 in 17ms
 GET / 200 in 223ms
 GET / 200 in 95ms
 GET /api 200 in 21ms
 GET / 200 in 70ms
 GET / 200 in 70ms
 GET /api 200 in 20ms
Exit code: 0

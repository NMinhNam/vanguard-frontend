// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'file:///E:/DuAnTotNgiepTemp/HR_Web_Suite/node_modules/vite/dist/node/index.js'
import vue from 'file:///E:/DuAnTotNgiepTemp/HR_Web_Suite/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueDevTools from 'file:///E:/DuAnTotNgiepTemp/HR_Web_Suite/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.8_rollup@4.21.0_vite@5.4.1_vue@3.4.38/node_modules/vite-plugin-vue-devtools/dist/vite.mjs'
var __vite_injected_original_import_meta_url = 'file:///E:/DuAnTotNgiepTemp/HR_Web_Suite/vite.config.js'
var vite_config_default = defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', __vite_injected_original_import_meta_url)),
            '@views': fileURLToPath(new URL('./src/views', __vite_injected_original_import_meta_url)),
            '@assets': fileURLToPath(new URL('./src/assets', __vite_injected_original_import_meta_url)),
            '@components': fileURLToPath(new URL('./src/cpmponents', __vite_injected_original_import_meta_url)),
        },
    },
    server: {
        port: 1668,
        open: true,
        host: '0.0.0.0',
    },
    optimizeDeps: {
        include: ['bootstrap'],
    },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEdUFuVG90TmdpZXBUZW1wXFxcXEhSX1dlYl9TdWl0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcRHVBblRvdE5naWVwVGVtcFxcXFxIUl9XZWJfU3VpdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0R1QW5Ub3ROZ2llcFRlbXAvSFJfV2ViX1N1aXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbdnVlKCksIHZ1ZURldlRvb2xzKCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICAnQHZpZXdzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy92aWV3cycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICAnQGFzc2V0cyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICAgICAgICdAY29tcG9uZW50cyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvY3BtcG9uZW50cycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogMTY2OCxcclxuICAgICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgIH0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgICBpbmNsdWRlOiBbJ2Jvb3RzdHJhcCddLFxyXG4gICAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLGVBQWUsV0FBVztBQUUzVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFKcUosSUFBTSwyQ0FBMkM7QUFPOU4sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7QUFBQSxFQUM5QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3BELFVBQVUsY0FBYyxJQUFJLElBQUksZUFBZSx3Q0FBZSxDQUFDO0FBQUEsTUFDL0QsV0FBVyxjQUFjLElBQUksSUFBSSxnQkFBZ0Isd0NBQWUsQ0FBQztBQUFBLE1BQ2pFLGVBQWUsY0FBYyxJQUFJLElBQUksb0JBQW9CLHdDQUFlLENBQUM7QUFBQSxJQUM3RTtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDVixTQUFTLENBQUMsV0FBVztBQUFBLEVBQ3pCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

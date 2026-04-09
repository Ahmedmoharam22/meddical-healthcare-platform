import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  build: {
    // 1. ضغط الكود لأقصى درجة
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // 2. تظبيط الـ Chunking الذكي
    rollupOptions: {
      output: {
        manualChunks(id) {
          // فصل مكتبات Node Modules الكبيرة في ملفات لوحدها (Caching أفضل)
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'ui-icons';
            if (id.includes('framer-motion')) return 'ui-animations';
            if (id.includes('axios') || id.includes('query')) return 'network-layers';
            return 'vendor'; // الباقي يروح للـ vendor
          }
        },
        // تحسين تسمية الملفات عشان الـ Browser Caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // 3. تحسينات إضافية للـ Performance
    reportCompressedSize: false, // بيسرع عملية الـ Build شوية
    cssCodeSplit: true, // بيفصل الـ CSS لكل صفحة لوحدها
    chunkSizeWarningLimit: 1000, // بيرفع حد التحذير لـ 1MB
  },
  
  // تظبيط الـ Server عشان لو شغال Local ميبقاش تقيل
  server: {
    hmr: {
      overlay: false, // بيخفي الـ Error overlay المزعج
    },
  },
})
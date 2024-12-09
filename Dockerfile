# Build stage
FROM node:18-alpine AS build-stage

# Cài đặt pnpm
RUN npm install -g pnpm

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép các file cấu hình package
COPY package.json pnpm-lock.yaml ./

# Cài đặt các dependencies bằng pnpm
RUN pnpm install

# Sao chép toàn bộ mã nguồn vào trong container
COPY . .

# Build ứng dụng (tạo ra các file tĩnh)
RUN pnpm run build

# Production stage
FROM nginx:stable-alpine AS production-stage

# Sao chép các file đã build từ build stage vào thư mục tĩnh của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Mở port 80 cho việc truy cập ứng dụng
EXPOSE 80

# Chạy Nginx (Nginx sẽ chạy dưới chế độ không chạy nền)
CMD ["nginx", "-g", "daemon off;"]
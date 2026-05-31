# VPS Backup & Deploy Guide cho dự án BioTechVet

## 🚀 QUICK START - Backup Tự Động (Dành cho người dùng)

Chỉ cần chạy 1 lần duy nhất trên VPS, script sẽ tự động backup hàng ngày:

```bash
# 1. Tải script về VPS
wget https://raw.githubusercontent.com/your-repo/backup_daily.sh -O /var/www/biotechvet/backup_daily.sh

# 2. Cấp quyền thực thi
chmod +x /var/www/biotechvet/backup_daily.sh

# 3. Chạy script lần đầu (cần sudo)
sudo /var/www/biotechvet/backup_daily.sh
```

**Hoàn tất!** Script sẽ:
- ✅ Backup toàn bộ project, uploads, và database ngay lập tức
- ✅ Thiết lập cron job để tự động backup mỗi ngày lúc 2:00 AM
- ✅ Giữ tối đa 5 backup gần nhất (tự động xóa backup cũ)
- ✅ Ghi log chi tiết vào `/var/log/vps_backup_daily.log`

Các file backup sẽ được lưu tại: `/tmp/vps_backup_daily/`

---

## Mục tiêu
- Sao lưu toàn bộ dữ liệu của ứng dụng Next.js từ VPS cũ về máy local.
- Bao gồm dữ liệu 5 ngày gần nhất và các cấu hình deploy quan trọng.
- Khôi phục và deploy lại ứng dụng trên VPS mới với dữ liệu giống cũ.

## Dựa trên source code của repo này
Ứng dụng sử dụng:
- Next.js 16
- `pnpm`
- PostgreSQL
- Prisma
- Upload files lưu trong `public/uploads`
- Cấu hình deploy tham khảo `DEPLOYMENT_GUIDE.md`

## 1. Các dữ liệu quan trọng cần sao lưu
### 1.1 Thư mục dự án
Nên sao lưu toàn bộ thư mục dự án nếu có thể, gồm:
- `app/`, `src/`, `public/`, `prisma/`, `data/`
- `package.json`, `pnpm-lock.yaml`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`
- `.env.production`, `.env` (hoặc file cấu hình môi trường khác)
- `ecosystem.config.js` (nếu dùng PM2)
- `/etc/nginx/sites-available/biotechvet` và `/etc/nginx/sites-enabled/biotechvet` nếu bạn dùng Nginx reverse proxy

### 1.2 Uploads và dữ liệu tĩnh
Đặc biệt quan trọng:
- `public/uploads/` (hình ảnh do người dùng upload)
- `public/images/` nếu có asset tĩnh quan trọng

### 1.3 Database
Ứng dụng của bạn dùng PostgreSQL. Cần sao lưu database:
- Tên database thường là `biotechvet`
- User `postgres` hoặc user cấu hình trong `.env.production`

### 1.4 Cấu hình bổ sung
- `pm2` config: `ecosystem.config.js`
- Nginx config + SSL cert nếu bạn muốn giữ nguyên cấu hình
- Các script deploy/backup trong `/var/www/biotechvet`

## 2. Backup dữ liệu từng ngày (tối đa 5 ngày gần nhất) trên VPS cũ
Giả sử ứng dụng đang ở `/var/www/biotechvet` trên VPS cũ.

### 2.0 Phương pháp NHANH NHẤT (Recommended ⭐)
Sử dụng script `backup_daily.sh` - chỉ cần chạy 1 lần:

```bash
# Copy script vào project (nếu chưa có)
cp backup_daily.sh /var/www/biotechvet/

# Cấp quyền thực thi
chmod +x /var/www/biotechvet/backup_daily.sh

# Chạy script (cần sudo)
sudo /var/www/biotechvet/backup_daily.sh
```

**Kết quả:**
- 🔄 Backup ngay lập tức (project, uploads, database)
- ⏰ Cron job được thiết lập tự động (chạy 2:00 AM mỗi ngày)
- 🧹 Tự động giữ 5 backup gần nhất
- 📝 Log chi tiết: `/var/log/vps_backup_daily.log`
- 📂 Backup folder: `/tmp/vps_backup_daily/`

---

### 2.1 Cấu hình Script (tuỳ chỉnh nếu cần)
Mở file `backup_daily.sh` và chỉnh sửa các biến này nếu cấu hình khác:

```bash
PROJECT_DIR="/var/www/biotechvet"         # Thay đổi nếu path khác
BACKUP_DIR="/tmp/vps_backup_daily"        # Nơi lưu backup
DB_NAME="biotechvet"                      # Tên database
DB_USER="postgres"                        # User database
MAX_BACKUPS=5                             # Giữ tối đa 5 backup
```

---

### 2.2 Kiểm tra Log Backup
```bash
# Xem log real-time
tail -f /var/log/vps_backup_daily.log

# Xem toàn bộ log
cat /var/log/vps_backup_daily.log
```

---

### 2.3 Kiểm tra Cron Job đã Setup
```bash
# Xem cron job hiện tại
crontab -l

# Kết quả sẽ hiển thị tương tự:
# 0 2 * * * /var/www/biotechvet/backup_daily.sh >> /var/log/vps_backup_daily.log 2>&1
```

---

### 2.4 Xem Danh Sách Backup Hiện Có
```bash
# Xem tất cả backup
ls -lh /tmp/vps_backup_daily/

# Xem chi tiết từng loại
ls -lh /tmp/vps_backup_daily/backup_project_*    # Project backups
ls -lh /tmp/vps_backup_daily/backup_uploads_*    # Uploads backups
ls -lh /tmp/vps_backup_daily/db/backup_db_*      # Database backups
```

---

### 2.5 Chạy Backup Ngay (không cần chờ cron)
```bash
# Chạy backup ngay lập tức
sudo /var/www/biotechvet/backup_daily.sh

# Bỏ qua setup cron (chỉ backup)
sudo /var/www/biotechvet/backup_daily.sh skip-cron
```

---

### 2.6 Xóa Backup Cũ Thủ Công (nếu cần)
```bash
# Xóa backup cũ hơn 5 ngày
find /tmp/vps_backup_daily -type f -mtime +5 -delete

# Xóa toàn bộ backup folder
rm -rf /tmp/vps_backup_daily
```

---

## 3. PHƯƠNG PHÁP THỦ CÔNG (Nếu không muốn dùng script)

Nếu bạn không muốn dùng script tự động, có thể chạy các lệnh thủ công:

### 3.1 Backup Project
```bash
mkdir -p /tmp/vps_backup_daily
tar -czf /tmp/vps_backup_daily/backup_project_$(date +%Y%m%d_%H%M%S).tar.gz -C /var/www/biotechvet .
```

### 3.2 Backup Uploads
```bash
tar -czf /tmp/vps_backup_daily/backup_uploads_$(date +%Y%m%d_%H%M%S).tar.gz -C /var/www/biotechvet/public uploads/
```

### 3.3 Backup Database
```bash
mkdir -p /tmp/vps_backup_daily/db

# Phương pháp 1: Binary format (nên dùng)
export PGPASSWORD="password_thoat_tế"
pg_dump -U postgres -h localhost -F c -b -v -f /tmp/vps_backup_daily/db/backup_db_$(date +%Y%m%d_%H%M%S).dump biotechvet
unset PGPASSWORD

# Phương pháp 2: SQL plain text
export PGPASSWORD="password_thoat_tế"
pg_dump -U postgres -h localhost -d biotechvet > /tmp/vps_backup_daily/db/backup_db_$(date +%Y%m%d_%H%M%S).sql
unset PGPASSWORD
```

### 3.4 Dọn dẹp Backup Cũ
```bash
# Giữ tối đa 5 backup (xóa cũ hơn)
find /tmp/vps_backup_daily -type f -name "backup_*.tar.gz" -mtime +5 -delete
find /tmp/vps_backup_daily/db -type f -mtime +5 -delete
```

---

## 4. KHÔI PHỤC BACKUP

### 4.1 Tải Backup từ VPS sang Local
```bash
# Từ máy local, SSH vào VPS và tải file
scp -r root@your_vps_ip:/tmp/vps_backup_daily/ ~/vps_backups/

# Hoặc dùng rsync
rsync -avz root@your_vps_ip:/tmp/vps_backup_daily/ ~/vps_backups/
```

### 4.2 Khôi Phục Project
```bash
# Giải nén backup project
tar -xzf ~/vps_backups/backup_project_*.tar.gz -C /path/to/project/

# Khôi Phục Database
pg_restore -U postgres -h localhost -d biotechvet -v ~/vps_backups/db/backup_db_*.dump

# Hoặc từ SQL file
psql -U postgres -h localhost -d biotechvet < ~/vps_backups/db/backup_db_*.sql
```

---

## 5. TROUBLESHOOTING

### 5.1 Backup không chạy?
Kiểm tra log:
```bash
tail -50 /var/log/vps_backup_daily.log
```

### 5.2 Database backup bị lỗi?
Kiểm tra kết nối PostgreSQL:
```bash
psql -U postgres -h localhost -c "SELECT version();"
```

Hoặc kiểm tra password:
```bash
export PGPASSWORD="password"
pg_dump -U postgres -h localhost --dbname=biotechvet --dry-run
```

### 5.3 Không đủ dung lượng?
Kiểm tra dung lượng:
```bash
df -h /tmp/
du -sh /tmp/vps_backup_daily/
```

Xóa backup cũ:
```bash
rm -rf /tmp/vps_backup_daily/*
```

---

## 6. LƯU Ý QUAN TRỌNG

- ⚠️ **Luôn có 2 bản backup** - Trên VPS cũ + Tải về máy local
- ⚠️ **Kiểm tra backup định kỳ** - Không chỉ là tạo mà phải test khôi phục
- ⚠️ **Lưu password an toàn** - Không commit password vào Git
- ⚠️ **Cron job chạy với user nào?** - Đảm bảo user có quyền read project và database
- ⚠️ **Thử khôi phục từ backup** - Trước khi cần thực sự, test một lần

---

## 7. THAM KHẢO THÊM
- [PostgreSQL Backup Documentation](https://www.postgresql.org/docs/current/backup-dump.html)
- [Linux tar command](https://linux.die.net/man/1/tar)
- [Cron job tutorial](https://crontab.guru/)


## 3. Chuyển file backup về máy local Windows
### 3.1 Dùng PowerShell/CMD với `scp`
```powershell
scp username@vps_ip:/tmp/vps_backup_last5days/vps_backup_biotechvet_last5days.tar.gz C:\Users\YourName\Downloads\
```

### 3.2 Dùng WinSCP
- Kết nối SSH tới VPS.
- Duyệt tới `/tmp/vps_backup_last5days`.
- Tải file `vps_backup_biotechvet_last5days.tar.gz` về máy local.

### 3.3 Dùng WSL + rsync
Nếu bạn cài WSL trên Windows:
```bash
rsync -avz --progress username@vps_ip:/tmp/vps_backup_last5days/ ~/vps_backup_last5days_local/
```

## 4. Kiểm tra backup trên máy local
1. Giải nén file backup.
2. Kiểm tra tồn tại:
   - `package.json`, `pnpm-lock.yaml`, `prisma/schema.prisma`
   - `public/uploads/`
   - `.env.production` hoặc `.env`
   - `db/biotechvet.dump` hoặc `db/biotechvet.sql`
3. Nếu backup gồm cả `ecosystem.config.js`, `nginx` config thì kiểm tra luôn.

## 5. Khôi phục và deploy trên VPS mới
### 5.1 Chuẩn bị VPS mới
Cài đặt các công cụ cơ bản:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nginx certbot python3-certbot-nginx build-essential
```

Cài Node.js 20 và pnpm:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm pm2
```

### 5.2 Tạo user và thư mục ứng dụng
```bash
sudo useradd -m -s /bin/bash biotechvet
sudo usermod -aG sudo biotechvet
sudo mkdir -p /var/www/biotechvet
sudo chown -R biotechvet:biotechvet /var/www/biotechvet
```

### 5.3 Tải backup lên VPS mới
Trên máy local:
```powershell
scp C:\Users\YourName\Downloads\vps_backup_biotechvet_last5days.tar.gz biotechvet@new_vps_ip:/tmp/
```

### 5.4 Giải nén backup
Trên VPS mới:
```bash
cd /tmp
tar -xzf vps_backup_biotechvet_last5days.tar.gz
```

Nếu bạn sao lưu toàn bộ app:
```bash
tar -xzf app_full_last5days.tar.gz -C /var/www/biotechvet
```

Nếu backup chỉ chứa `app_changes_last5days.tar.gz`:
```bash
tar -xzf app_changes_last5days.tar.gz -C /var/www/biotechvet
```

### 5.5 Cài đặt dependencies và build ứng dụng
```bash
cd /var/www/biotechvet
sudo -u biotechvet pnpm install
sudo -u biotechvet npx prisma generate
sudo -u biotechvet pnpm run build
```

### 5.6 Khôi phục database PostgreSQL
Cài PostgreSQL:
```bash
sudo apt install -y postgresql postgresql-contrib
```

Tạo database và user giống cấu hình trong `.env.production`:
```bash
sudo -u postgres psql
CREATE DATABASE biotechvet;
ALTER USER postgres WITH PASSWORD '123456';
GRANT ALL PRIVILEGES ON DATABASE biotechvet TO postgres;
\q
```

Khôi phục từ file dump:
```bash
export PGPASSWORD="123456"
pg_restore -U postgres -d biotechvet -v /tmp/vps_backup_last5days/db/biotechvet_*.dump
unset PGPASSWORD
```

Hoặc nếu dùng file SQL:
```bash
export PGPASSWORD="123456"
psql -U postgres -d biotechvet -f /tmp/vps_backup_last5days/db/biotechvet.sql
unset PGPASSWORD
```

> Nếu bạn dùng user khác, thay `postgres` bằng user thực tế và cập nhật `DATABASE_URL`.

### 5.7 Thiết lập `public/uploads`
```bash
sudo mkdir -p /var/www/biotechvet/public/uploads
sudo chown -R biotechvet:biotechvet /var/www/biotechvet/public/uploads
sudo chmod -R 755 /var/www/biotechvet/public/uploads
```

Nếu backup chứa uploads:
```bash
rsync -av /tmp/vps_backup_last5days/project_changes/public/uploads/ /var/www/biotechvet/public/uploads/
```

### 5.8 Cấu hình môi trường
Tạo hoặc sửa file `/var/www/biotechvet/.env.production`:
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
DATABASE_URL=postgresql://postgres:123456@localhost:5432/biotechvet?schema=public
NEXT_PUBLIC_STORAGE_URL="/uploads"
CONTACT_EMAIL=admin@yourdomain.com
```

> Chú ý: `NEXT_PUBLIC_STORAGE_URL` phải là `/uploads` để Next.js phục vụ file upload đúng đường dẫn.

### 5.9 Cấu hình PM2
Nếu backup không có `ecosystem.config.js`, tạo file mới tại `/var/www/biotechvet/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'biotechvet',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/biotechvet',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/biotechvet/error.log',
      out_file: '/var/log/biotechvet/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'public/uploads'],
    },
  ],
};
```

Tạo thư mục log và khởi chạy PM2:
```bash
sudo mkdir -p /var/log/biotechvet
sudo chown -R biotechvet:biotechvet /var/log/biotechvet
cd /var/www/biotechvet
sudo -u biotechvet pm2 start ecosystem.config.js
sudo pm2 startup -u biotechvet --hp /home/biotechvet
sudo pm2 save
```

### 5.10 Cấu hình Nginx
Tạo file Nginx tại `/etc/nginx/sites-available/biotechvet` dựa trên config hiện tại, ví dụ:
```nginx
upstream biotechvet_app {
  server 127.0.0.1:3000;
  keepalive 64;
}

server {
  listen 80;
  server_name your-domain.com www.your-domain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name your-domain.com www.your-domain.com;

  ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

  location / {
    proxy_pass http://biotechvet_app;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /uploads/ {
    alias /var/www/biotechvet/public/uploads/;
    expires 30d;
    add_header Cache-Control 'public';
    access_log off;
  }
}
```

Kích hoạt và test Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/biotechvet /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 5.11 Tạo SSL với Certbot
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 6. Kiểm tra sau khi deploy
- Kiểm tra trang web: `https://your-domain.com`
- Kiểm tra PM2: `sudo -u biotechvet pm2 status`
- Xem logs: `sudo -u biotechvet pm2 logs --lines 100`
- Kiểm tra Nginx: `sudo nginx -t`
- Kiểm tra SSL: `sudo certbot certificates`

## 7. Lời khuyên thêm
- Nên giữ 2 bản backup: file backup trên VPS local và trên máy local.
- Nếu chỉ cần phục hồi dữ liệu 5 ngày gần nhất, dùng `find ... -mtime -5` để lọc file thay đổi.
- Nếu muốn nhanh hơn, backup toàn bộ thư mục và rebuild lại trên VPS mới.
- Luôn cập nhật `.env.production` với database và domain mới.

---

*Hướng dẫn này đã được điều chỉnh theo cấu trúc source code của dự án BioTechVet trong repo hiện tại.*
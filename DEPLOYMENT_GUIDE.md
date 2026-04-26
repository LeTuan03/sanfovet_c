# Deployment Guide - Bare Metal (No Docker)

This guide covers deploying the BioTechVet application to a bare-metal server without Docker.

**Domain:** biotechvet.com.vn

## Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 8+ (or npm/yarn)
- Linux server (Ubuntu 20.04+ recommended)
- Access to server via SSH
- Domain name and DNS configured
- SSL certificate (from Let's Encrypt)

## Server Preparation

### 1. System Update

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js and pnpm

**Using NodeSource repository (Ubuntu/Debian):**

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install pnpm globally
npm install -g pnpm
pnpm --version
```

### 3. Install System Dependencies

```bash
sudo apt install -y build-essential git curl wget nginx certbot python3-certbot-nginx
```

### 4. Create Application User

```bash
sudo useradd -m -s /bin/bash biotechvet
sudo usermod -aG sudo biotechvet
```

### 5. Create Application Directory

```bash
sudo mkdir -p /var/www/biotechvet
sudo chown -R biotechvet:biotechvet /var/www/biotechvet
cd /var/www/biotechvet
```

## Application Setup

### 1. Clone or Upload Repository

**Option A - Clone from Git:**

```bash
sudo -u biotechvet git clone <your-repo-url> /var/www/biotechvet
cd /var/www/biotechvet
```

**Option B - Upload via SCP:**

```bash
scp -r ./biotechvet biotechvet@server-ip:/var/www/
```

### 2. Install Dependencies

```bash
cd /var/www/biotechvet
sudo -u biotechvet pnpm install
```

### 3. Environment Configuration

Create `.env.production` file:

```bash
sudo -u biotechvet nano /var/www/biotechvet/.env.production
```

Add the following variables (adjust as needed):

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://biotechvet.com.vn/api

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_ADMIN_SDK_KEY=your_admin_sdk_key

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_database_url

# Email/Contact
CONTACT_EMAIL=admin@yourdomain.com
```

### 4. Build Application

```bash
cd /var/www/biotechvet
sudo -u biotechvet pnpm run build
```

Verify build output exists:

```bash
ls -la /var/www/biotechvet/.next
```

## Process Management with PM2

### 1. Install PM2 Globally

```bash
sudo npm install -g pm2
```

### 2. Create PM2 Ecosystem Configuration

Create `ecosystem.config.js`:

```bash
sudo nano /var/www/biotechvet/ecosystem.config.js
```

Add the following content:

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
      ignore_watch: ['node_modules', '.next', 'public'],
    },
  ],
};
```

### 3. Create Log Directory

```bash
sudo mkdir -p /var/log/biotechvet
sudo chown -R biotechvet:biotechvet /var/log/biotechvet
```

### 4. Start Application with PM2

```bash
cd /var/www/biotechvet
sudo -u biotechvet pm2 start ecosystem.config.js
```

### 5. Enable PM2 Startup

```bash
sudo pm2 startup -u biotechvet --hp /home/biotechvet
sudo pm2 save
```

### 6. Verify PM2 Status

```bash
sudo -u biotechvet pm2 status
sudo -u biotechvet pm2 logs
```

## Nginx Reverse Proxy Setup

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/biotechvet
```

Add the following configuration:

```nginx
upstream biotechvet_app {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name biotechvet.com.vn www.biotechvet.com.vn;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name biotechvet.com.vn www.biotechvet.com.vn;
    
    # SSL Configuration (Certbot will manage this)
    ssl_certificate /etc/letsencrypt/live/biotechvet.com.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/biotechvet.com.vn/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS Header
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Logging
    access_log /var/log/nginx/biotechvet-access.log;
    error_log /var/log/nginx/biotechvet-error.log;
    
    # Client Upload Size
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://biotechvet_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 30s;
        proxy_connect_timeout 30s;
    }
    
    # Static assets caching
    location /_next/static/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        proxy_pass http://biotechvet_app;
    }
    
    location /public/ {
        expires 7d;
        add_header Cache-Control "public";
        root /var/www/biotechvet;
    }
}
```

### 2. Enable Nginx Configuration

```bash
sudo ln -s /etc/nginx/sites-available/biotechvet /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

### 3. Test Nginx Configuration

```bash
sudo nginx -t
```

### 4. Start Nginx

```bash
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## SSL Certificate Setup (Let's Encrypt)

### 1. Generate SSL Certificate

```bash
sudo certbot certonly --nginx -d biotechvet.com.vn -d www.biotechvet.com.vn
```

### 2. Auto-Renewal Setup

```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 3. Verify Certificate

```bash
sudo certbot certificates

# Check certificate details
echo | openssl s_client -servername biotechvet.com.vn -connect biotechvet.com.vn:443 2>/dev/null | openssl x509 -noout -dates
```

## Deployment Updates

### 1. Create Update Script

Create `/var/www/biotechvet/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

cd /var/www/biotechvet

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build application
echo "🔨 Building application..."
pnpm run build

# Restart application
echo "🔄 Restarting application..."
pm2 restart biotechvet

echo "✅ Deployment completed successfully!"
```

### 2. Make Script Executable

```bash
sudo chmod +x /var/www/biotechvet/deploy.sh
sudo chown biotechvet:biotechvet /var/www/biotechvet/deploy.sh
```

### 3. Run Deployment

```bash
cd /var/www/biotechvet
./deploy.sh
```

## Monitoring and Logging

### 1. View Application Logs

```bash
# Real-time logs
sudo -u biotechvet pm2 logs

# Specific logs
tail -f /var/log/biotechvet/out.log
tail -f /var/log/biotechvet/error.log
```

### 2. Monitor Application Performance

```bash
sudo -u biotechvet pm2 monit
```

### 3. View Nginx Logs

```bash
tail -f /var/log/nginx/biotechvet-access.log
tail -f /var/log/nginx/biotechvet-error.log
```

### 4. Set Up Log Rotation

Create `/etc/logrotate.d/biotechvet`:

```bash
sudo nano /etc/logrotate.d/biotechvet
```

Add:

```
/var/log/biotechvet/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 biotechvet biotechvet
    sharedscripts
    postrotate
        sudo -u biotechvet pm2 reload all > /dev/null 2>&1 || true
    endscript
}
```

## Database Migrations (if applicable)

### 1. Run Database Migrations

```bash
cd /var/www/biotechvet
npm run migrate  # or your migration command
```

### 2. Backup Database

```bash
# Example for PostgreSQL
pg_dump -U username database_name > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Troubleshooting

### Application Won't Start

```bash
# Check PM2 status
sudo -u biotechvet pm2 status

# Check detailed logs
sudo -u biotechvet pm2 logs --lines 100

# Restart PM2
sudo -u biotechvet pm2 restart biotechvet
```

### Port 3000 Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

### Nginx Not Connecting

```bash
# Test Nginx configuration
sudo nginx -t

# Check if Nginx is running
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/biotechvet-error.log
```

### Out of Memory

```bash
# Check memory usage
free -h

# Update PM2 max memory restart
# Edit ecosystem.config.js and increase max_memory_restart value
```

### SSL Certificate Issues

```bash
# Check certificate details
sudo certbot certificates

# Renew certificate manually
sudo certbot renew --force-renewal

# Reinstall certificate
sudo certbot delete --cert-name biotechvet.com.vn
sudo certbot certonly --nginx -d biotechvet.com.vn -d www.biotechvet.com.vn
```

## Backup and Recovery

### 1. Create Backup Script

Create `/var/www/biotechvet/backup.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/var/backups/biotechvet"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup application
tar -czf $BACKUP_DIR/app_$TIMESTAMP.tar.gz /var/www/biotechvet

# Keep only last 7 backups
ls -t $BACKUP_DIR/app_*.tar.gz | tail -n +8 | xargs rm -f

echo "Backup completed: $BACKUP_DIR/app_$TIMESTAMP.tar.gz"
```

### 2. Schedule Daily Backups with Cron

```bash
sudo crontab -e
```

Add:

```cron
0 2 * * * /var/www/biotechvet/backup.sh >> /var/log/biotechvet/backup.log 2>&1
```

## Security Hardening

### 1. Firewall Configuration

```bash
# Enable UFW
sudo ufw enable

# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block all other ports
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### 2. SSH Security

Edit `/etc/ssh/sshd_config`:

```bash
sudo nano /etc/ssh/sshd_config
```

Recommended settings:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 22
```

### 3. System Monitoring

```bash
# Install Fail2Ban
sudo apt install fail2ban

# Enable Fail2Ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Performance Optimization

### 1. Enable Gzip Compression

Add to Nginx config:

```nginx
gzip on;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
gzip_vary on;
gzip_comp_level 6;
```

### 2. Enable Caching

```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=biotechvet_cache:10m max_size=1g inactive=60m;

location / {
    proxy_cache biotechvet_cache;
    proxy_cache_valid 200 10m;
    proxy_cache_bypass $http_cache_control;
    add_header X-Cache-Status $upstream_cache_status;
}
```

### 3. Optimize Node.js Performance

Update `ecosystem.config.js`:

```javascript
instances: 'max',  // Use all CPU cores
max_memory_restart: '1G',  // Auto restart if exceeds 1GB
exec_mode: 'cluster',  // Use cluster mode
```

## Health Checks and Monitoring

### 1. Create Health Check Endpoint

Add to your Next.js API:

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
}
```

### 2. Monitor with curl

```bash
curl https://biotechvet.com.vn/api/health
```

### 3. Set Up Automated Monitoring

Create `/var/www/biotechvet/health-check.sh`:

```bash
#!/bin/bash

HEALTH_URL="https://biotechvet.com.vn/api/health"
EMAIL="admin@biotechvet.com.vn"

response=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $response != 200 ]; then
    echo "Health check failed: $response" | mail -s "🚨 BioTechVet Down" $EMAIL
    sudo -u biotechvet pm2 restart biotechvet
fi
```

Add to crontab to run every 5 minutes:

```cron
*/5 * * * * /var/www/biotechvet/health-check.sh >> /var/log/biotechvet/health-check.log 2>&1
```

## Post-Deployment Verification

1. ✅ Test application: `https://biotechvet.com.vn`
2. ✅ Check SSL certificate: `https://biotechvet.com.vn` (should show valid certificate)
3. ✅ Verify PM2 status: `sudo -u biotechvet pm2 status`
4. ✅ Check logs: `sudo -u biotechvet pm2 logs`
5. ✅ Monitor performance: `sudo -u biotechvet pm2 monit`
6. ✅ Test API endpoints: `curl https://yourdomain.com/api/health`

## Quick Reference Commands

```bash
# View application status
sudo -u biotechvet pm2 status

# View real-time logs
sudo -u biotechvet pm2 logs

# Restart application
sudo -u biotechvet pm2 restart biotechvet

# Stop application
sudo -u biotechvet pm2 stop biotechvet

# Delete application
sudo -u biotechvet pm2 delete biotechvet

# View Nginx logs
tail -f /var/log/nginx/biotechvet-error.log

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check disk space
df -h

# Check memory usage
free -h

# View system logs
sudo journalctl -xe
```

## Support and Troubleshooting

For issues, check:
1. Application logs: `/var/log/biotechvet/`
2. Nginx logs: `/var/log/nginx/`
3. PM2 logs: `pm2 logs`
4. System logs: `journalctl -xe`

Document any custom configurations or deployments for future reference.

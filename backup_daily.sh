#!/bin/bash

################################################################################
# VPS Daily Backup Script - Auto Setup & Backup Management
# Tự động backup từng ngày, giữ tối đa 5 backup, không cần thao tác thêm
################################################################################

# ============================================================================
# CẤUDẶU CẤU HÌNH
# ============================================================================
PROJECT_DIR="/var/www/biotechvet"              # Đường dẫn project trên VPS
BACKUP_DIR="/tmp/vps_backup_daily"             # Thư mục backup
DB_NAME="biotechvet"                           # Tên database
DB_USER="postgres"                             # User database
DB_HOST="localhost"                            # Host database
MAX_BACKUPS=5                                  # Giữ tối đa 5 backup
BACKUP_RETENTION_DAYS=5                        # Xóa backup cũ hơn 5 ngày
LOG_FILE="/var/log/vps_backup_daily.log"       # File log
SCRIPT_NAME="$(basename "$0")"
SCRIPT_PATH="$(cd "$(dirname "$0")" && pwd)"

# ============================================================================
# HÀM TIỆN ÍCH
# ============================================================================

# Log message
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Kiểm tra file/thư mục tồn tại
check_path() {
    if [ ! -e "$1" ]; then
        log_message "ERROR" "Đường dẫn không tồn tại: $1"
        return 1
    fi
    return 0
}

# Kiểm tra lệnh tồn tại
command_exists() {
    command -v "$1" &> /dev/null
    return $?
}

# Kiểm tra quyền root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        log_message "ERROR" "Script này cần chạy với quyền root (sudo)"
        exit 1
    fi
}

# Lấy kích thước file
get_file_size() {
    du -sh "$1" 2>/dev/null | awk '{print $1}'
}

# ============================================================================
# BACKUP PROJECT
# ============================================================================

backup_project() {
    local backup_date=$(date +%Y%m%d_%H%M%S)
    local backup_file="$BACKUP_DIR/backup_project_$backup_date.tar.gz"
    
    log_message "INFO" " Bắt đầu backup project..."
    
    if ! check_path "$PROJECT_DIR"; then
        return 1
    fi
    
    # Backup project
    if tar -czf "$backup_file" -C "$PROJECT_DIR" . 2>/dev/null; then
        local size=$(get_file_size "$backup_file")
        log_message "INFO" "Backup project hoàn thành: $backup_file (Size: $size)"
        return 0
    else
        log_message "ERROR" "Lỗi backup project"
        return 1
    fi
}

# ============================================================================
# BACKUP UPLOADS THAY ĐỔI
# ============================================================================

backup_uploads() {
    local backup_date=$(date +%Y%m%d_%H%M%S)
    local upload_dir="$PROJECT_DIR/public/uploads"
    local backup_file="$BACKUP_DIR/backup_uploads_$backup_date.tar.gz"
    
    if [ ! -d "$upload_dir" ]; then
        log_message "WARN" "Thư mục uploads không tồn tại: $upload_dir"
        return 0
    fi
    
    log_message "INFO" "🔄 Bắt đầu backup uploads..."
    
    if tar -czf "$backup_file" -C "$upload_dir" . 2>/dev/null; then
        local size=$(get_file_size "$backup_file")
        log_message "INFO" "Backup uploads hoàn thành: $backup_file (Size: $size)"
        return 0
    else
        log_message "ERROR" "Lỗi backup uploads"
        return 1
    fi
}

# ============================================================================
# BACKUP DATABASE
# ============================================================================

backup_database() {
    local backup_date=$(date +%Y%m%d_%H%M%S)
    local db_dir="$BACKUP_DIR/db"
    local backup_file="$db_dir/backup_db_$backup_date.dump"
    
    mkdir -p "$db_dir"
    
    log_message "INFO" "🔄 Bắt đầu backup database..."
    
    if ! command_exists pg_dump; then
        log_message "WARN" "pg_dump không tồn tại, bỏ qua backup database"
        return 0
    fi
    
    # Đọc password từ .env.production hoặc sử dụng default
    local db_password="${DB_PASSWORD:-}"
    if [ -f "$PROJECT_DIR/.env.production" ]; then
        db_password=$(grep -E "^DATABASE_PASSWORD=" "$PROJECT_DIR/.env.production" | cut -d '=' -f2 | tr -d ' "'"'"'')
    fi
    
    # Export password
    if [ -n "$db_password" ]; then
        export PGPASSWORD="$db_password"
    fi
    
    if pg_dump -U "$DB_USER" -h "$DB_HOST" -F c -b -v -f "$backup_file" "$DB_NAME" 2>/dev/null; then
        local size=$(get_file_size "$backup_file")
        log_message "INFO" "Backup database hoàn thành: $backup_file (Size: $size)"
        unset PGPASSWORD
        return 0
    else
        log_message "ERROR" "Lỗi backup database"
        unset PGPASSWORD
        return 1
    fi
}

# ============================================================================
# QUẢN LÝ BACKUP CŨ
# ============================================================================

cleanup_old_backups() {
    log_message "INFO" "🧹 Dọn dẹp backup cũ (keep tối đa $MAX_BACKUPS)..."
    
    # Dọn backup project
    local project_count=$(ls -1 "$BACKUP_DIR"/backup_project_*.tar.gz 2>/dev/null | wc -l)
    if [ "$project_count" -gt "$MAX_BACKUPS" ]; then
        ls -t "$BACKUP_DIR"/backup_project_*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | while read file; do
            rm -v "$file"
            log_message "INFO" "🗑️  Xóa backup cũ: $file"
        done
    fi
    
    # Dọn backup uploads
    local uploads_count=$(ls -1 "$BACKUP_DIR"/backup_uploads_*.tar.gz 2>/dev/null | wc -l)
    if [ "$uploads_count" -gt "$MAX_BACKUPS" ]; then
        ls -t "$BACKUP_DIR"/backup_uploads_*.tar.gz 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | while read file; do
            rm -v "$file"
            log_message "INFO" "🗑️  Xóa backup cũ: $file"
        done
    fi
    
    # Dọn backup database
    if [ -d "$BACKUP_DIR/db" ]; then
        local db_count=$(ls -1 "$BACKUP_DIR/db"/backup_db_*.dump 2>/dev/null | wc -l)
        if [ "$db_count" -gt "$MAX_BACKUPS" ]; then
            ls -t "$BACKUP_DIR/db"/backup_db_*.dump 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | while read file; do
                rm -v "$file"
                log_message "INFO" "🗑️  Xóa backup cũ: $file"
            done
        fi
    fi
    
    # Xóa file cũ hơn BACKUP_RETENTION_DAYS ngày
    find "$BACKUP_DIR" -type f -mtime +$BACKUP_RETENTION_DAYS -delete 2>/dev/null
}

# ============================================================================
# HIỂN THỊ THÔNG TIN BACKUP
# ============================================================================

show_backup_info() {
    log_message "INFO" "📊 Thông tin backup hiện tại:"
    
    if [ -d "$BACKUP_DIR" ]; then
        echo ""
        echo "=== Project Backups ==="
        ls -lh "$BACKUP_DIR"/backup_project_*.tar.gz 2>/dev/null || echo "Chưa có backup"
        echo ""
        echo "=== Uploads Backups ==="
        ls -lh "$BACKUP_DIR"/backup_uploads_*.tar.gz 2>/dev/null || echo "Chưa có backup"
        echo ""
        echo "=== Database Backups ==="
        ls -lh "$BACKUP_DIR/db"/backup_db_*.dump 2>/dev/null || echo "Chưa có backup"
        echo ""
        
        local total_size=$(du -sh "$BACKUP_DIR" 2>/dev/null | awk '{print $1}')
        log_message "INFO" "📦 Tổng dung lượng backup: $total_size"
    else
        log_message "WARN" "Thư mục backup chưa được tạo"
    fi
}

# ============================================================================
# SETUP CRON JOB
# ============================================================================

setup_cron() {
    log_message "INFO" "⏰ Thiết lập cron job tự động..."
    
    local cron_schedule="0 2 * * *"  # 2:00 AM mỗi ngày
    local cron_command="$SCRIPT_PATH/$SCRIPT_NAME"
    
    # Kiểm tra cron đã tồn tại
    if crontab -l 2>/dev/null | grep -q "$SCRIPT_NAME"; then
        log_message "INFO" "Cron job đã được thiết lập trước đó"
        return 0
    fi
    
    # Thêm cron job mới
    (crontab -l 2>/dev/null; echo "$cron_schedule $cron_command >> $LOG_FILE 2>&1") | crontab -
    
    if [ $? -eq 0 ]; then
        log_message "INFO" "Cron job đã được thiết lập thành công"
        log_message "INFO" "   Lịch: $cron_schedule ($cron_command)"
        log_message "INFO" "   Sẽ chạy tự động mỗi ngày lúc 2:00 AM"
        return 0
    else
        log_message "ERROR" "Lỗi thiết lập cron job"
        return 1
    fi
}

# ============================================================================
# CHẠY BACKUP NGAY
# ============================================================================

run_backup() {
    log_message "INFO" "════════════════════════════════════════════════════════════════"
    log_message "INFO" "Bắt đầu backup tại $(date '+%Y-%m-%d %H:%M:%S')"
    log_message "INFO" "════════════════════════════════════════════════════════════════"
    
    # Tạo thư mục backup
    mkdir -p "$BACKUP_DIR"
    
    # Chạy backup
    local errors=0
    
    backup_project || ((errors++))
    backup_uploads || ((errors++))
    backup_database || ((errors++))
    
    # Dọn dẹp backup cũ
    cleanup_old_backups
    
    # Hiển thị thông tin
    show_backup_info
    
    log_message "INFO" "════════════════════════════════════════════════════════════════"
    if [ $errors -eq 0 ]; then
        log_message "INFO" "Backup hoàn thành thành công!"
    else
        log_message "WARN" "Backup hoàn thành với $errors lỗi"
    fi
    log_message "INFO" "════════════════════════════════════════════════════════════════"
}

# ============================================================================
# MAIN
# ============================================================================

main() {
    check_root
    
    log_message "INFO" "Khởi động Backup Script..."
    
    # Kiểm tra cấu hình
    if ! check_path "$PROJECT_DIR"; then
        log_message "ERROR" "Vui lòng cấu hình PROJECT_DIR trong script"
        exit 1
    fi
    
    # Setup cron job nếu chưa setup
    if [ "$1" != "skip-cron" ]; then
        setup_cron
    fi
    
    # Chạy backup
    run_backup
    
    log_message "INFO" "✨ Tất cả nhiệm vụ hoàn thành"
}

# ============================================================================
# CHẠY SCRIPT
# ============================================================================

main "$@"

// Simple database service for bookmark persistence and backup
export interface DatabaseBackup {
  bookmarks: any[];
  collections: any[];
  timestamp: string;
  version: string;
}

export class DatabaseService {
  private static DB_VERSION = '1.0.0';
  private static BACKUP_KEY = 'bookmarkBackups';
  private static MAX_BACKUPS = 5;

  // Create automatic backup
  static createBackup(): void {
    if (typeof window === 'undefined') return;

    try {
      const bookmarks = JSON.parse(localStorage.getItem('userBookmarks') || '[]');
      const collections = JSON.parse(localStorage.getItem('bookmarkCollections') || '[]');
      
      const backup: DatabaseBackup = {
        bookmarks,
        collections,
        timestamp: new Date().toISOString(),
        version: this.DB_VERSION
      };

      const existingBackups = this.getBackups();
      const newBackups = [backup, ...existingBackups].slice(0, this.MAX_BACKUPS);
      
      localStorage.setItem(this.BACKUP_KEY, JSON.stringify(newBackups));
    } catch (error) {
      console.error('Failed to create backup:', error);
    }
  }

  // Get all backups
  static getBackups(): DatabaseBackup[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.BACKUP_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get backups:', error);
      return [];
    }
  }

  // Restore from backup
  static restoreFromBackup(backupIndex: number): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const backups = this.getBackups();
      if (backupIndex < 0 || backupIndex >= backups.length) return false;

      const backup = backups[backupIndex];
      localStorage.setItem('userBookmarks', JSON.stringify(backup.bookmarks));
      localStorage.setItem('bookmarkCollections', JSON.stringify(backup.collections));
      
      return true;
    } catch (error) {
      console.error('Failed to restore backup:', error);
      return false;
    }
  }

  // Sync data (placeholder for future server sync)
  static async syncData(): Promise<boolean> {
    // This would connect to a real database in production
    // For now, just create a backup
    this.createBackup();
    return true;
  }

  // Get database stats
  static getDatabaseStats() {
    if (typeof window === 'undefined') return null;

    try {
      const bookmarks = JSON.parse(localStorage.getItem('userBookmarks') || '[]');
      const collections = JSON.parse(localStorage.getItem('bookmarkCollections') || '[]');
      const backups = this.getBackups();

      return {
        bookmarksCount: bookmarks.length,
        collectionsCount: collections.length,
        backupsCount: backups.length,
        lastBackup: backups[0]?.timestamp || null,
        storageUsed: this.calculateStorageUsage()
      };
    } catch (error) {
      console.error('Failed to get database stats:', error);
      return null;
    }
  }

  // Calculate storage usage
  private static calculateStorageUsage(): string {
    if (typeof window === 'undefined') return '0 KB';

    try {
      let totalSize = 0;
      const keys = ['userBookmarks', 'bookmarkCollections', this.BACKUP_KEY];
      
      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          totalSize += new Blob([item]).size;
        }
      });

      if (totalSize < 1024) return `${totalSize} B`;
      if (totalSize < 1024 * 1024) return `${(totalSize / 1024).toFixed(1)} KB`;
      return `${(totalSize / (1024 * 1024)).toFixed(1)} MB`;
    } catch (error) {
      return '0 KB';
    }
  }
}
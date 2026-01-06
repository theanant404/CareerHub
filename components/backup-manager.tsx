"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Upload, 
  RotateCcw, 
  Database,
  Clock,
  HardDrive
} from "lucide-react";
import { BookmarkManager } from "@/lib/bookmark-data";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export default function BackupManager() {
  const [stats, setStats] = useState(BookmarkManager.getDatabaseStats());
  const [backups, setBackups] = useState(BookmarkManager.getBackups());
  const { toast } = useToast();

  const refreshData = () => {
    setStats(BookmarkManager.getDatabaseStats());
    setBackups(BookmarkManager.getBackups());
  };

  const handleCreateBackup = async () => {
    try {
      await BookmarkManager.syncData();
      refreshData();
      toast({
        title: "Backup Created",
        description: "Your bookmarks have been backed up successfully.",
      });
    } catch (error) {
      toast({
        title: "Backup Failed",
        description: "Failed to create backup. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRestore = (backupIndex: number) => {
    if (window.confirm("Are you sure you want to restore from this backup? This will replace your current bookmarks.")) {
      const success = BookmarkManager.restoreFromBackup(backupIndex);
      if (success) {
        refreshData();
        toast({
          title: "Backup Restored",
          description: "Your bookmarks have been restored successfully.",
        });
        // Reload the page to reflect changes
        window.location.reload();
      } else {
        toast({
          title: "Restore Failed",
          description: "Failed to restore backup. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Database Stats */}
      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Database Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.bookmarksCount}</div>
                <div className="text-sm text-muted-foreground">Bookmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.collectionsCount}</div>
                <div className="text-sm text-muted-foreground">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.backupsCount}</div>
                <div className="text-sm text-muted-foreground">Backups</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.storageUsed}</div>
                <div className="text-sm text-muted-foreground">Storage Used</div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Unable to load database statistics</p>
          )}
        </CardContent>
      </Card>

      {/* Backup Actions */}
      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle>Backup Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreateBackup} className="glassmorphic-button-primary">
              <HardDrive className="w-4 h-4 mr-2" />
              Create Backup
            </Button>
            <Button onClick={refreshData} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          {stats?.lastBackup && (
            <p className="text-sm text-muted-foreground">
              Last backup: {formatDistanceToNow(new Date(stats.lastBackup), { addSuffix: true })}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Available Backups */}
      <Card className="glassmorphic">
        <CardHeader>
          <CardTitle>Available Backups</CardTitle>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No backups available. Create your first backup above.
            </p>
          ) : (
            <div className="space-y-3">
              {backups.map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {formatDistanceToNow(new Date(backup.timestamp), { addSuffix: true })}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        v{backup.version}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {backup.bookmarks.length} bookmarks, {backup.collections.length} collections
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(index)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
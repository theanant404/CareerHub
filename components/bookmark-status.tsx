"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Clock } from "lucide-react";
import { BookmarkManager } from "@/lib/bookmark-data";

export default function BookmarkStatus() {
  const [stats, setStats] = useState(BookmarkManager.getBookmarkStats());
  const [recentBookmarks, setRecentBookmarks] = useState(BookmarkManager.getRecentBookmarks(3));

  useEffect(() => {
    const updateStats = () => {
      setStats(BookmarkManager.getBookmarkStats());
      setRecentBookmarks(BookmarkManager.getRecentBookmarks(3));
    };

    // Update stats when component mounts
    updateStats();

    // Listen for bookmark changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userBookmarks') {
        updateStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (stats.totalBookmarks === 0) {
    return null;
  }

  return (
    <Card className="glassmorphic border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-sm font-medium">{stats.totalBookmarks} saved</span>
            </div>
            
            {recentBookmarks.length > 0 && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Latest: {recentBookmarks[0].title.slice(0, 20)}...
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1">
            {stats.jobsCount > 0 && (
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {stats.jobsCount} jobs
              </Badge>
            )}
            {stats.internshipsCount > 0 && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {stats.internshipsCount} internships
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
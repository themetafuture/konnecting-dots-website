"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  FileText, 
  File, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Trash2,
  Eye,
  Share2
} from "lucide-react"

interface DownloadItem {
  id: string
  name: string
  type: 'pdf' | 'video' | 'audio' | 'document'
  size: string
  status: 'downloading' | 'completed' | 'failed' | 'paused'
  progress: number
  downloadUrl: string
  downloadedAt?: Date
  filePath?: string
}

interface DownloadManagerProps {
  downloads: DownloadItem[]
  onDownload: (item: DownloadItem) => void
  onPause: (id: string) => void
  onResume: (id: string) => void
  onCancel: (id: string) => void
  onDelete: (id: string) => void
  onOpen: (item: DownloadItem) => void
}

export default function DownloadManager({
  downloads,
  onDownload,
  onPause,
  onResume,
  onCancel,
  onDelete,
  onOpen
}: DownloadManagerProps) {
  const [filter, setFilter] = useState<'all' | 'downloading' | 'completed' | 'failed'>('all')

  const filteredDownloads = downloads.filter(download => {
    if (filter === 'all') return true
    return download.status === filter
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />
      case 'video':
        return <File className="h-5 w-5 text-blue-600" />
      case 'audio':
        return <File className="h-5 w-5 text-green-600" />
      case 'document':
        return <FileText className="h-5 w-5 text-gray-600" />
      default:
        return <File className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'downloading':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'paused':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'downloading':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Downloads</h2>
          <p className="text-gray-600">Manage your downloaded materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {downloads.filter(d => d.status === 'completed').length} completed
          </Badge>
          <Badge variant="outline">
            {downloads.filter(d => d.status === 'downloading').length} downloading
          </Badge>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All', count: downloads.length },
          { key: 'downloading', label: 'Downloading', count: downloads.filter(d => d.status === 'downloading').length },
          { key: 'completed', label: 'Completed', count: downloads.filter(d => d.status === 'completed').length },
          { key: 'failed', label: 'Failed', count: downloads.filter(d => d.status === 'failed').length }
        ].map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(key as any)}
            className="flex items-center gap-2"
          >
            {label}
            {count > 0 && (
              <Badge variant="secondary" className="ml-1">
                {count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Downloads List */}
      <div className="space-y-4">
        {filteredDownloads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Download className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'all' ? 'No downloads yet' : `No ${filter} downloads`}
              </h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'Start downloading materials from your courses'
                  : `No downloads with status "${filter}"`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredDownloads.map((download) => (
            <Card key={download.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">
                      {getFileIcon(download.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">{download.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(download.status)}`}>
                          {getStatusIcon(download.status)}
                          <span className="ml-1 capitalize">{download.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatFileSize(download.size)}</span>
                        {download.downloadedAt && (
                          <span>Downloaded {formatDate(download.downloadedAt)}</span>
                        )}
                      </div>

                      {download.status === 'downloading' && (
                        <div className="mt-2">
                          <Progress value={download.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{download.progress}%</span>
                            <span>Downloading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {download.status === 'completed' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onOpen(download)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {/* Share functionality */}}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {download.status === 'downloading' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPause(download.id)}
                      >
                        Pause
                      </Button>
                    )}

                    {download.status === 'paused' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onResume(download.id)}
                      >
                        Resume
                      </Button>
                    )}

                    {download.status === 'failed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(download)}
                      >
                        <Download className="h-4 w-4" />
                        Retry
                      </Button>
                    )}

                    {(download.status === 'completed' || download.status === 'failed') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(download.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}

                    {download.status === 'downloading' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCancel(download.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {downloads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All Completed
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Completed
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export List
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

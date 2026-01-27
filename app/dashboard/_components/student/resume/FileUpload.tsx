"use client";

import { useRef } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
}

export function FileUpload({ onFileChange, file }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  const removeFile = () => {
    onFileChange(null);
    if (inputRef.current) {
        inputRef.current.value = "";
    }
  };
  
  return (
    <div className="grid w-full gap-2">
      <Label htmlFor="resume-file" className="font-semibold">Your Resume</Label>
      {file ? (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="text-sm overflow-hidden">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile} className="text-muted-foreground hover:text-destructive flex-shrink-0">
                <X className="h-4 w-4" />
              </Button>
          </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50"
          onClick={() => inputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              onFileChange(e.dataTransfer.files[0]);
              e.dataTransfer.clearData();
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
            <UploadCloud className="w-12 h-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF, PNG, JPG</p>
            <input 
                ref={inputRef}
                id="resume-file"
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept="application/pdf,image/png,image/jpeg"
            />
        </div>
      )}
    </div>
  );
}

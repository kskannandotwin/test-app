import { Component, OnInit } from '@angular/core';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content?: string;
  size?: number;
  lastModified?: Date;
}

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
})
export class FileManagerComponent implements OnInit {
  // File system structure
  fileSystem: FileItem[] = [
    {
      name: 'Root',
      type: 'folder',
      children: [
        {
          name: 'Documents',
          type: 'folder',
          children: [
            {
              name: 'report.txt',
              type: 'file',
              content: 'Sample report content',
              size: 1024,
              lastModified: new Date(),
            },
          ],
        },
        {
          name: 'Images',
          type: 'folder',
          children: [],
        },
      ],
    },
  ];

  // Current path tracking
  currentPath: FileItem[] = [this.fileSystem[0]];
  currentFolder: FileItem = this.fileSystem[0];

  // Form control variables
  newItemName: string = '';
  selectedFile: File | null = null;

  constructor() {}

  ngOnInit(): void {}

  // File Selection Handler
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.createFile(file.name, file);
    }
  }

  // Create New Folder
  createFolder(): void {
    if (this.newItemName.trim()) {
      const newFolder: FileItem = {
        name: this.newItemName,
        type: 'folder',
        children: [],
      };
      this.currentFolder.children?.push(newFolder);
      this.newItemName = '';
    }
  }

  // Create New File
  createFile(name: string, file?: File): void {
    const newFile: FileItem = {
      name: name,
      type: 'file',
      content: file ? this.readFileContent(file) : '',
      size: file ? file.size : 0,
      lastModified: new Date(),
    };
    this.currentFolder.children?.push(newFile);
  }

  // Read File Content
  readFileContent(file: File): string {
    const reader = new FileReader();
    let content = '';
    reader.onload = (e) => {
      content = e.target?.result as string;
    };
    reader.readAsText(file);
    return content;
  }

  // Navigate into Folder
  navigateToFolder(folder: FileItem): void {
    this.currentPath.push(folder);
    this.currentFolder = folder;
  }

  // Go Back to Previous Folder
  goBack(): void {
    if (this.currentPath.length > 1) {
      this.currentPath.pop();
      this.currentFolder = this.currentPath[this.currentPath.length - 1];
    }
  }

  // Rename Item
  renameItem(item: FileItem, newName: string): void {
    if (newName.trim()) {
      item.name = newName;
    }
  }

  // Delete Item
  deleteItem(item: FileItem): void {
    const index = this.currentFolder.children?.findIndex(
      (child) => child.name === item.name
    );
    if (index !== undefined && index !== -1) {
      this.currentFolder.children?.splice(index, 1);
    }
  }
}

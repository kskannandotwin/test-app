import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFile: File | null = null;  
  fileName: string = '';  

  constructor() { }

  ngOnInit(): void {
  }  

  onFileChange(event: any) {  
    if (event.target.files.length > 0) {  
      this.selectedFile = event.target.files[0];  
      this.fileName = this.selectedFile!.name;
    }  
  }  

  uploadFile() {  
    if (this.selectedFile) {  
      // Here you can implement the logic to upload the file, e.g., to a server  
      console.log('Uploading file...', this.selectedFile);  
      alert('File uploaded: ' + this.fileName);  
      
      // Reset the fields after upload  
      this.selectedFile = null;  
      this.fileName = '';  
    }  
  }
}
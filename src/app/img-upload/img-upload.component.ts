import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements OnInit {
  
  
  constructor(private myApi:ApiService,
    private sanitizer:DomSanitizer
    ) { this.getItemData() }

  imgFile:any
  itemData:any
  name = ''
  description = ''
  onFileSelected=(event:any)=>{
    this.imgFile = event.target.files[0]
  }

  submit=()=>{

    const fd = new FormData();
    fd.append('file', this.imgFile, this.imgFile.name);
    fd.append('name',this.name)
    fd.append('description',this.description)
    this.myApi.addFormData(fd).subscribe()

  }
  
  getItemData=()=>{
    this.myApi.viewItems().subscribe(
      (resp:any)=>{
        for (let i of resp) {
          var binaryData = [];
          binaryData.push(i.picByte)
          i.picByte = this.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL(new Blob(binaryData, {type: "image/jpeg"})))
        };
        this.itemData = resp
      }
    )
  }
  
  ngOnInit(): void {
  }

}

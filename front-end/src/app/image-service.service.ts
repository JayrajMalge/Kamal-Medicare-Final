import { Injectable } from '@angular/core';
import { filehandle } from './enities';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private sanitizer : DomSanitizer) { }

  private dataurltoblob(picbytes : any, imagetype : any) { 
    const bytestring = atob(picbytes)
    const arrayBuffer = new ArrayBuffer(bytestring.length)
    const int8array = new Uint8Array(arrayBuffer)
    for(let i=0;i<bytestring.length;i++){
      int8array[i] = bytestring.charCodeAt(i)
    }
    const imageblob = new Blob([int8array],{type : imagetype})
    return imageblob;
 }

 bytetoimage(imagearray : any,type : string,name : string) : filehandle{
  const blob = this.dataurltoblob(imagearray,type)
  const imagefile = new File([blob],name,{type : type})
  const filefilehandle : filehandle = {
    file : imagefile,
    url : this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(imagefile))
  }
  return filefilehandle;
 }

}

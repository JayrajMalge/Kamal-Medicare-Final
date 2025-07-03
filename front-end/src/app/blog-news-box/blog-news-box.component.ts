import { Component, OnInit,Input } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { News, NewsImage, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-blog-news-box',
  standalone: true,
  imports: [],
  templateUrl: './blog-news-box.component.html',
  styleUrl: './blog-news-box.component.css'
})
export class BlogNewsBoxComponent implements OnInit{
   constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
   @Input() news : News = new News()
   newsimages : NewsImage = new NewsImage()
   filehandle : filehandle = new filehandle()
   ngOnInit(): void {
     this.userservice.getnewsimages("getnewsimagesbynewsid/"+this.news.newsid).subscribe(
      (response)=>{
          this.newsimages = response 
          this.filehandle = this.imageservice.bytetoimage(this.newsimages.image,this.newsimages.imagetype,this.newsimages.imagename)
      },(error)=>{}
     )
   }
}

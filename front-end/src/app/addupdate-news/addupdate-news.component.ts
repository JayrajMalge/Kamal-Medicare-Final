import { Component ,Input, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../image/image.component';
import { News, NewsImage } from '../enities';

@Component({
  selector: 'app-addupdate-news',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './addupdate-news.component.html',
  styleUrl: './addupdate-news.component.css'
})
export class AddupdateNewsComponent implements OnInit{
   
  @Input() operation : string = '';
  spinner : boolean = true;

  updatevalue : number = 0
  news : News[] = []
  selectednews : News = new News()
  constructor(private userservice : UserServiceService,private router : Router){}
  ngOnInit(): void {
    this.userservice.getnews("getnews").subscribe(
      (response)=>{this.news = response;},(error)=>{}
    )
  }
  newsname : string = ''
  newsdescription : string = ''
  newsimages : any = new NewsImage();
  newstype : string = ''
  newsdate : Date = new Date()
  newsimagesinput(event: any): void {
    const file = event.target.files[0];
    this.newsimages.imagename = file.name
    this.newsimages.imagetype = file.type
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      this.newsimages.image = Array.from(byteArray)
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }
  }
  newssubmitform(operation : string){
    if(this.newsname != "" && this.newsdescription != "" && this.newsdate != null && this.newstype != " "){
      const news : any = {
        title : this.newsname,
        description : this.newsdescription,
        newsdate : this.newsdate,
        newstype : this.newstype
      }
      this.userservice.createnews("savednews",news).subscribe(
        (response)=>{
            const storednews = response
            const storetodb = {
              newsid : storednews.newsid,
              imagename : this.newsimages.imagename,
              imagetype : this.newsimages.imagetype,
              image : this.newsimages.image
            }
            this.userservice.createnewsimage("savednewsimages",storetodb).subscribe(
              (response)=>{
                alert("News Created Sucessfully")
                window.location.reload()
              },(error)=>{}
            )
        },(error)=>{
            console.log(error)
        }
      )
    }else{
      alert("pls fill all * fields")
    }
  }

  selecttodelete(){
    const ne = this.news.filter((no)=>{
      return no.newsid == this.updatevalue
    })
    this.selectednews = ne[0]
    this.operation = "Confirm Deletion"
  }
  confirmselecttodelete(){  
      this.userservice.deletenews("deletenews/"+this.updatevalue).subscribe(
        (response)=>{alert("News Deleted Sucessfully");window.location.reload()      
      },(error)=>{}
      )
  }
}

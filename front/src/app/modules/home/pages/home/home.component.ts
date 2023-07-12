import { Component } from '@angular/core';
import { FilesService } from 'src/app/modules/blog/services/files.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoading: boolean = true;
  imageURL: string = "";

  constructor(private filesService: FilesService) {
    const imageURL = "https://app-blog-rh2x.onrender.com/api/images/Portada.webp";

    this.filesService.getImageHome(imageURL).subscribe(()=> {
      this.imageURL = imageURL;
      this.isLoading = false;
    })
  } 
}

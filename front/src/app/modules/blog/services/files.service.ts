import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient : HttpClient) { }

  private url:string = environment.url+'images/';

  public uploadImage(image:FormData):Observable<any>{
    return this.httpClient.post(this.url,image);
  }
}

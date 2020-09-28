import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {PathsGeneratorService} from "../paths-generator/paths-generator.service";

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) {}

  downloadExampleXls(): any {
    return this.http.get(PathsGeneratorService.generateExampleXlsPath(), {responseType: 'blob'});
  }
}

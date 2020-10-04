import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  private userAgent: string
  private MICROSOFT_EDGE: string = 'edge';
  private OPERA: string = 'opr';
  private GOOGLE_CHROME: string = 'chrome';
  private INTERNET_EXPLORER: string = 'trident';
  private FIREFOX: string = 'firefox';
  private SAFARI: string = 'safari';

  constructor() {
    this.userAgent = window.navigator.userAgent.toLowerCase();
  }

  isEdge(): boolean {
    return this.userAgent.indexOf(this.MICROSOFT_EDGE) > -1;
  }

  isOpera(): boolean {
    return this.userAgent.indexOf(this.OPERA) > -1;
  }

  isChrome(): boolean {
    return this.userAgent.indexOf(this.GOOGLE_CHROME) > -1;
  }

  isInternetExplorer(): boolean {
    return this.userAgent.indexOf(this.INTERNET_EXPLORER) > -1;
  }

  isFirefox(): boolean {
    return this.userAgent.indexOf(this.FIREFOX) > -1;
  }

  isSafari(): boolean {
    return this.userAgent.indexOf(this.SAFARI) > -1;
  }

  isBrowserWithPopupsSecurity(): boolean {
    return this.isChrome() || this.isOpera();
  }
}

@Pipe({name: 'secureUrl'})
export class Url {

  constructor(private sanitizer:DomSanitizationService){
    this.sanitizer = sanitizer;
  }

  transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url).changingThisBreaksApplicationSecurity;            
  }
}
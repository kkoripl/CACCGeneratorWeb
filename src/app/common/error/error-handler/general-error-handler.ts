import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {NotificationService} from "../../dialogs/notifications/notification.service";

@Injectable()
export class GeneralErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  handleError(error: any) {
    const notifyService = this.injector.get(NotificationService);
    notifyService.showError(error.name, error.message);
  }
}

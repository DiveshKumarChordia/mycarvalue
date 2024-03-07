import { CanActivate, ExecutionContext } from "@nestjs/common";
import { CurrentUser } from "../decorators/current-user.decorators";


export class AdminGuard implements CanActivate {
        canActivate(context: ExecutionContext):boolean{
            const request = context.switchToHttp().getRequest();
            if(!request.CurrentUser){
                return false;
            }
            return request.CurrentUser.admin;
               
        }
}
import { HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http/src/request";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            const authreq = req.clone({
                headers : req.headers.set('Authorization', token)
            });;
            return next.handle(authreq);
        }else{
            return next.handle(req);
        }
    }
}
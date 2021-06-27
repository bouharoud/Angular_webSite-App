import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result } from '../model/result';
import { Users } from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  isAuth: boolean = false;
  userSubject = new Subject<Users>();

  constructor(private http: HttpClient) {

  }

  emitUser(): void{
    this.userSubject.next(this.user);
  }

    authentifier(newUser: Users){
     return new Promise(
       (resolve,reject)=>{
        const url = `${environment.API + 'authentifier.php?' + environment.API_KEY}` +
        '&email=' + newUser.email + '&password=' + newUser.password;

        this.http.get(url).subscribe(
          (data: Result)=>{
            if(data.status == 200){
              this.user = data.result;
              this.isAuth = true;
              this.emitUser();
              resolve(data.result);
            }else{
              console.log(data.result);
              reject(data.message);
              //reject(false);
            }
          },(error)=>{
            console.log("error"+error);
            reject(false);
          }
        )
       }
     )
  }

createUser(newUser: Users){
  return new Promise(
    (resolve,reject)=>{

      const url = `${environment.API + 'createUsers.php?' + environment.API_KEY}` +
      '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
      '&firstname=' + newUser.firstname + '&lastname=' + newUser.lastname + '&dateBirth=' + newUser.dateBirth +
       '&pseudo=' + newUser.pseudo;

       this.http.get(url).subscribe(
         (data: Result)=>{
          if(data.status == 200){
            this.authentifier(newUser);
            resolve(data.result);
          }else{
           reject(data.message);
          }
         },
         (error)=>{
           reject(error);
         }
       )
    }
  )
}

logout(): void{
 this.user = null;
 this.isAuth = false;
 this.userSubject = new Subject<Users>();
}

}

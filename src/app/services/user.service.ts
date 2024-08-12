import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user = {
        name: "Ori Chai-Matan",
        coins: 100,
        moves: []
    }

    // public getUser(): User {
    //     return {
    //         name: "Ori Chai-Matan",
    //         coins: 100,
    //         moves: []
    //     };
    // }

    private _loggedInUser$ = new BehaviorSubject(this.user)
    public loggedInUser$ = this._loggedInUser$.asObservable()

    getUser() {
        return this._loggedInUser$.value
    }
}

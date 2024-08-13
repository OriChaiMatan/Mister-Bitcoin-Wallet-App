import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _loggedInUser$ = new BehaviorSubject<User | null>(null);
    public loggedInUser$ = this._loggedInUser$.asObservable();
  
    constructor() {
      const savedUser = this.loadUser();
      if (savedUser) {
        this._loggedInUser$.next(savedUser);
      }
    }
  
    signup(name: string) {
      const newUser: User = {
        name,
        coins: 100,
        moves: [],
      };
      this.saveUser(newUser);
      this._loggedInUser$.next(newUser);
    }
  
    addMove(contact: string, amount: number) {
      const user = this.getUser();
      if (user && user.coins >= amount) {
        const move = {
          toId: this.generateId(),
          to: contact,
          at: Date.now(),
          amount,
        };
        user.moves.push(move);
        user.coins -= amount;
        this.saveUser(user);
        this._loggedInUser$.next(user);
      } else {
        console.error('Insufficient coins or no user logged in.');
      }
    }
  
    private saveUser(user: User) {
      const userJson = JSON.stringify(user);
      localStorage.setItem('user', userJson);
      sessionStorage.setItem('user', userJson);
    }
  
    private loadUser(): User | null {
      const sessionUserJson = sessionStorage.getItem('user');
      const localUserJson = localStorage.getItem('user');
      return sessionUserJson
        ? JSON.parse(sessionUserJson)
        : localUserJson
        ? JSON.parse(localUserJson)
        : null;
    }
  
    getUser(): User | null {
      return this._loggedInUser$.value;
    }
  
    private generateId() {
      return Math.random().toString(36).substr(2, 9);
    }
}

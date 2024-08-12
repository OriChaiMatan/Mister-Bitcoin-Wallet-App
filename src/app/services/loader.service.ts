import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {


    private _isLoading$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this._isLoading$.asObservable()

    setIsLoading(isLoading:boolean) {
        console.log('Loader status:', isLoading);
        this._isLoading$.next(isLoading)
    }

}

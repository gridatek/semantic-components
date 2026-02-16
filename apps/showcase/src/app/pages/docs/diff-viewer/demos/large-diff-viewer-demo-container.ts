import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LargeDiffViewerDemo } from './large-diff-viewer-demo';

@Component({
  selector: 'app-large-diff-viewer-demo-container',
  imports: [DemoContainer, LargeDiffViewerDemo],
  template: `
    <app-demo-container
      title="Large File"
      demoUrl="/demos/diff-viewer/large-diff-viewer-demo"
      [code]="code"
    >
      <app-large-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeDiffViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-large-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: \`
    <sc-diff-viewer
      [oldText]="oldLarge"
      [newText]="newLarge"
      [oldTitle]="'data.ts'"
      [newTitle]="'data.ts'"
      [maxHeight]="'400px'"
    />
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LargeDiffViewerDemo {
  oldLarge = \`// User Service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\\\`\\\${this.apiUrl}/\\\${id}\\\`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(\\\`\\\${this.apiUrl}/\\\${id}\\\`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\\\`\\\${this.apiUrl}/\\\${id}\\\`);
  }
}\`;

  newLarge = \`// User Service - Updated
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from '../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface UserFilters {
  role?: string;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/users';

  getUsers(filters?: UserFilters): Observable<User[]> {
    let params = new HttpParams();
    if (filters?.role) {
      params = params.set('role', filters.role);
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(\\\`\\\${this.apiUrl}/\\\${id}\\\`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(\\\`\\\${this.apiUrl}/\\\${id}\\\`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\\\`\\\${this.apiUrl}/\\\${id}\\\`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('UserService error:', error);
    throw error;
  }
}\`;
}`;
}

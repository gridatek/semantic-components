import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToolbar,
  ScToolbarToggle,
  ScToolbarToggleGroup,
} from '@semantic-components/ui';
import {
  ScDiffViewer,
  ScDiffViewerContent,
  ScDiffViewerEmpty,
  ScDiffViewerFooter,
  ScDiffViewerHeader,
  ScDiffViewerLine,
  ScDiffViewerLineContent,
  ScDiffViewerLineNumber,
  ScDiffViewerLinePlaceholder,
  ScDiffViewerLineSign,
  ScDiffViewerModeSwitch,
  ScDiffViewerPane,
  ScDiffViewerPaneHeader,
  ScDiffViewerSplit,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-large-diff-viewer-demo',
  imports: [
    ScDiffViewer,
    ScDiffViewerHeader,
    ScDiffViewerModeSwitch,
    ScToolbar,
    ScToolbarToggle,
    ScToolbarToggleGroup,
    ScDiffViewerContent,
    ScDiffViewerSplit,
    ScDiffViewerPane,
    ScDiffViewerPaneHeader,
    ScDiffViewerLine,
    ScDiffViewerLineNumber,
    ScDiffViewerLineSign,
    ScDiffViewerLineContent,
    ScDiffViewerLinePlaceholder,
    ScDiffViewerFooter,
    ScDiffViewerEmpty,
  ],
  template: `
    <div
      scDiffViewer
      [oldText]="oldLarge"
      [newText]="newLarge"
      #diff="scDiffViewer"
    >
      <div scDiffViewerHeader>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">data.ts</span>
          <span class="text-muted-foreground">→</span>
          <span class="text-muted-foreground">data.ts</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 text-sm">
            <span class="text-green-600 dark:text-green-400">
              +{{ diff.diffResult().additions }}
            </span>
            <span class="text-red-600 dark:text-red-400">
              -{{ diff.diffResult().deletions }}
            </span>
          </div>
          <div scToolbar scDiffViewerModeSwitch>
            <div scToolbarToggleGroup>
              <button scToolbarToggle value="split">Split</button>
              <button scToolbarToggle value="unified">Unified</button>
            </div>
          </div>
        </div>
      </div>
      <div scDiffViewerContent maxHeight="400px">
        @if (diff.viewMode() === 'split') {
          <div scDiffViewerSplit>
            <div scDiffViewerPane side="old">
              <div scDiffViewerPaneHeader variant="old">data.ts</div>
              <div class="font-mono text-sm">
                @for (line of diff.diffResult().lines; track $index) {
                  @if (line.type !== 'added') {
                    <div scDiffViewerLine [type]="line.type">
                      <span scDiffViewerLineNumber>
                        {{ line.oldLineNumber || '' }}
                      </span>
                      <span scDiffViewerLineSign>
                        {{ line.type === 'removed' ? '-' : '' }}
                      </span>
                      <span
                        scDiffViewerLineContent
                        [innerHTML]="diff.highlightLine(line, 'old')"
                      ></span>
                    </div>
                  } @else {
                    <div scDiffViewerLinePlaceholder></div>
                  }
                }
              </div>
            </div>
            <div scDiffViewerPane side="new">
              <div scDiffViewerPaneHeader variant="new">data.ts</div>
              <div class="font-mono text-sm">
                @for (line of diff.diffResult().lines; track $index) {
                  @if (line.type !== 'removed') {
                    <div scDiffViewerLine [type]="line.type">
                      <span scDiffViewerLineNumber>
                        {{ line.newLineNumber || '' }}
                      </span>
                      <span scDiffViewerLineSign>
                        {{ line.type === 'added' ? '+' : '' }}
                      </span>
                      <span
                        scDiffViewerLineContent
                        [innerHTML]="diff.highlightLine(line, 'new')"
                      ></span>
                    </div>
                  } @else {
                    <div scDiffViewerLinePlaceholder></div>
                  }
                }
              </div>
            </div>
          </div>
        } @else {
          <div class="font-mono text-sm">
            @for (line of diff.diffResult().lines; track $index) {
              <div scDiffViewerLine [type]="line.type">
                <span scDiffViewerLineNumber>
                  {{ line.oldLineNumber || '' }}
                </span>
                <span scDiffViewerLineNumber>
                  {{ line.newLineNumber || '' }}
                </span>
                <span scDiffViewerLineSign class="font-bold">
                  @switch (line.type) {
                    @case ('added') {
                      <span class="text-green-600 dark:text-green-400">+</span>
                    }
                    @case ('removed') {
                      <span class="text-red-600 dark:text-red-400">-</span>
                    }
                    @default {}
                  }
                </span>
                <span
                  scDiffViewerLineContent
                  [innerHTML]="
                    diff.highlightLine(
                      line,
                      line.type === 'removed' ? 'old' : 'new'
                    )
                  "
                ></span>
              </div>
            }
          </div>
        }
        @if (diff.diffResult().lines.length === 0) {
          <div scDiffViewerEmpty>No differences found</div>
        }
      </div>
      <div scDiffViewerFooter>
        <span>{{ diff.diffResult().lines.length }} lines</span>
        <span>
          {{ diff.diffResult().additions }} additions,
          {{ diff.diffResult().deletions }} deletions,
          {{ diff.diffResult().unchanged }} unchanged
        </span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LargeDiffViewerDemo {
  oldLarge = `// User Service
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
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(\`\${this.apiUrl}/\${id}\`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }
}`;

  newLarge = `// User Service - Updated
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
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(\`\${this.apiUrl}/\${id}\`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('UserService error:', error);
    throw error;
  }
}`;
}

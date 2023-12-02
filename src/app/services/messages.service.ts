import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Observable, Subject, defer, exhaustMap } from 'rxjs';
import { filter, map, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Message } from "../interfaces/messages";
import { Firestore, collectionData, collection, query, orderBy, limit, addDoc } from '@angular/fire/firestore';

interface MessageState {
  messages: Message[];
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private authUser$ = toObservable(this.authService.user);

  // sources
  messages$ = this.getMessages().pipe(
    // restart stream when user reauthenticates
    retry({
      delay: () => this.authUser$.pipe(filter((user) => !!user)),
    })
  );
  add$ = new Subject<Message['content']>();
  error$ = new Subject<string>();
  logout$ = this.authUser$.pipe(filter((user) => !user));

  // state
  private state = signal<MessageState>({
    messages: [],
    error: null,
  });

  // selectors
  messages = computed(() => this.state().messages);
  error = computed(() => this.state().error);

  constructor() {
    // reducers
    this.messages$.pipe(takeUntilDestroyed()).subscribe((messages) =>
      this.state.update((state) => ({
        ...state,
        messages,
      }))
    );

    this.add$
      .pipe(
        takeUntilDestroyed(),
        exhaustMap((message) => this.addMessage(message))
      )
      .subscribe({
        error: (err) => {
          console.log(err);
          this.error$.next('Failed to send message');
        },
      });

    this.logout$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, messages: [] }))
      );

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe((error) =>
        this.state.update((state) => ({ ...state, error }))
      );
  }

  private getMessages() {
    const messagesCollection = query(
      collection(this.firestore, 'messages'),
      orderBy('created', 'desc'),
      limit(50)
    );

    return collectionData(messagesCollection, { idField: 'id' }).pipe(
      map((messages) => [...messages].reverse())
    ) as Observable<Message[]>;
  }

  private addMessage(message: string) {
    const newMessage = {
      author: this.authService.user()?.email,
      content: message,
      created: Date.now().toString(),
    };

    const messagesCollection = collection(this.firestore, 'messages');
    return defer(() => addDoc(messagesCollection, newMessage));
  }
}

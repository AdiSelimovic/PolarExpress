import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Journey } from './pages/journey/journey';
import { Experience } from './pages/experience/experience';
import { Gallery } from './pages/gallery/gallery';
import { BookNow } from './pages/book-now/book-now';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'journey', component: Journey },
  { path: 'experience', component: Experience },
  { path: 'gallery', component: Gallery },
  { path: 'book-now', component: BookNow },
  { path: '**', redirectTo: '' }
];

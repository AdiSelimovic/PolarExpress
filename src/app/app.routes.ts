import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Journey } from './pages/journey/journey';
import { Experience } from './pages/experience/experience';
import { Gallery } from './pages/gallery/gallery';
import { Cart } from './pages/cart/cart';
import { BookNow } from './pages/book-now/book-now';
import { Routes as RoutesPage } from './pages/routes/routes';
import { Tracker } from './pages/tracker/tracker';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'journey', component: Journey },
  { path: 'experience', component: Experience },
  { path: 'routes', component: RoutesPage },
  { path: 'tracker', component: Tracker },
  { path: 'gallery', component: Gallery },
  { path: 'cart', component: Cart },
  { path: 'book-now', component: BookNow },
  { path: '**', redirectTo: '' }
];

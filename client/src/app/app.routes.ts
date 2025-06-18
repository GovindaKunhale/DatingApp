import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { MemberDetailComponent } from './members/member-detail.component/member-detail.component';
import { MessagesComponent } from './components/messages.component/messages.component';
import { ListsComponent } from './components/lists.component/lists.component';
import { MemberListComponent } from './members/member-list.component/member-list.component';
import { authGuard } from './_guards/auth-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'members/:id', component: MemberDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent }
        ]
    },

    { path: '**', component: HomeComponent, pathMatch: 'full' },
];

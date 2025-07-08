import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component/home.component';
import { MemberDetailComponent } from './members/member-detail.component/member-detail.component';
import { MessagesComponent } from './components/messages.component/messages.component';
import { ListsComponent } from './components/lists.component/lists.component';
import { MemberListComponent } from './members/member-list.component/member-list.component';
import { authGuard } from './_guards/auth-guard';
import { TestErrorsComponent } from './errors/test-errors.component/test-errors.component';
import { NotFoundComponent } from './errors/not-found.component/not-found.component';
import { ServerErrorComponent } from './errors/server-error.component/server-error.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberListComponent },
            { path: 'members/:username', component: MemberDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent }
        ]
    },

    {path: 'errors', component: TestErrorsComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    { path: '**', component: HomeComponent, pathMatch: 'full' }
];
